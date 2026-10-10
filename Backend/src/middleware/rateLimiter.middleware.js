const rateLimit = require('express-rate-limit');
const ApiResponse = require('../utils/apiResponse');

// Standard API rate limiter: 300 requests per minute
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ApiResponse.tooManyRequests(res, 'Rate limit exceeded: Please try again later.');
  },
});

// Stricter Auth limiter: 20 requests per 15 minutes for brute force prevention
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ApiResponse.tooManyRequests(res, 'Too many login/registration attempts. Please wait 15 minutes.');
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
};
