import os
import sqlite3
import pandas as pd

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "YTL_TrackA_Udyam_Digital_Data")
DB_PATH = os.path.join(os.path.dirname(__file__), "udyam_digital.db")

def init_db():
    print(f"Initializing database at: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Drop existing tables if re-seeding
    cursor.executescript("""
    DROP TABLE IF EXISTS product_catalogue;
    DROP TABLE IF EXISTS mock_gstin_registry;
    DROP TABLE IF EXISTS mock_udyam_registry;
    DROP TABLE IF EXISTS smb_leads;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS businesses;
    DROP TABLE IF EXISTS quotes;
    DROP TABLE IF EXISTS consents;
    DROP TABLE IF EXISTS kyc_cases;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS order_milestones;
    DROP TABLE IF EXISTS handoff_tasks;
    
    CREATE TABLE users (
        id TEXT PRIMARY KEY,
        mobile TEXT NOT NULL UNIQUE,
        role TEXT CHECK(role IN ('customer', 'partner', 'sales_agent', 'admin')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE businesses (
        id TEXT PRIMARY KEY,
        owner_user_id TEXT REFERENCES users(id),
        business_name TEXT NOT NULL,
        business_type TEXT CHECK(business_type IN ('micro_retail_services', 'professional_office', 'small_multisite', 'small_manufacturer')),
        city TEXT NOT NULL,
        city_tier INTEGER CHECK(city_tier IN (1, 2)),
        state TEXT NOT NULL,
        preferred_language TEXT DEFAULT 'en',
        employee_count INTEGER DEFAULT 1,
        num_sites INTEGER DEFAULT 1,
        has_gstin BOOLEAN DEFAULT 0,
        gstin TEXT,
        has_udyam BOOLEAN DEFAULT 0,
        udyam_number TEXT,
        partner_code TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE quotes (
        id TEXT PRIMARY KEY,
        business_id TEXT REFERENCES businesses(id),
        bundle_name TEXT NOT NULL,
        monthly_recurring_total INTEGER NOT NULL,
        one_time_setup_total INTEGER NOT NULL,
        contract_months INTEGER NOT NULL,
        items_json TEXT NOT NULL,
        status TEXT CHECK(status IN ('draft', 'presented', 'accepted', 'expired')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE consents (
        id TEXT PRIMARY KEY,
        business_id TEXT REFERENCES businesses(id),
        purpose TEXT NOT NULL,
        notice_version TEXT NOT NULL,
        is_granted BOOLEAN NOT NULL,
        granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE kyc_cases (
        id TEXT PRIMARY KEY,
        business_id TEXT REFERENCES businesses(id),
        track TEXT CHECK(track IN ('gstin', 'non_gstin_udyam')),
        status TEXT CHECK(status IN ('pending', 'verified', 'needs_review', 'rejected')),
        flagged_reasons TEXT,
        extracted_data TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE orders (
        id TEXT PRIMARY KEY,
        business_id TEXT REFERENCES businesses(id),
        quote_id TEXT REFERENCES quotes(id),
        kyc_case_id TEXT REFERENCES kyc_cases(id),
        status TEXT CHECK(status IN ('order_placed', 'kyc_cleared', 'installation_scheduled', 'activated', 'cancelled')),
        expected_activation_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE order_milestones (
        id TEXT PRIMARY KEY,
        order_id TEXT REFERENCES orders(id),
        stage_name TEXT NOT NULL,
        status TEXT CHECK(status IN ('completed', 'in_progress', 'pending')),
        sla_time TEXT,
        completed_at TIMESTAMP
    );

    CREATE TABLE handoff_tasks (
        id TEXT PRIMARY KEY,
        business_id TEXT REFERENCES businesses(id),
        lead_id TEXT,
        partner_id TEXT,
        stage_stalled TEXT NOT NULL,
        reason TEXT NOT NULL,
        status TEXT CHECK(status IN ('open', 'claimed', 'resolved')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()

def load_csv_data():
    conn = sqlite3.connect(DB_PATH)
    
    # 1. Product Catalogue
    prod_csv = os.path.join(DATA_DIR, "product_catalogue.csv")
    if os.path.exists(prod_csv):
        df_prod = pd.read_csv(prod_csv)
        df_prod.to_sql("product_catalogue", conn, if_exists="replace", index=False)
        print(f"Loaded {len(df_prod)} rows into product_catalogue")
    else:
        print(f"Warning: {prod_csv} not found")

    # 2. Mock GSTIN Registry
    gst_csv = os.path.join(DATA_DIR, "mock_gstin_registry.csv")
    if os.path.exists(gst_csv):
        df_gst = pd.read_csv(gst_csv)
        df_gst.to_sql("mock_gstin_registry", conn, if_exists="replace", index=False)
        print(f"Loaded {len(df_gst)} rows into mock_gstin_registry")
    else:
        print(f"Warning: {gst_csv} not found")

    # 3. Mock Udyam Registry
    udyam_csv = os.path.join(DATA_DIR, "mock_udyam_registry.csv")
    if os.path.exists(udyam_csv):
        df_udyam = pd.read_csv(udyam_csv)
        df_udyam.to_sql("mock_udyam_registry", conn, if_exists="replace", index=False)
        print(f"Loaded {len(df_udyam)} rows into mock_udyam_registry")
    else:
        print(f"Warning: {udyam_csv} not found")

    # 4. SMB Leads
    leads_csv = os.path.join(DATA_DIR, "smb_leads.csv")
    if os.path.exists(leads_csv):
        df_leads = pd.read_csv(leads_csv)
        df_leads.to_sql("smb_leads", conn, if_exists="replace", index=False)
        print(f"Loaded {len(df_leads)} rows into smb_leads")
    else:
        print(f"Warning: {leads_csv} not found")

    # Seed default demo users & businesses
    cursor = conn.cursor()
    cursor.execute("""
    INSERT OR IGNORE INTO users (id, mobile, role) VALUES 
    ('U001', '9876543210', 'customer'),
    ('U002', '9876543211', 'customer'),
    ('P001', '9123456789', 'partner'),
    ('S001', '9988776655', 'sales_agent');
    """)

    cursor.execute("""
    INSERT OR IGNORE INTO businesses (
        id, owner_user_id, business_name, business_type, city, city_tier, state, preferred_language, employee_count, num_sites, has_gstin, has_udyam
    ) VALUES
    ('B001', 'U001', 'Sharma Kirana & General Store', 'micro_retail_services', 'Jaipur', 2, 'Rajasthan', 'hi', 3, 1, 0, 1),
    ('B002', 'U002', 'Acuity Chartered Accountants', 'professional_office', 'Bangalore', 1, 'Karnataka', 'en', 12, 1, 1, 1);
    """)

    conn.commit()
    conn.close()
    print("Database seeding completed successfully.")

if __name__ == "__main__":
    init_db()
    load_csv_data()

