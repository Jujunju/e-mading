import { useState } from 'react';
import Swal from 'sweetalert2';
import { RegisterClientUseCase } from '../../../core/usecases/auth/front-manage-auth-logic/register-client.usecase';
import type { FrontAuthRegisterDTO } from '../../../core/dto/front-auth.dtos';
import { useNavigate } from 'react-router-dom';

export const useRegister = (registerClientUseCase: RegisterClientUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()

  const executeRegister = async (data: FrontAuthRegisterDTO) => {
    setSuccess(false);

    try {
      setLoading(true);
      setError(null);
      const result = await registerClientUseCase.execute(data);
      setSuccess(true);
      const swal = Swal.fire({
        title: 'Pendaftaran Berhasil!',
        icon: 'success',
        draggable: true,
      });

      if ((await swal).isConfirmed) {
        navigate('/e-mading/login');
      }

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeRegister, loading, success, error };
};
