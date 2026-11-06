import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "udyam_digital.db")
DATA_DIR = os.path.join(BASE_DIR, "..", "YTL_TrackA_Udyam_Digital_Data")
KYC_DOCS_DIR = os.path.join(DATA_DIR, "kyc_documents")
BENCHMARK_DATE = "2026-07-15"

