const ApiResponse = require('../utils/apiResponse');

/**
 * Zod validation middleware for Express
 * Validates req.body, req.query, or req.params against provided Zod schema
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    if (!schema) return next();

    const dataToValidate = req[source];
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const formattedErrors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      }));
      return ApiResponse.validationError(res, formattedErrors);
    }

    req[source] = result.data;
    next();
  };
};

module.exports = {
  validate,
};
