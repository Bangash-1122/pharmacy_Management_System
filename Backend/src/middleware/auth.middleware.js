const { verifyAccessToken } = require('../utils/jwt.util');
const ApiResponse = require('../utils/apiResponse');
const { ROLES } = require('../config/constants');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.unauthorized(res, 'Authentication token missing or malformed');
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return ApiResponse.unauthorized(res, 'Invalid or expired authentication token');
  }

  req.user = decoded;
  req.tenantId = decoded.tenantId || null;
  req.branchId = decoded.branchId || null;

  next();
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    if (decoded) {
      req.user = decoded;
      req.tenantId = decoded.tenantId || null;
      req.branchId = decoded.branchId || null;
    }
  }
  next();
};

module.exports = {
  authenticate,
  optionalAuth,
};
