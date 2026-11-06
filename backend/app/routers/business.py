import uuid
from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.db import get_db

router = APIRouter(prefix="/api/v1/business", tags=["Business Profile & Personalisation"])

SEGMENT_CONFIGS = {
    "micro_retail_services": {
        "title_en": "Micro Retail & Local Services",
        "title_hi": "माइक्रो रिटेल एवं स्थानीय सेवाएं",
        "description_en": "Tailored for Kiranas, pharmacies, salons and local stores needing rock-solid UPI/POS uptime and customer Wi-Fi.",
        "description_hi": "किराना, मेडिकल स्टोर, सैलून और दुकानों के लिए निर्बाध UPI/POS भुगतान और वाई-फाई।",
        "theme_color": "emerald",
        "primary_concerns": ["upi_pos_connectivity", "cctv_connectivity", "guest_wifi"],
        "hero_metric": "UPI / POS Uptime: 99.95%",
        "suggested_bundle": "Kirana Digital Suraksha Pack",
        "quick_actions": [
            {"id": "qa_advisor", "label_en": "Start Smart Need Advisor", "label_hi": "बिजनेस एडवाइजर शुरू करें", "icon": "Sparkles"},
            {"id": "qa_kyc", "label_en": "Zero-Visit KYC (Udyam / GST)", "label_hi": "बिना चक्कर काटे KYC करें", "icon": "ShieldCheck"},
            {"id": "qa_orders", "label_en": "Live Activation Tracker", "label_hi": "कनेक्शन स्टेटस देखें", "icon": "Clock"}
        ]
    },
    "professional_office": {
        "title_en": "Professional Practice & Clinics",
        "title_hi": "पेशेवर कार्यालय एवं क्लिनिक",
        "description_en": "Built for CA firms, doctors, lawyers, and coaching institutes needing secure cloud backup, static IP and high-speed broadband.",
        "description_hi": "सीए फर्म, क्लिनिक, कोचिंग और वकीलों के लिए क्लाउड बैकअप, स्टेटिक आईपी और हाई-स्पीड इंटरनेट।",
        "theme_color": "blue",
        "primary_concerns": ["static_ip", "cloud_backup", "endpoint_security"],
        "hero_metric": "Cloud Backup & Practice Uptime",
        "suggested_bundle": "Professional Practice Suite",
        "quick_actions": [
            {"id": "qa_advisor", "label_en": "Custom Practice Quote", "label_hi": "कस्टम कोटेशन प्राप्त करें", "icon": "Sparkles"},
            {"id": "qa_kyc", "label_en": "Corporate & Firm KYC", "label_hi": "फर्म KYC सत्यापन", "icon": "ShieldCheck"},
            {"id": "qa_orders", "label_en": "Track Dedicated Setup", "label_hi": "सेटअप प्रगति देखें", "icon": "Clock"}
        ]
    },
    "small_multisite": {
        "title_en": "Multi-Branch & Restaurant Chains",
        "title_hi": "मल्टी-ब्रांच एवं रेस्तरां चेन्स",
        "description_en": "Designed for 3-10 branch businesses needing unified billing, 4G/5G backup failover, centralized CCTV, and managed SD-WAN.",
        "description_hi": "3 से 10 शाखाओं वाले व्यवसायों के लिए एक बिल, बैकअप इंटरनेट, केंद्रीय CCTV और SD-WAN।",
        "theme_color": "indigo",
        "primary_concerns": ["failover", "sd_wan", "multi_location_billing"],
        "hero_metric": "Multi-Site Consolidated View",
        "suggested_bundle": "Multi-Location Enterprise Pack",
        "quick_actions": [
            {"id": "qa_branch", "label_en": "Manage Branches & Sites", "label_hi": "शाखाएं प्रबंधित करें", "icon": "Store"},
            {"id": "qa_advisor", "label_en": "Multi-Site Advisor", "label_hi": "मल्टी-साइट एडवाइजर", "icon": "Sparkles"},
            {"id": "qa_orders", "label_en": "Branch Rollout Tracker", "label_hi": "शाखा इंस्टॉलेशन ट्रैकर", "icon": "Clock"}
        ]
    },
    "small_manufacturer": {
        "title_en": "Small Manufacturing & Industrial Units",
        "title_hi": "लघु उद्योग एवं निर्माण इकाइयाँ",
        "description_en": "For light industrial units, textile mills, and fabrication plants needing Internet Leased Lines (ILL) and IoT machine monitoring.",
        "description_hi": "फैब्रिकेशन, टेक्सटाइल और लघु उद्योगों के लिए लीज्ड लाइन और मशीन मॉनिटरिंग IoT।",
        "theme_color": "amber",
        "primary_concerns": ["leased_line", "iot_telemetry", "managed_firewall"],
        "hero_metric": "SLA Uptime: 99.9% Symmetrical ILL",
        "suggested_bundle": "Industrial Connected Plant Pack",
        "quick_actions": [
            {"id": "qa_advisor", "label_en": "Configure Leased Line", "label_hi": "लीज्ड लाइन कॉन्फ़िगर करें", "icon": "Cpu"},
            {"id": "qa_kyc", "label_en": "Industrial KYC", "label_hi": "औद्योगिक KYC सत्यापन", "icon": "ShieldCheck"},
            {"id": "qa_orders", "label_en": "Feasibility & Turn-Up", "label_hi": "फिजिबिलिटी एवं ट्रैकिंग", "icon": "Clock"}
        ]
    }
}

class BusinessProfileCreate(BaseModel):
    owner_user_id: str
    business_name: str
    business_type: str
    city: str
    city_tier: Optional[int] = 2
    state: str
    preferred_language: Optional[str] = "en"
    employee_count: Optional[int] = 1
    num_sites: Optional[int] = 1
    has_gstin: Optional[bool] = False
    gstin: Optional[str] = None
    has_udyam: Optional[bool] = False
    udyam_number: Optional[str] = None
    partner_code: Optional[str] = None

class BusinessProfileUpdate(BaseModel):
    business_type: Optional[str] = None
    business_name: Optional[str] = None
    city: Optional[str] = None
    city_tier: Optional[int] = None
    state: Optional[str] = None
    preferred_language: Optional[str] = None
    employee_count: Optional[int] = None
    num_sites: Optional[int] = None
    has_gstin: Optional[bool] = None
    gstin: Optional[str] = None
    has_udyam: Optional[bool] = None
    udyam_number: Optional[str] = None

@router.get("/dashboard-config")
def get_dashboard_config(
    business_type: str = Query("micro_retail_services"),
    lang: str = Query("en")
):
    config = SEGMENT_CONFIGS.get(business_type, SEGMENT_CONFIGS["micro_retail_services"])
    return {
        "business_type": business_type,
        "language": lang,
        "title": config[f"title_{lang}"] if f"title_{lang}" in config else config["title_en"],
        "description": config[f"description_{lang}"] if f"description_{lang}" in config else config["description_en"],
        "theme_color": config["theme_color"],
        "hero_metric": config["hero_metric"],
        "suggested_bundle": config["suggested_bundle"],
        "quick_actions": [
            {
                "id": qa["id"],
                "label": qa[f"label_{lang}"] if f"label_{lang}" in qa else qa["label_en"],
                "icon": qa["icon"]
            }
            for qa in config["quick_actions"]
        ]
    }

@router.post("/profile")
def create_business_profile(payload: BusinessProfileCreate, conn=Depends(get_db)):
    cursor = conn.cursor()
    biz_id = f"B{str(uuid.uuid4())[:8].upper()}"
    
    cursor.execute("""
    INSERT INTO businesses (
        id, owner_user_id, business_name, business_type, city, city_tier, state,
        preferred_language, employee_count, num_sites, has_gstin, gstin, has_udyam, udyam_number, partner_code
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        biz_id, payload.owner_user_id, payload.business_name, payload.business_type,
        payload.city, payload.city_tier, payload.state, payload.preferred_language or "en",
        payload.employee_count, payload.num_sites,
        1 if payload.has_gstin else 0, payload.gstin,
        1 if payload.has_udyam else 0, payload.udyam_number, payload.partner_code
    ))
    conn.commit()

    cursor.execute("SELECT * FROM businesses WHERE id = ?", (biz_id,))
    row = cursor.fetchone()
    return {"success": True, "business": dict(row)}

@router.get("/{business_id}")
def get_business(business_id: str, conn=Depends(get_db)):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM businesses WHERE id = ?", (business_id,))
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Business not found")
    return {"success": True, "business": dict(row)}

@router.patch("/{business_id}/profile")
def update_business_profile(business_id: str, payload: BusinessProfileUpdate, conn=Depends(get_db)):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM businesses WHERE id = ?", (business_id,))
    existing = cursor.fetchone()
    if not existing:
        raise HTTPException(status_code=404, detail="Business not found")

    updates = []
    params = []
    for field, val in payload.model_dump(exclude_unset=True).items():
        if field in ["has_gstin", "has_udyam"]:
            val = 1 if val else 0
        updates.append(f"{field} = ?")
        params.append(val)

    if not updates:
        return {"success": True, "business": dict(existing)}

    params.append(business_id)
    cursor.execute(f"UPDATE businesses SET {', '.join(updates)} WHERE id = ?", tuple(params))
    conn.commit()

    cursor.execute("SELECT * FROM businesses WHERE id = ?", (business_id,))
    updated = cursor.fetchone()
    
    # Preserves active subscriptions as specified in rule 4.3 of architecture
    return {
        "success": True,
        "message": "Business profile updated. Active orders and subscriptions preserved.",
        "business": dict(updated)
    }

