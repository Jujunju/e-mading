import { TokenSecurity } from '../../domain/security/token.security';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AppError } from '../../domain/errors/app.error';
import { promisify } from 'node:util';

const signAsync = promisify<string, string, jwt.SignOptions, string>(jwt.sign)
const verifyAsync = promisify<string, string>(jwt.verify)

export class ITokenJwt implements TokenSecurity {
  async generateToken(payload: any): Promise<string> {
    return await signAsync(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  }
  async verifyToken(token: string): Promise<any> {
    try {
      return await verifyAsync(token, process.env.JWT_SECRET as string);
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
