import { Request, NextFunction, Response } from 'express';
import { AppError } from '../../../domain/errors/app.error';
import { ITokenJwt } from '../../security/jwt.security';

export class AuthMiddleware {
  constructor(private tokenSecurity: ITokenJwt) {
    this.authMiddleware = this.authMiddleware.bind(this);
  }

  authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies.access_token;

    if (!token) {
      return next(new AppError('Unauthenticated: No token provided', 401));
    }

    try {
      const decoded = this.tokenSecurity.verifyToken(token);

      if (!decoded) {
        return next(new AppError('Token tidak valid atau kadaluarsa', 401));
      }

      (req as any).user = decoded;
      next();
    } catch (error) {
      return next(new AppError('Sesi anda berakhir, silakan login kembali', 401));
    }
  }
}
