/**
 * Enterprise Pharmacy Management System - Global Constants
 * Reference: SRS v3.0 Specification
 */

module.exports = {
  // User Roles
  ROLES: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    PHARMACY_OWNER: 'PHARMACY_OWNER',
    BRANCH_MANAGER: 'BRANCH_MANAGER',
    PHARMACIST: 'PHARMACIST',
    CASHIER: 'CASHIER',
    INVENTORY_MANAGER: 'INVENTORY_MANAGER',
    ACCOUNTANT: 'ACCOUNTANT',
    STAFF_USER: 'STAFF_USER',
  },

  // Modules for Granular RBAC
  MODULES: {
    DASHBOARD: 'dashboard',
    MEDICINES: 'medicines',
    SALES: 'sales',
    PURCHASES: 'purchases',
    INVENTORY: 'inventory',
    CUSTOMERS: 'customers',
    SUPPLIERS: 'suppliers',
    REPORTS: 'reports',
    STAFF: 'staff',
    SETTINGS: 'settings',
    EXPENSES: 'expenses',
    BRANCHES: 'branches',
    SUPPORT: 'support',
    AUDIT: 'audit',
  },

  // Granular Actions
  ACTIONS: {
    VIEW: 'view',
    VIEW_OWN: 'view_own',
    VIEW_ALL: 'view_all',
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'delete',
    APPROVE: 'approve',
    VOID: 'void',
    RETURN: 'return',
    RECEIVE: 'receive',
    DISCOUNT_OVERRIDE: 'discount_override',
    ADJUST: 'adjust',
    COUNT: 'count',
    TRANSFER: 'transfer',
    EXPORT: 'export',
    IMPORT: 'import',
    VIEW_LEDGER: 'view_ledger',
    VIEW_FINANCIAL: 'view_financial',
  },

  // Subscription Plans
  SUBSCRIPTION_PLANS: {
    FREE_TRIAL: {
      id: 'free_trial',
      name: 'Free Trial',
      maxUsers: 2,
      maxBranches: 1,
      maxProducts: 500,
      priceMonthlyPKR: 0,
      priceMonthlyUSD: 0,
    },
    BASIC: {
      id: 'basic',
      name: 'Basic',
      maxUsers: 3,
      maxBranches: 1,
      maxProducts: 2000,
      priceMonthlyPKR: 2800,
      priceMonthlyUSD: 10,
    },
    STANDARD: {
      id: 'standard',
      name: 'Standard',
      maxUsers: 8,
      maxBranches: 1,
      maxProducts: -1, // unlimited
      priceMonthlyPKR: 6900,
      priceMonthlyUSD: 25,
    },
    PREMIUM: {
      id: 'premium',
      name: 'Premium',
      maxUsers: 20,
      maxBranches: 3,
      maxProducts: -1,
      priceMonthlyPKR: 16800,
      priceMonthlyUSD: 60,
    },
    ENTERPRISE: {
      id: 'enterprise',
      name: 'Enterprise',
      maxUsers: -1,
      maxBranches: -1,
      maxProducts: -1,
      priceMonthlyPKR: 0, // custom quote
      priceMonthlyUSD: 0,
    },
  },

  // Subscription States
  SUBSCRIPTION_STATUS: {
    TRIAL: 'trial',
    ACTIVE: 'active',
    PAST_DUE: 'past_due',
    SUSPENDED: 'suspended',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
  },

  // Payment Methods
  PAYMENT_METHODS: {
    CASH: 'cash',
    CARD: 'card',
    BANK_TRANSFER: 'bank_transfer',
    JAZZCASH: 'jazzcash',
    EASYPAISA: 'easypaisa',
    CREDIT: 'credit',
    SPLIT: 'split',
  },

  // Purchase & Sales Order Statuses
  STATUS: {
    DRAFT: 'draft',
    PENDING: 'pending',
    SENT: 'sent',
    PARTIALLY_RECEIVED: 'partially_received',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    VOID: 'void',
    RETURNED: 'returned',
  },

  // Customer Types
  CUSTOMER_TYPES: {
    WALK_IN: 'walk_in',
    REGULAR: 'regular',
    LOYALTY: 'loyalty',
    WHOLESALE: 'wholesale',
    INSTITUTIONAL: 'institutional',
  },

  // Stock Adjustment Reasons
  STOCK_ADJUSTMENT_TYPES: {
    PHYSICAL_CORRECTION: 'Physical count correction',
    DAMAGE_WRITE_OFF: 'Damage write-off',
    THEFT_LOSS: 'Theft loss',
    SAMPLE: 'Sample',
    SYSTEM_ERROR: 'System error',
  },

  // Loyalty Tiers
  LOYALTY_TIERS: {
    BRONZE: 'Bronze',
    SILVER: 'Silver',
    GOLD: 'Gold',
    PLATINUM: 'Platinum',
  },
};
