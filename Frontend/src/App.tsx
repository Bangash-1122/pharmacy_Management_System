import React, { useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { HospitalDashboardPage } from './pages/HospitalDashboardPage';
import { POSPage } from './pages/POSPage';
import { SaleReturnsPage } from './pages/SaleReturnsPage';
import { CustomerSaleReturnPage } from './pages/CustomerSaleReturnPage';
import { DoctorDirectoryPage } from './pages/DoctorDirectoryPage';
import { OTStationPage } from './pages/OTStationPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { LoginHistoryPage } from './pages/LoginHistoryPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { InventoryPage } from './pages/InventoryPage';
import { PurchasesPage } from './pages/PurchasesPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { SupplierAccountsPage } from './pages/SupplierAccountsPage';
import { PurchaseDeskPage } from './pages/PurchaseDeskPage';
import { PurchaseReturnPage } from './pages/PurchaseReturnPage';
import { PurchaseHistoryPage } from './pages/PurchaseHistoryPage';
import { CustomersPage } from './pages/CustomersPage';
import { BranchesPage } from './pages/BranchesPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { ReportsPage } from './pages/ReportsPage';
import { StaffPage } from './pages/StaffPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showLanding, setShowLanding] = useState(false);

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Hospital & Pharmacy Dashboard';
      case 'pos':
        return 'Sale Desk (POS)';
      case 'sales-history':
      case 'sale-returns':
        return 'Sale Returns';
      case 'sale-return-process':
        return 'Customer Sale Return & Refund';
      case 'doctor-appointments':
      case 'doctor-appointment-live':
      case 'doctors':
        return 'Doctor Consultants & Specialists Directory';
      case 'ot-station':
      case 'ot-live-screen':
      case 'ot-book-surgery':
      case 'ot-reports':
        return 'Operation Theater (OT) Suite';
      case 'notifications':
        return 'Notifications & Alerts (Attention Center)';
      case 'audit-logs':
        return 'Audit Logs';
      case 'login-history':
        return 'Login History';
      case 'purchase-desk':
        return 'Purchase Desk';
      case 'purchase-return':
        return 'Purchase Return to Supplier / Vendor';
      case 'purchase-history':
        return 'Purchases';
      case 'suppliers':
        return 'Suppliers';
      case 'supplier-accounts':
        return 'Supplier accounts';
      case 'products':
        return 'Products';
      case 'inventory':
      case 'adjust-stock':
        return 'Inventory Stock & FEFO Batch Radar';
      case 'customers':
      case 'patients-registry':
        return 'Customers & Patients';
      case 'emergency':
      case 'admissions-wards':
      case 'rooms-beds':
        return 'Inpatient Admissions & Wards';
      case 'indoor-sale':
      case 'indoor-sales-history':
        return 'Indoor Patient Sales';
      case 'branches':
        return 'Multi-Branch & Stock Transfers';
      case 'expenses':
      case 'cash-accounts':
        return 'Daily Operating Expenses & Cash Accounts';
      case 'reports':
        return 'Profit & Loss (P&L) Reports';
      case 'users':
      case 'employees':
      case 'roles':
        return 'Hospital Staff & Roles Matrix';
      case 'settings':
        return 'Hospital & Pharmacy Settings';
      default:
        return 'Haji Waris Khan General Hospital';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HospitalDashboardPage onNavigateTab={(tab) => setActiveTab(tab)} />;

      // Sales
      case 'pos':
      case 'indoor-sale':
        return (
          <POSPage
            onNavigateHistory={() => setActiveTab('sales-history')}
            onNavigateCustomerReturn={() => setActiveTab('sale-return-process')}
          />
        );
      case 'sales-history':
      case 'sale-returns':
      case 'indoor-sales-history':
        return (
          <SaleReturnsPage
            onProcessNewReturn={() => setActiveTab('sale-return-process')}
            onNavigateHistory={() => setActiveTab('pos')}
          />
        );
      case 'sale-return-process':
        return <CustomerSaleReturnPage onBack={() => setActiveTab('pos')} />;

      // OPD & Doctors
      case 'doctor-appointments':
      case 'doctor-appointment-live':
      case 'doctors':
        return <DoctorDirectoryPage />;

      // Operation Theater & Inpatient
      case 'ot-station':
      case 'ot-live-screen':
      case 'ot-book-surgery':
      case 'ot-reports':
      case 'emergency':
      case 'admissions-wards':
      case 'rooms-beds':
        return <OTStationPage />;

      // Purchases & Suppliers
      case 'purchase-desk':
        return <PurchaseDeskPage onNavigateHistory={() => setActiveTab('purchase-history')} />;
      case 'purchase-return':
        return <PurchaseReturnPage onBack={() => setActiveTab('purchase-desk')} />;
      case 'purchase-history':
        return <PurchaseHistoryPage onNewPurchase={() => setActiveTab('purchase-desk')} />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'supplier-accounts':
        return <SupplierAccountsPage />;

      // Catalog
      case 'products':
        return <MedicinesPage />;
      case 'inventory':
      case 'adjust-stock':
        return <InventoryPage />;
      case 'customers':
      case 'patients-registry':
        return <CustomersPage />;

      // Finance & Admin
      case 'cash-accounts':
      case 'expenses':
        return <ExpensesPage />;
      case 'employees':
      case 'users':
      case 'roles':
        return <StaffPage />;
      case 'reports':
        return <ReportsPage />;
      case 'branches':
        return <BranchesPage />;
      case 'login-history':
        return <LoginHistoryPage />;
      case 'audit-logs':
      case 'backups':
        return <AuditLogsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'notifications':
        return (
          <NotificationsPage
            onNewPurchase={() => setActiveTab('purchase-desk')}
            onFullInventory={() => setActiveTab('inventory')}
          />
        );

      default:
        return <HospitalDashboardPage onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f8' }}>
      {/* Deep Green Hospital Sidebar with Emblem Logo */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflow: 'hidden' }}>
        <Header
          title={getPageTitle()}
          onOpenLanding={() => setShowLanding(true)}
          onBack={() => {
            if (activeTab === 'sale-return-process' || activeTab === 'sales-history') {
              setActiveTab('pos');
            } else if (activeTab === 'purchase-return' || activeTab === 'purchase-history') {
              setActiveTab('purchase-desk');
            } else if (activeTab === 'supplier-accounts') {
              setActiveTab('suppliers');
            } else {
              setActiveTab('dashboard');
            }
          }}
        />

        {/* Scrollable Main View Area */}
        <main style={{ padding: '1.25rem 1.5rem', flex: 1, overflowY: 'auto' }}>
          {renderContent()}
        </main>

        {/* Hospital ERP Bottom Footer */}
        <footer
          style={{
            height: '36px',
            borderTop: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5rem',
            fontSize: '0.72rem',
            color: '#64748b',
            flexShrink: 0,
          }}
        >
          <div>
            © 2026 <strong>Haji Waris Khan General Hospital</strong> — Hospital &amp; Pharmacy Management System
          </div>
          <div style={{ fontWeight: 500, color: '#94a3b8' }}>
            Authorized Medical &amp; Clinical ERP
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
