/**
 * Standardized API Response Helper
 * Reference: Section 11.4 of SRS v3.0 & Technical Design Addendum
 */

const { v4: uuidv4 } = require('uuid');

class ApiResponse {
  static success(res, data = {}, meta = {}, statusCode = 200) {
    const requestId = res.req?.id || uuidv4();
    return res.status(statusCode).json({
      success: true,
      data,
      meta: {
        requestId,
        timestamp: new Date().toISOString(),
        ...meta,
      },
      error: null,
    });
  }

  static created(res, data = {}, meta = {}) {
    return ApiResponse.success(res, data, meta, 201);
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, errors = null, code = 'SERVER_ERROR') {
    const requestId = res.req?.id || uuidv4();
    return res.status(statusCode).json({
      success: false,
      data: null,
      error: {
        code,
        message,
        details: errors,
      },
      meta: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  static badRequest(res, message = 'Bad Request', errors = null) {
    return ApiResponse.error(res, message, 400, errors, 'BAD_REQUEST');
  }

  static unauthorized(res, message = 'Unauthorized Access') {
    return ApiResponse.error(res, message, 401, null, 'UNAUTHORIZED');
  }

  static forbidden(res, message = 'Forbidden: Insufficient Permissions') {
    return ApiResponse.error(res, message, 403, null, 'FORBIDDEN');
  }

  static notFound(res, message = 'Resource Not Found') {
    return ApiResponse.error(res, message, 404, null, 'NOT_FOUND');
  }

  static validationError(res, errors = []) {
    return ApiResponse.error(res, 'Validation Error', 422, errors, 'VALIDATION_ERROR');
  }

  static tooManyRequests(res, message = 'Too Many Requests - Rate Limit Exceeded') {
    return ApiResponse.error(res, message, 429, null, 'RATE_LIMIT_EXCEEDED');
  }
}

module.exports = ApiResponse;
