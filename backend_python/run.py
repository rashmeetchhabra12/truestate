#!/usr/bin/env python
"""Run the TruEstate Backend API"""

import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import app
import uvicorn

if __name__ == "__main__":
    print("🚀 Starting TruEstate Backend API...")
    print("📚 API Docs: http://localhost:8080/docs")
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")
