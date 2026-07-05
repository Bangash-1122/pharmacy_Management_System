/**
 * Central registry — import all models so indexes are registered on connect.
 * superadmin has no dedicated collection; it operates across tenant-scoped data.
 */

export { Session, Otp, RateLimit } from "../modules/auth/auth.schema.js";
export { default as Tenant } from "../modules/tenants/tenants.schema.js";
export { default as Subscription } from "../modules/subscriptions/subscriptions.schema.js";
export { default as User } from "../modules/users/users.schema.js";
export { default as Medicine } from "../modules/medicines/medicines.schema.js";
export { default as Category } from "../modules/categories/categories.schema.js";
export { default as Supplier } from "../modules/suppliers/suppliers.schema.js";
export { default as Customer } from "../modules/customers/customers.schema.js";
export { default as Purchase } from "../modules/purchases/purchases.schema.js";
export { default as Sale } from "../modules/sales/sales.schema.js";
export { default as StockLedger } from "../modules/inventory/inventory.schema.js";
export { default as Expense } from "../modules/expenses/expenses.schema.js";
export { default as ReportCache } from "../modules/reports/reports.schema.js";
export { default as Notification } from "../modules/notifications/notifications.schema.js";
export { Branch, BranchTransfer } from "../modules/branches/branches.schema.js";
export { default as AuditLog } from "../modules/audit/audit.schema.js";
export { default as SupportTicket } from "../modules/support/support.schema.js";
