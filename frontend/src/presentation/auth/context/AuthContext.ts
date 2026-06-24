import { createContext } from 'react';
import type { FrontAuthLoginDTO } from '../../../core/dto/front-auth.dtos';
import type { FrontAuthLoginResponse } from '../../../core/entities/front-user.entity';
import type { FrontCreateUserDTO } from '../../../core/dto/front-user.dtos';

export interface AuthContextType {
  isAuthenticated: boolean
  authLoading: boolean
  loading: boolean;
  isSubmitloading: boolean;
  error: string | null;
  success: boolean;
  user: FrontAuthLoginResponse | null;
  handlerLogin: (req: FrontAuthLoginDTO) => Promise<unknown>;
  handlerRegister: (req: FrontCreateUserDTO) => Promise<unknown>;
  handlerLogout: () => Promise<unknown>;
  verifyToken: () => Promise<unknown>
}

export const AuthContext = createContext<AuthContextType | null>(null);