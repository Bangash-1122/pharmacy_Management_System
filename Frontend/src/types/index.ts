export interface User {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'PHARMACY_OWNER' | 'BRANCH_MANAGER' | 'PHARMACIST' | 'CASHIER' | 'INVENTORY_MANAGER' | 'ACCOUNTANT' | 'STAFF_USER';
  designation?: string;
  phone?: string;
  tenantId?: string;
  branchId?: string;
  permissions?: { module: string; action: string }[];
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  pharmacyType: string;
  city: string;
  address?: string;
  planId: string;
  subscriptionStatus: 'trial' | 'active' | 'past_due' | 'suspended' | 'cancelled' | 'expired';
  settings?: {
    currency: string;
    currencySymbol: string;
    defaultTaxPercent: number;
    taxInclusive: boolean;
    invoicePrefix: string;
    invoiceFooterNote: string;
    lowStockThresholdDefault: number;
    nearExpiryDaysThreshold: number;
    enableLoyaltyProgram: boolean;
    loyaltyPointsPerUnitSpent: number;
    loyaltyRedemptionValue: number;
  };
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  composition?: string;
  categoryId?: string;
  categoryName?: string;
  brandName?: string;
  unitOfMeasure: string;
  packingSize: string;
  unitsPerPack: number;
  purchasePrice: number;
  salePrice: number;
  mrp?: number;
  discountPercent?: number;
  taxPercent?: number;
  minStockLevel: number;
  reorderQuantity: number;
  rackLocation?: string;
  barcodes: string[];
  prescriptionRequired?: boolean;
  narcoticFlag?: boolean;
  totalStock: number;
  nearestExpiry?: string | null;
  active?: boolean;
}

export interface MedicineBatch {
  id: string;
  medicineId: string;
  medicineName?: string;
  batchNo: string;
  lotNo?: string;
  expiryDate: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
  supplierName?: string;
}

export interface POSCartItem {
  medicineId: string;
  medicineName: string;
  genericName: string;
  unitOfMeasure: string;
  batchId?: string;
  batchNo?: string;
  expiryDate?: string;
  availableStock: number;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxPercent: number;
  subtotal: number;
}

export interface SaleInvoice {
  id: string;
  invoiceNo: string;
  customerName: string;
  customerPhone?: string;
  cashierName: string;
  createdAt: string;
  items: {
    medicineName: string;
    batchNo: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
  paidAmount: number;
  changeAmount: number;
  paymentMethod: string;
  status: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  customerType: 'walk_in' | 'regular' | 'loyalty' | 'wholesale' | 'institutional';
  balance: number;
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalPurchasesCount?: number;
  totalPurchasesAmount?: number;
}

export interface Supplier {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  email?: string;
  balance: number;
  creditDays: number;
  rating?: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  orderDate: string;
  totalAmount: number;
  status: 'draft' | 'sent' | 'partially_received' | 'completed' | 'cancelled';
  items: {
    medicineName: string;
    quantity: number;
    expectedPrice: number;
  }[];
}

export interface GoodsReceipt {
  id: string;
  grnNumber: string;
  supplierName: string;
  supplierInvoiceNo: string;
  receivedDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  items: {
    medicineName: string;
    batchNo: string;
    expiryDate: string;
    quantityReceived: number;
    purchasePrice: number;
    salePrice: number;
  }[];
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  city?: string;
  phone?: string;
  isMain: boolean;
}

export interface Expense {
  id: string;
  expenseNumber: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: string;
  expenseDate: string;
}
