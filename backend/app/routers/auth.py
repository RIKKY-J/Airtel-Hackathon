import uuid
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from app.db import get_db

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

class OTPRequest(BaseModel):
    mobile: str
    role: Optional[str] = "customer"

class OTPVerify(BaseModel):
    mobile: str
    otp: str
    role: Optional[str] = "customer"

@router.post("/otp-request")
def request_otp(payload: OTPRequest):
    clean_mobile = payload.mobile.strip()
    if len(clean_mobile) < 10:
        raise HTTPException(status_code=400, detail="Invalid mobile number format")
    
    # In demo mode, simulated OTP is 123456
    return {
        "success": True,
        "message": f"Demo OTP sent to {clean_mobile}",
        "simulated_otp": "123456",
        "mobile": clean_mobile,
        "role": payload.role
    }

@router.post("/otp-verify")
def verify_otp(payload: OTPVerify, conn=Depends(get_db)):
    clean_mobile = payload.mobile.strip()
    # Accept 123456 or any 6-digit for demo convenience
    if payload.otp != "123456" and len(payload.otp) != 6:
        raise HTTPException(status_code=400, detail="Invalid verification code")

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE mobile = ?", (clean_mobile,))
    user = cursor.fetchone()

    if not user:
        user_id = f"U{str(uuid.uuid4())[:8].upper()}"
        cursor.execute(
            "INSERT INTO users (id, mobile, role) VALUES (?, ?, ?)",
            (user_id, clean_mobile, payload.role or "customer")
        )
        conn.commit()
    else:
        user_id = user["id"]

    # Check if there is an associated business
    cursor.execute("SELECT * FROM businesses WHERE owner_user_id = ? ORDER BY created_at DESC LIMIT 1", (user_id,))
    biz = cursor.fetchone()

    token = f"demo-token-{user_id}"
    return {
        "success": True,
        "access_token": token,
        "user": {
            "id": user_id,
            "mobile": clean_mobile,
            "role": payload.role or "customer"
        },
        "business": dict(biz) if biz else None
    }

