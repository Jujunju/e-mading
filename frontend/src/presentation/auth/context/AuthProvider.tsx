import type React from 'react';
import { useState } from 'react';
import type { FrontAuthLoginResponse } from '../../../core/entities/front-user.entity';
import type { LoginClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/login-client.usecase';
import type { FrontAuthLoginDTO } from '../../../core/dto/front-auth.dtos';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import type { LogoutClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/logout-client.usecase';
import { CheckAuthClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/check-auth-client.usecase';
import { handleApiError } from '../../../data/errors/error-handler';
import type { CreateUserUseCase } from '../../../core/usecases/user/front-manage-user-logic/create-user.usecase';
import type { FrontCreateUserDTO } from '../../../core/dto/front-user.dtos';

interface AuthProviderProps {
  children: React.ReactNode;
  checkAuthUC: CheckAuthClientUseCase;
  createUserUC: CreateUserUseCase;
  loginAuthUC: LoginClientUseCase;
  logoutAuthUC: LogoutClientUseCase;
}

export const AuthProvider = ({ children, checkAuthUC, createUserUC, loginAuthUC, logoutAuthUC }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isSubmitloading, setIsSubmitLoading] = useState<boolean>(false);
  const [user, setUser] = useState<FrontAuthLoginResponse | null>(null);
  const navigate = useNavigate();

  const verifyToken = async () => {
    try {
      setAuthLoading(true);
      setSuccess(false);

      const response = await checkAuthUC.execute();

      setIsAuthenticated(true);
      setUser(response);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setSuccess(false);
        Swal.fire({
          icon: 'error',
          title: error.message,
        });
      }
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const handlerLogin = async (req: FrontAuthLoginDTO) => {
    setSuccess(false);

    try {
      setIsSubmitLoading(true);
      setError(null);

      const response = await loginAuthUC.execute(req);

      if (response) {
        setIsAuthenticated(true);
        setUser(response);
      }

      setSuccess(true);
      const swal = await Swal.fire({
        title: `Akun siap. Saatnya beraksi! 🚀`,
        icon: 'success',
        draggable: true,
      });

      if (swal.isConfirmed) {
        if (response?.user?.role !== 'admin') {
          navigate('/');
        } else {
          navigate('/admin/dashboard');
        }
      }
    } catch (error: unknown) {
      const errMsg = handleApiError(error);

      if (error instanceof Error) {
        setError(error.message);
        setSuccess(false);
      }
      Swal.fire({
        icon: 'error',
        title: errMsg,
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };
  const handlerRegister = async (req: FrontCreateUserDTO) => {
    setSuccess(false);

    try {
      setLoading(true);
      setError(null);
      const result = await createUserUC.execute(req);
      setSuccess(true);
      const swal = await Swal.fire({
        title: 'Pendaftaran Berhasil!',
        icon: 'success',
        draggable: true,
      });

      if (swal.isConfirmed) {
        navigate('/login');
      }

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          icon: 'error',
          title: error.message,
        });
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handlerLogout = async () => {
    setLoading(true);
    try {
      setSuccess(false);
      setError(null);

      const response = await logoutAuthUC.execute();

      if (response) {
        setSuccess(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, error, loading, authLoading, isSubmitloading, success, user, handlerLogin, handlerLogout, handlerRegister, verifyToken }}>{children}</AuthContext.Provider>;
};
