const logger = {
  info: (msg, meta = {}) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
  },
  warn: (msg, meta = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
  },
  error: (msg, meta = {}) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
  },
  audit: (action, tenantId, userId, details = {}) => {
    console.log(`[AUDIT] ${new Date().toISOString()} | Tenant: ${tenantId || 'GLOBAL'} | User: ${userId || 'SYSTEM'} | Action: ${action} | Details: ${JSON.stringify(details)}`);
  }
};

module.exports = logger;
