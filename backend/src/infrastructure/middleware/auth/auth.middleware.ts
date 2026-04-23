import { Request, NextFunction, Response } from 'express';
import { AppError } from '../../../domain/errors/app.error';
import { ITokenJwt } from '../../security/jwt.security';

const tokenSecurity = new ITokenJwt();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    throw new AppError('Unauthenticated: No token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new AppError('Token tidak ditemukan', 401);
  }

  try {
    const decoded = tokenSecurity.verifyToken(token);

    if (!decoded) {
      throw new AppError('Token tidak valid atau kadaluarsa', 401);
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    throw new AppError('Sesi anda berakhir, silakan login kembali', 401);
  }
};
