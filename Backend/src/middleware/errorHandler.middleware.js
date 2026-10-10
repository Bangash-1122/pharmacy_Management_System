const ApiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');
const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack, path: req.originalUrl, method: req.method });

  if (err.name === 'ZodError') {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return ApiResponse.validationError(res, formattedErrors);
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return ApiResponse.unauthorized(res, 'Authentication token is invalid or has expired');
  }

  if (err.name === 'CastError' || err.code === 11000) {
    return ApiResponse.badRequest(res, err.code === 11000 ? 'Duplicate key error: Unique constraint violated' : 'Invalid ID parameter format');
  }

  const statusCode = err.statusCode || 500;
  const message = env.NODE_ENV === 'production' && statusCode === 500 ? 'An internal server error occurred' : err.message;

  return ApiResponse.error(res, message, statusCode, null, err.code || 'INTERNAL_ERROR');
};

module.exports = errorHandler;
