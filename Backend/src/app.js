const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const env = require('./config/env');
const apiRoutes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler.middleware');
const { apiLimiter } = require('./middleware/rateLimiter.middleware');
const ApiResponse = require('./utils/apiResponse');

const app = express();

// Request ID tracking
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || uuidv4();
  res.setHeader('X-Request-Id', req.id);
  next();
});

// Security & Optimization Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate Limiting
app.use('/api/', apiLimiter);

// Central API Routes (v1)
app.use('/api/v1', apiRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Pharmacy Management System - Enterprise SaaS API',
    version: '3.0.0',
    documentation: '/api/v1/health',
    status: 'Online',
  });
});

// 404 Route Handler
app.use((req, res) => {
  return ApiResponse.notFound(res, `Route ${req.method} ${req.originalUrl} not found on this server`);
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
