const AuthService = require('./auth.service');
const ApiResponse = require('../../utils/apiResponse');

class AuthController {
  static async register(req, res, next) {
    try {
      const result = await AuthService.registerPharmacy(req.body);
      return ApiResponse.created(res, result, { message: 'Pharmacy registered successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return ApiResponse.success(res, result, { message: 'Login successful' });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refresh(refreshToken);
      return ApiResponse.success(res, result, { message: 'Token refreshed successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async profile(req, res, next) {
    try {
      const user = await AuthService.getProfile(req.user.id);
      return ApiResponse.success(res, { user });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res) {
    return ApiResponse.success(res, null, { message: 'Logged out successfully' });
  }
}

module.exports = AuthController;
