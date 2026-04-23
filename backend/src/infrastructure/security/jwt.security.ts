import { TokenService } from '../../domain/services/token.service';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AppError } from '../../domain/errors/app.error';

export class ITokenJwt implements TokenService {
  generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
  }
  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Token sudah kedaluwarsa', 401);
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Token tidak valid/rusak', 401);
      }

      throw new AppError('Terjadi kesalahan pada autentikasi', 500);
    }
  }
}
