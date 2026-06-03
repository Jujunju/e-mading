import type React from 'react';
import { useState } from 'react';
import type { FrontAuthLoginResponse } from '../../../core/entities/front-user.entity';
import type { LoginClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/login-client.usecase';
import type { FrontAuthLoginDTO, FrontAuthRegisterDTO } from '../../../core/dto/front-auth.dtos';
import type { RegisterClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/register-client.usecase';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import type { LogoutClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/logout-client.usecase';
import { CheckAuthClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/check-auth-client.usecase';
import { handleApiError } from '../../../data/errors/error-handler';

interface AuthProviderProps {
  children: React.ReactNode;
  checkAuthUC: CheckAuthClientUseCase;
  registerAuthUC: RegisterClientUseCase;
  loginAuthUC: LoginClientUseCase;
  logoutAuthUC: LogoutClientUseCase;
}

export const AuthProvider = ({ children, checkAuthUC, registerAuthUC, loginAuthUC, logoutAuthUC }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitloading, setIsSubmitLoading] = useState<boolean>(false);
  const [user, setUser] = useState<FrontAuthLoginResponse | null>(null);
  const navigate = useNavigate();
  const controller = new AbortController();
  const { signal } = controller;

  const verifyToken = async () => {
    try {
      setLoading(true);
      setSuccess(false);

      const response = await checkAuthUC.execute(signal);

      if (response) {
        setIsAuthenticated(true);
        setUser(response);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.name === 'CanceledAerror') {
          console.log('check auth status berhasil dibatalkan');
        }
        setError(error.message);
        setIsAuthenticated(false);
      }
    } finally {
      if (!signal.aborted) setLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  const handlerLogin = async (req: FrontAuthLoginDTO) => {
    setSuccess(false);

    try {
      setIsSubmitLoading(true);
      setError(null);

      const response = await loginAuthUC.execute(req);
      setIsAuthenticated(true);
      setUser(response);
      setSuccess(true);
      const swal = await Swal.fire({
        title: `Akun siap. Saatnya beraksi! 🚀`,
        icon: 'success',
        draggable: true,
      });

      if (swal.isConfirmed) {
        if (response.user.role !== 'admin') {
          navigate('/e-mading');
        } else {
          navigate('/admin/dashboard');
        }
      }
    } catch (error: unknown) {

      const errMsg = handleApiError(error)

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
  const handlerRegister = async (req: FrontAuthRegisterDTO) => {
    setSuccess(false);

    try {
      setLoading(true);
      setError(null);
      const result = await registerAuthUC.execute(req);
      setSuccess(true);
      const swal = await Swal.fire({
        title: 'Pendaftaran Berhasil!',
        icon: 'success',
        draggable: true,
      });

      if (swal.isConfirmed) {
        navigate('/e-mading/login');
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
    setSuccess(false);
    try {
      setLoading(true);
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

  return <AuthContext.Provider value={{ isAuthenticated, error, loading, isSubmitloading, success, user, handlerLogin, handlerLogout, handlerRegister, verifyToken }}>{children}</AuthContext.Provider>;
};
