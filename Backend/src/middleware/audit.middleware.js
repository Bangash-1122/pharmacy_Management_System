const logger = require('../utils/logger');

/**
 * Intercepts mutations (POST, PUT, PATCH, DELETE) and records an audit log entry
 */
const auditLog = (moduleName) => {
  return (req, res, next) => {
    const originalJson = res.json;
    res.json = function (body) {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && res.statusCode >= 200 && res.statusCode < 300) {
        const tenantId = req.tenantId || req.user?.tenantId || 'SYSTEM';
        const userId = req.user?.id || req.user?.email || 'ANONYMOUS';
        const action = `${req.method} ${req.baseUrl}${req.path}`;
        logger.audit(action, tenantId, userId, {
          module: moduleName || 'SYSTEM',
          ip: req.ip || req.connection.remoteAddress,
          params: req.params,
          bodySummary: req.body ? Object.keys(req.body) : [],
        });
      }
      return originalJson.call(this, body);
    };
    next();
  };
};

module.exports = {
  auditLog,
};
