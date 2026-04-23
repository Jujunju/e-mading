import { useState } from 'react';
import { LoginClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/login-client.usecase';
import type { FrontAuthLoginDTO, FrontAuthLoginResponseDTO } from '../../../core/dto/front-auth.dtos';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const useLogin = (loginClientUseCase: LoginClientUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontAuthLoginResponseDTO | null>(null);
  const navigate = useNavigate();

  const executeLogin = async (data: FrontAuthLoginDTO) => {
    try {
      setLoading(true);
      setError(null);
      const result = await loginClientUseCase.execute(data);

      if (result && result.token) {
        localStorage.setItem('token', result.token);

        const swal = Swal.fire({
          title: `Akun siap. Saatnya beraksi! 🚀`,
          icon: 'success',
          draggable: true,
        });

        setData(result);

        if ((await swal).isConfirmed) {
          if (result.user.role !== 'admin') {
            navigate('/e-mading');
          } else {
            navigate('/admin/dashboard');
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: `Terjadi Kesalahan`,
          text: error.message,
          icon: 'error',
          draggable: true,
        });
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeLogin, error, loading, data };
};
