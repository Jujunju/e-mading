import { createContext } from 'react';
import type { FrontAuthLoginDTO, FrontAuthRegisterDTO } from '../../../core/dto/front-auth.dtos';
import type { FrontAuthLoginResponse } from '../../../core/entities/front-user.entity';

export interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean;
  isSubmitloading: boolean;
  error: string | null;
  success: boolean;
  user: FrontAuthLoginResponse | null;
  handlerLogin: (req: FrontAuthLoginDTO) => Promise<unknown>;
  handlerRegister: (req: FrontAuthRegisterDTO) => Promise<unknown>;
  handlerLogout: () => Promise<unknown>;
  verifyToken: () => Promise<unknown>
}

export const AuthContext = createContext<AuthContextType | null>(null);