import { create } from 'zustand';
import { User, Tenant } from '../types';

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isPharmacyOwner: boolean;
  isCashier: boolean;
  login: (userData: User, tenantData: Tenant | null, token: string) => void;
  logout: () => void;
  switchRolePreview: (role: User['role']) => void;
  updateTenantSettings: (settings: Partial<NonNullable<Tenant['settings']>>) => void;
}

const DEFAULT_DEMO_TENANT: Tenant = {
  id: 'tenant-demo-01',
  name: 'Al-Shifa Healthcare Pharmacy',
  slug: 'al-shifa-healthcare',
  email: 'owner@alshifapharmacy.com',
  phone: '+92 300 1234567',
  pharmacyType: 'Retail Pharmacy & Clinic',
  city: 'Islamabad',
  address: 'Blue Area, Jinnah Avenue, Islamabad',
  planId: 'premium',
  subscriptionStatus: 'active',
  settings: {
    currency: 'PKR',
    currencySymbol: 'Rs.',
    defaultTaxPercent: 0,
    taxInclusive: false,
    invoicePrefix: 'INV',
    invoiceFooterNote: 'Thank you for choosing Al-Shifa Pharmacy. Get well soon!',
    lowStockThresholdDefault: 10,
    nearExpiryDaysThreshold: 60,
    enableLoyaltyProgram: true,
    loyaltyPointsPerUnitSpent: 0.05,
    loyaltyRedemptionValue: 1,
  },
};

const DEFAULT_DEMO_USER: User = {
  id: 'user-demo-01',
  name: 'Dr. Ubaid Bangash',
  email: 'owner@alshifapharmacy.com',
  role: 'PHARMACY_OWNER',
  designation: 'Managing Pharmacist & Owner',
  phone: '+92 300 1234567',
  tenantId: 'tenant-demo-01',
};

export const useAuthStore = create<AuthState>((set) => {
  const savedUser = localStorage.getItem('pms_user');
  const savedTenant = localStorage.getItem('pms_tenant');

  const initialUser = savedUser ? JSON.parse(savedUser) : DEFAULT_DEMO_USER;
  const initialTenant = savedTenant ? JSON.parse(savedTenant) : DEFAULT_DEMO_TENANT;

  return {
    user: initialUser,
    tenant: initialTenant,
    isAuthenticated: !!initialUser,
    isSuperAdmin: initialUser?.role === 'SUPER_ADMIN',
    isPharmacyOwner: initialUser?.role === 'PHARMACY_OWNER',
    isCashier: initialUser?.role === 'CASHIER',

    login: (userData, tenantData, token) => {
      localStorage.setItem('pms_user', JSON.stringify(userData));
      if (tenantData) {
        localStorage.setItem('pms_tenant', JSON.stringify(tenantData));
        localStorage.setItem('pms_tenant_slug', tenantData.slug);
      }
      localStorage.setItem('pms_access_token', token);

      set({
        user: userData,
        tenant: tenantData,
        isAuthenticated: true,
        isSuperAdmin: userData.role === 'SUPER_ADMIN',
        isPharmacyOwner: userData.role === 'PHARMACY_OWNER',
        isCashier: userData.role === 'CASHIER',
      });
    },

    logout: () => {
      localStorage.removeItem('pms_user');
      localStorage.removeItem('pms_tenant');
      localStorage.removeItem('pms_tenant_slug');
      localStorage.removeItem('pms_access_token');

      set({
        user: null,
        tenant: null,
        isAuthenticated: false,
        isSuperAdmin: false,
        isPharmacyOwner: false,
        isCashier: false,
      });
    },

    switchRolePreview: (role) => {
      if (role === 'SUPER_ADMIN') {
        const superAdminUser: User = {
          id: 'super-admin-01',
          name: 'Muhammad Wasim',
          email: 'admin@pharmacymanagement.com',
          role: 'SUPER_ADMIN',
          designation: 'Platform Administrator & System Owner',
        };
        set({
          user: superAdminUser,
          tenant: null,
          isSuperAdmin: true,
          isPharmacyOwner: false,
          isCashier: false,
        });
      } else {
        const updatedUser: User = {
          id: 'user-demo-01',
          name:
            role === 'CASHIER'
              ? 'Asim Raza (Cashier)'
              : role === 'PHARMACIST'
              ? 'Sana Tariq (Pharmacist)'
              : 'Dr. Ubaid Bangash',
          email: 'staff@alshifapharmacy.com',
          role,
          designation:
            role === 'CASHIER'
              ? 'Counter Cashier'
              : role === 'PHARMACIST'
              ? 'Licensed Pharmacist'
              : 'Pharmacy Owner',
          tenantId: DEFAULT_DEMO_TENANT.id,
        };
        set({
          user: updatedUser,
          tenant: DEFAULT_DEMO_TENANT,
          isSuperAdmin: false,
          isPharmacyOwner: role === 'PHARMACY_OWNER',
          isCashier: role === 'CASHIER',
        });
      }
    },

    updateTenantSettings: (newSettings) => {
      set((state) => {
        if (!state.tenant) return state;
        const updatedTenant = {
          ...state.tenant,
          settings: {
            ...state.tenant.settings,
            ...newSettings,
          },
        };
        localStorage.setItem('pms_tenant', JSON.stringify(updatedTenant));
        return { tenant: updatedTenant as Tenant };
      });
    },
  };
});
