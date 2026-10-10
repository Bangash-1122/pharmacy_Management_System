# Pharmacy Management System (PMS) — Enterprise SaaS Platform

**Software Requirements Specification (SRS v3.0 Final) & Technical Architecture Implementation**  
**System Owner / Super Admin:** Muhammad Wasim  
**Lead Engineer:** Ubaid Bangash (Software Engineer & System Administrator)

---

## 🌟 Executive Overview

The **Pharmacy Management System (PMS)** is a multi-tenant, subscription-based cloud platform engineered for pharmacies, medical stores, hospital dispensaries, and retail pharmacy chains. It provides complete operational coverage across the pharmacy lifecycle—from rapid counter Point of Sale (POS) billing with First-Expired-First-Out (FEFO) batch allocation, to procurement, supplier/customer ledgers, expiry radars, multi-branch stock transfers, and automated Profit & Loss (P&L) financial reporting.

---

## 🏗️ Architecture & Technology Stack

```
pharmacy-ManagementSystem/
├── Backend/                      # Modular Enterprise REST API
│   ├── src/
│   │   ├── config/               # DB connections, environment, RBAC constants
│   │   ├── middleware/           # Auth, Tenant isolation, RBAC, Rate Limiting, Audit, Errors
│   │   ├── utils/                # Standard ApiResponse, JWT, Barcode generation, Logger
│   │   ├── models/               # Mongoose & relational schemas (Tenant, User, Medicine, Batch, etc.)
│   │   ├── modules/              # Domain-driven feature modules
│   │   │   ├── auth/             # Registration, login, JWT refresh, 2FA
│   │   │   ├── superAdmin/       # SaaS KPIs (MRR/ARR), tenant management, plan overrides
│   │   │   ├── medicines/        # Medicine catalog, generics, barcodes, categories
│   │   │   ├── inventory/        # FEFO batch engine, Expiry Radar, Stock adjustments
│   │   │   ├── sales/            # POS checkout, loyalty points, returns, thermal receipts
│   │   │   ├── purchases/        # Purchase Orders (PO), GRN receiving, stock increments
│   │   │   ├── suppliers/        # Supplier master & ledger
│   │   │   ├── customers/        # Patient profiles, credit ledger, 4-tier loyalty
│   │   │   ├── branches/         # Multi-branch locations, inter-branch stock transfers
│   │   │   ├── expenses/         # Daily operating expenses, P&L integration
│   │   │   ├── reports/          # P&L statements, best sellers, cashier summaries
│   │   │   ├── staff/            # User profiles & granular action-level RBAC matrix
│   │   │   ├── notifications/    # In-app alerts (low stock, near-expiry, dues)
│   │   │   ├── support/          # Support ticketing with SLA escalation
│   │   │   └── audit/            # Tamper-evident write-once audit trail
│   │   ├── routes/               # Unified /api/v1 router
│   │   ├── app.js                # Express app with Helmet, CORS, and compression
│   │   └── server.js             # Server lifecycle & auto-seeding
│   ├── .env                      # Environment configuration
│   └── package.json
│
└── Frontend/                     # Modern React 19 + TypeScript + Vite PWA
    ├── src/
    │   ├── store/                # Zustand State Management (useAuthStore, usePOSStore)
    │   ├── components/           # Sidebar, Header, Thermal POS Receipt Modal
    │   ├── pages/
    │   │   ├── LandingPage.tsx   # Public SaaS marketing, pricing tiers & 30-day trial registration
    │   │   ├── SuperAdminDashboard.tsx # Platform KPIs (MRR/ARR/Churn), tenant controls
    │   │   ├── POSPage.tsx       # High-speed POS counter (F1 search, F9 checkout, FEFO allocation)
    │   │   ├── InventoryPage.tsx # Expiry Radar (<7, <30, <60, <90 days), batch valuation
    │   │   ├── MedicinesPage.tsx # Medicine Master catalog, dosage forms, barcodes
    │   │   ├── PurchasesPage.tsx # Automated reorder advisor & Goods Received Notes (GRN)
    │   │   ├── SuppliersPage.tsx # Supplier master & accounts payable ledger
    │   │   ├── CustomersPage.tsx # Patient credit ledger & loyalty rewards (Bronze to Platinum)
    │   │   ├── BranchesPage.tsx  # Multi-branch hubs & inter-branch transfer dispatch/receive
    │   │   ├── ExpensesPage.tsx  # Daily operational expenses & category distribution
    │   │   ├── ReportsPage.tsx   # Financial Profit & Loss (P&L) and sales velocity
    │   │   ├── StaffPage.tsx     # Staff management & granular RBAC permission matrix
    │   │   └── SettingsPage.tsx  # Pharmacy branding, thermal receipt customization, thresholds
    │   ├── services/             # Axios API client with bearer token injection
    │   ├── styles/               # Glassmorphism, medical UI tokens, typography
    │   └── types/                # Strict TypeScript data models
    ├── vite.config.ts
    └── package.json
```

### Technology Highlights (SRS Section 13.1):
- **Backend**: Node.js, Express.js, MongoDB/Mongoose (with PostgreSQL/RLS compatible schema design), Zod Schema Validation, JWT Authentication (15m Access, 7d Refresh), Bcrypt (cost factor 12), Helmet, Morgan, Express-Rate-Limit.
- **Frontend**: React 19, TypeScript, Vite, **Zustand** (Client State Management), **TanStack Query / React Query** (Server State Caching), Lucide Icons, Modern Glassmorphism CSS design system with Plus Jakarta Sans & Outfit typography.

---

## 💼 Core Business Modules & Workflows

### 1. Point of Sale (POS) & FEFO Auto-Allocation
- **High-Speed Counter Billing**: Keyboard-first shortcuts (`F1` for instant search, `F9` for checkout) and barcode scanner auto-detection.
- **Automated FEFO**: System automatically allocates stock from the earliest non-expired batch, eliminating manual batch picking errors.
- **Flexible Payments**: Supports Cash, Card, Bank Transfer, JazzCash/Easypaisa, Customer Credit Ledger, and Split Payments.
- **Printable Receipts**: Compact 58mm / 80mm thermal receipts and full A4 wholesale invoices.

### 2. FEFO Expiry Radar & Inventory Control
- **Expiry Countdown Filters**: Real-time radar categorizing stock expiring within 7 days, 30 days, 60 days, and 90 days.
- **Inventory Valuation**: Real-time asset valuation at Purchase Cost (FIFO) and Retail Selling Price.
- **Stock Audit Reconciliation**: Structured physical count audit cycles with automatic variance calculation and audit adjustment logs.

### 3. Procurement & Goods Received Notes (GRN)
- **Automated Low-Stock Advisor**: Analyzes minimum safety levels and recommends 1-click Purchase Orders.
- **GRN Receiving**: Captures batch numbers, manufacturing/expiry dates, bonus items, and increments stock ledger instantly while updating supplier balances.

### 4. Patient CRM, Credit Ledger & Loyalty Club
- **Customer Dues Tracking**: Detailed credit ledger tracking patient dues and recording incremental payments.
- **4-Tier Loyalty Program**: Bronze, Silver, Gold, Platinum tiers based on customer lifetime spend, with instant point redemptions at POS.

### 5. Super Admin Platform (Platform Owner: Muhammad Wasim)
- **SaaS Business Metrics**: Live MRR, ARR, active subscription breakdowns (Trial, Basic, Standard, Premium, Enterprise), churn rate, and system health status.
- **Pharmacy Tenant Controls**: One-click account activation/suspension, subscription tier override, and audit-logged impersonation mode.

---

## 🔒 Security & Multi-Tenancy

1. **Logical Data Isolation**: Strict multi-tenant isolation enforcing `tenant_id` filtering on all operations.
2. **Granular RBAC**: Action-level permissions (`view`, `create`, `edit`, `delete`, `approve`, `void`, `return`, `receive`) across roles:
   - Super Admin
   - Pharmacy Owner
   - Branch Manager
   - Pharmacist
   - Cashier
   - Inventory Manager
   - Accountant
   - Staff User
3. **Audit Trails**: Tamper-evident, write-once logs recording user, IP, module, action, and payload summaries.
4. **Brute Force Protection**: Rate-limiting on authentication endpoints (30 req / 15 min).

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18+ recommended, tested on v24.x)
- **MongoDB** (Local instance or MongoDB Atlas connection string)

### 1. Backend Setup & Start
```bash
# 1. Navigate to the Backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env)
# Verify PORT=5500 and MONGODB_URI=mongodb://127.0.0.1:27017/pharmacy_saas

# 4. Start backend in development mode
npm run dev
```
The Backend API will start at `http://localhost:5500` with the health endpoint at `http://localhost:5500/api/v1/health`.

### 2. Frontend Setup & Start
```bash
# 1. Open a new terminal and navigate to Frontend
cd Frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
The Frontend UI will be available at `http://localhost:5173`.

---

## 🔑 Default Seed Accounts (For Demo & Testing)

| Role | Email | Password | Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin (Platform Owner)** | `admin@pharmacymanagement.com` | `AdminPassword@2026` | Global SaaS Control |
| **Pharmacy Owner (Al-Shifa Pharmacy)** | `owner@alshifapharmacy.com` | `PharmacyPassword@2026` | Full Pharmacy Ops |
| **Licensed Pharmacist** | `sana.pharmacist@alshifapharmacy.com` | `PharmacyPassword@2026` | Dispensing & Inventory |
| **Counter Cashier** | `asim.cashier@alshifapharmacy.com` | `PharmacyPassword@2026` | POS Billing |

*Note: The frontend UI includes a **Role Switcher** in the top navigation bar to test all user roles with 1 click.*

---

## 📄 License & Document Classification
- **Document Ref:** SRS v3.0 Final & Technical Design Addendum
- **Author & Maintainer:** Ubaid Bangash
- **System Owner:** Muhammad Wasim
- **Classification:** Enterprise SaaS Platform (Confidential)
