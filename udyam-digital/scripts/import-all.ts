import fs from 'fs';
import path from 'path';
// @ts-ignore
import { DatabaseSync } from 'node:sqlite';

const DB_PATH = path.resolve(process.cwd(), 'udyam_digital.db');
const DATA_DIR = path.resolve(process.cwd(), '..', 'YTL_TrackA_Udyam_Digital_Data');

function parseCsv(filePath: string): Record<string, string>[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return [];

  // Parse header
  const headers = parseCsvLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length === headers.length) {
      const row: Record<string, string> = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j];
      }
      rows.push(row);
    }
  }
  return rows;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function seed() {
  console.log(`[Seed] Initializing SQLite database at: ${DB_PATH}`);
  const db = new DatabaseSync(DB_PATH);

  db.exec(`
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS catalogue_products;
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

    CREATE TABLE catalogue_products (
      product_id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      product_name TEXT NOT NULL,
      description TEXT NOT NULL,
      unit TEXT NOT NULL,
      price_min_inr_per_month INTEGER NOT NULL,
      price_max_inr_per_month INTEGER NOT NULL,
      one_time_setup_inr INTEGER NOT NULL,
      min_contract_months INTEGER NOT NULL,
      available_city_tiers TEXT NOT NULL,
      min_employees INTEGER NOT NULL,
      min_sites INTEGER NOT NULL,
      requires_gstin TEXT NOT NULL,
      requires_one_of TEXT,
      typical_install_days INTEGER NOT NULL,
      target_segments TEXT NOT NULL
    );

    CREATE TABLE mock_gstin_registry (
      gstin TEXT PRIMARY KEY,
      legal_name TEXT NOT NULL,
      trade_name TEXT NOT NULL,
      constitution TEXT NOT NULL,
      principal_place_of_business TEXT NOT NULL,
      state TEXT NOT NULL,
      registration_date TEXT NOT NULL,
      status TEXT NOT NULL
    );

    CREATE TABLE mock_udyam_registry (
      udyam_number TEXT PRIMARY KEY,
      enterprise_name TEXT NOT NULL,
      enterprise_type TEXT NOT NULL,
      major_activity TEXT NOT NULL,
      nic_description TEXT NOT NULL,
      state TEXT NOT NULL,
      city TEXT NOT NULL,
      date_of_registration TEXT NOT NULL
    );

    CREATE TABLE smb_leads (
      lead_id TEXT PRIMARY KEY,
      created_date TEXT,
      lead_source TEXT,
      business_name TEXT,
      business_type TEXT,
      segment TEXT,
      city TEXT,
      city_tier INTEGER,
      state TEXT,
      preferred_language TEXT,
      employee_count INTEGER,
      num_sites INTEGER,
      annual_turnover_band TEXT,
      has_gstin TEXT,
      gstin TEXT,
      has_udyam TEXT,
      udyam_number TEXT,
      current_internet TEXT,
      current_provider TEXT,
      monthly_telecom_spend_inr INTEGER,
      products_of_interest TEXT,
      contact_name TEXT,
      contact_role TEXT,
      stage_reached TEXT,
      outcome TEXT,
      drop_reason TEXT,
      acquisition_cost_inr INTEGER
    );

    CREATE TABLE users (
      id TEXT PRIMARY KEY,
      mobile TEXT NOT NULL UNIQUE,
      role TEXT CHECK(role IN ('customer', 'partner', 'sales_agent', 'admin')) DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE businesses (
      id TEXT PRIMARY KEY,
      owner_user_id TEXT NOT NULL REFERENCES users(id),
      business_name TEXT NOT NULL,
      business_type TEXT NOT NULL,
      city TEXT NOT NULL,
      city_tier INTEGER NOT NULL DEFAULT 2,
      state TEXT NOT NULL,
      preferred_language TEXT DEFAULT 'en',
      employee_count INTEGER NOT NULL DEFAULT 1,
      num_sites INTEGER NOT NULL DEFAULT 1,
      has_gstin INTEGER NOT NULL DEFAULT 0,
      gstin TEXT,
      has_udyam INTEGER NOT NULL DEFAULT 0,
      udyam_number TEXT,
      partner_code TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE quotes (
      id TEXT PRIMARY KEY,
      business_id TEXT NOT NULL REFERENCES businesses(id),
      bundle_name TEXT NOT NULL,
      monthly_recurring_total INTEGER NOT NULL,
      one_time_setup_total INTEGER NOT NULL,
      contract_months INTEGER NOT NULL,
      items_json TEXT NOT NULL,
      status TEXT CHECK(status IN ('draft', 'presented', 'accepted', 'expired')) DEFAULT 'presented',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE consents (
      id TEXT PRIMARY KEY,
      business_id TEXT NOT NULL REFERENCES businesses(id),
      purpose TEXT NOT NULL,
      notice_version TEXT NOT NULL,
      is_granted INTEGER NOT NULL,
      ip_address TEXT,
      granted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE kyc_cases (
      id TEXT PRIMARY KEY,
      business_id TEXT NOT NULL REFERENCES businesses(id),
      track TEXT NOT NULL,
      status TEXT CHECK(status IN ('pending', 'verified', 'needs_review', 'rejected')) DEFAULT 'pending',
      flagged_reasons TEXT,
      extracted_data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE orders (
      id TEXT PRIMARY KEY,
      business_id TEXT NOT NULL REFERENCES businesses(id),
      quote_id TEXT NOT NULL REFERENCES quotes(id),
      kyc_case_id TEXT NOT NULL REFERENCES kyc_cases(id),
      status TEXT CHECK(status IN ('order_placed', 'kyc_cleared', 'installation_scheduled', 'activated', 'cancelled')) DEFAULT 'order_placed',
      expected_activation_date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE order_milestones (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id),
      stage_name TEXT NOT NULL,
      status TEXT CHECK(status IN ('completed', 'in_progress', 'pending')) NOT NULL,
      sla_time TEXT NOT NULL,
      completed_at DATETIME
    );

    CREATE TABLE handoff_tasks (
      id TEXT PRIMARY KEY,
      business_id TEXT NOT NULL REFERENCES businesses(id),
      lead_id TEXT,
      partner_id TEXT,
      stage_stalled TEXT NOT NULL,
      reason TEXT NOT NULL,
      status TEXT CHECK(status IN ('open', 'claimed', 'resolved')) DEFAULT 'open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 1. Ingest Catalogue
  const prodRows = parseCsv(path.join(DATA_DIR, 'product_catalogue.csv'));
  const insertProd = db.prepare(`
    INSERT INTO catalogue_products VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const r of prodRows) {
    insertProd.run(
      r.product_id, r.category, r.product_name, r.description, r.unit,
      parseInt(r.price_min_inr_per_month) || 0, parseInt(r.price_max_inr_per_month) || 0,
      parseInt(r.one_time_setup_inr) || 0, parseInt(r.min_contract_months) || 12,
      r.available_city_tiers, parseInt(r.min_employees) || 1, parseInt(r.min_sites) || 1,
      r.requires_gstin, r.requires_one_of || null, parseInt(r.typical_install_days) || 3,
      r.target_segments
    );
  }
  console.log(`[Seed] Ingested ${prodRows.length} catalogue products.`);

  // 2. Ingest GSTIN Registry
  const gstRows = parseCsv(path.join(DATA_DIR, 'mock_gstin_registry.csv'));
  const insertGst = db.prepare(`
    INSERT INTO mock_gstin_registry VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const r of gstRows) {
    insertGst.run(
      r.gstin, r.legal_name, r.trade_name, r.constitution,
      r.principal_place_of_business, r.state, r.registration_date, r.status
    );
  }
  console.log(`[Seed] Ingested ${gstRows.length} mock GSTIN records.`);

  // 3. Ingest Udyam Registry
  const udyamRows = parseCsv(path.join(DATA_DIR, 'mock_udyam_registry.csv'));
  const insertUdyam = db.prepare(`
    INSERT INTO mock_udyam_registry VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const r of udyamRows) {
    insertUdyam.run(
      r.udyam_number, r.enterprise_name, r.enterprise_type, r.major_activity,
      r.nic_description, r.state, r.city, r.date_of_registration
    );
  }
  console.log(`[Seed] Ingested ${udyamRows.length} mock Udyam records.`);

  // 4. Ingest SMB Leads
  const leadRows = parseCsv(path.join(DATA_DIR, 'smb_leads.csv'));
  const insertLead = db.prepare(`
    INSERT INTO smb_leads (
      lead_id, created_date, lead_source, business_name, business_type, segment,
      city, city_tier, state, preferred_language, employee_count, num_sites,
      annual_turnover_band, has_gstin, gstin, has_udyam, udyam_number,
      current_internet, current_provider, monthly_telecom_spend_inr,
      products_of_interest, contact_name, contact_role, stage_reached, outcome, drop_reason, acquisition_cost_inr
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const r of leadRows) {
    insertLead.run(
      r.lead_id, r.created_date, r.lead_source, r.business_name, r.business_type, r.segment,
      r.city, parseInt(r.city_tier) || 2, r.state, r.preferred_language,
      parseInt(r.employee_count) || 1, parseInt(r.num_sites) || 1, r.annual_turnover_band,
      r.has_gstin, r.gstin || null, r.has_udyam, r.udyam_number || null,
      r.current_internet || null, r.current_provider || null, parseInt(r.monthly_telecom_spend_inr) || 0,
      r.products_of_interest, r.contact_name, r.contact_role, r.stage_reached, r.outcome, r.drop_reason || null,
      parseInt(r.acquisition_cost_inr) || 15000
    );
  }
  console.log(`[Seed] Ingested ${leadRows.length} SMB leads.`);

  // Seed default demo accounts
  db.exec(`
    INSERT INTO users (id, mobile, role) VALUES 
      ('U_KIRANA', '9876543210', 'customer'),
      ('U_CLINIC', '9876543211', 'customer'),
      ('U_PARTNER', '9123456789', 'partner'),
      ('U_SALES', '9988776655', 'sales_agent');

    INSERT INTO businesses (
      id, owner_user_id, business_name, business_type, city, city_tier, state,
      preferred_language, employee_count, num_sites, has_gstin, has_udyam, partner_code
    ) VALUES
      ('B_KIRANA', 'U_KIRANA', 'Sharma Kirana & Daily Needs', 'micro_retail_services', 'Jaipur', 2, 'Rajasthan', 'hi', 2, 1, 0, 1, 'PARTNER_RAJ01'),
      ('B_CLINIC', 'U_CLINIC', 'Aura Dental & Care Clinic', 'professional_office', 'Bangalore', 1, 'Karnataka', 'en', 6, 1, 1, 1, null);

    -- Seed sample stalled handoff task for Partner demo
    INSERT INTO handoff_tasks (id, business_id, lead_id, partner_id, stage_stalled, reason, status)
    VALUES ('HT001', 'B_KIRANA', 'L00003', 'U_PARTNER', 'Needs assessed', 'Owner requested help with POS router compatibility', 'open');
  `);

  console.log('[Seed] Database initialization and seeding complete.');
  db.close();
}

seed();
