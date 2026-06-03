import { useState } from 'react';
import type { FrontGetMadingUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/front-mading.usecase';
import type { FrontCreateMadingUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/page-add-mading/front-create-mading.usecse';
import type { FrontDeleteMadingByIdUsecase } from '../../../../../core/usecases/mading/admin/front-manage-mading/front-delete-mading-by-id.usecase';
import Swal from 'sweetalert2';
import type { FrontGetMadingByIdUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/page-edit-mading/front-get-mading-by-id-mading.usecase';
import type { FrontMadingEntity } from '../../../../../core/entities/front-mading.entity';
import type { FrontEditMadingByIdUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/page-edit-mading/front-edit-mading-by-id.usecase';
import type { FrontDeleteAllMadingUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/front-delete-all-mading.usecase';
import { useNavigate } from 'react-router-dom';
import type { FrontMadingDTO } from '../../../../../core/dto/front-mading.dto';
import { handleApiError } from '../../../../../data/errors/error-handler';

export const useCreateMading = (frontCreateMadingUseCase: FrontCreateMadingUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeCreateMadingHook = async (data: FormData) => {
    setSuccess(false);
    try {
      setLoading(true);
      setError(null);
      const result = await frontCreateMadingUseCase.execute(data);
      Swal.fire({
        title: 'Data mading berhasil dibuat!',
        icon: 'success',
        draggable: true,
      });
      setSuccess(true);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeCreateMadingHook, error, loading, success };
};

export const useGetMading = (frontGetMadingUseCase: FrontGetMadingUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontMadingEntity[] | null>(null);

  const executeGetMadingHook = async () => {
    try {
      setLoading(true);
      const response = await frontGetMadingUseCase.execute();
      setData(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeGetMadingHook, loading, error, data };
};

export const useGetMadingById = (frontGetMadingByIdUseCase: FrontGetMadingByIdUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontMadingEntity | null>();

  const executeGetMadingByIdHook = async (slug: string) => {
    try {
      setLoading(true);
      const response = await frontGetMadingByIdUseCase.execute(slug);
      setData(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeGetMadingByIdHook, loading, error, data };
};

export const useEditMadingById = (frontEditMadingByIdUseCase: FrontEditMadingByIdUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const executeEditMadingByIdHook = async (id: string, data: FrontMadingDTO) => {
    try {
      setLoading(true);
      const response = await frontEditMadingByIdUseCase.execute(id, data);

      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
      const swal = Swal.fire({
        title: 'Data berhasil diperbarui',
        icon: 'success',
        draggable: true,
      });

      if ((await swal).isConfirmed) {
        navigate('/admin/kelola-mading');
      }
    }
  };

  return { executeEditMadingByIdHook, loading, error };
};

export const useDeleteMadingById = (frontDeleteMadingByIdUseCase: FrontDeleteMadingByIdUsecase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error2, setError2] = useState<string | null>(null);

  const executeDeleteMadingByIdHook = async (id: string) => {
    try {
      setLoading(true);
      const response = await frontDeleteMadingByIdUseCase.execute(id);
      setSuccess(true);

      Swal.fire({
        title: 'Data berhasil terhapus!',
        icon: 'success',
        draggable: true,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError2(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeDeleteMadingByIdHook, loading, error2, success };
};

export const useDeleteAllMading = (frontDeleteAllMadingUseCase: FrontDeleteAllMadingUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error2, setError2] = useState<string | null>(null);

  const executeDeleteAllMadingHook = async (ids: string[]) => {
    try {
      setLoading(true);
      const response = await frontDeleteAllMadingUseCase.execute(ids);
      setSuccess(true);

      Swal.fire({
        title: 'Data berhasil terhapus!',
        icon: 'success',
        draggable: true,
      });
      return response;
    } catch (error: unknown) {
      const errMsg = handleApiError(error);
      Swal.fire('Gagal!', errMsg, 'error');
      if (error instanceof Error) {
        setError2(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeDeleteAllMadingHook, loading, error2, success };
};
