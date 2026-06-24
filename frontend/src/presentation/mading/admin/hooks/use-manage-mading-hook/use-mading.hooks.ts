import { useState } from 'react';
import type { FrontGetAllMadingUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/front-get-all-mading.usecase';
import type { FrontCreateMadingUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/page-add-mading/front-create-mading.usecse';
import type { FrontDeleteMadingByIdUsecase } from '../../../../../core/usecases/mading/admin/front-manage-mading/front-delete-mading-by-id.usecase';
import Swal from 'sweetalert2';
import type { FrontGetMadingByIdUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/page-update-mading/front-get-mading-by-id-mading.usecase';
import type { FrontMadingEntity } from '../../../../../core/entities/front-mading.entity';
import type { FrontUpdateMadingByIdUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/page-update-mading/front-update-mading-by-id.usecase';
import type { FrontBulkDeleteMadingByIdsUseCase } from '../../../../../core/usecases/mading/admin/front-manage-mading/front-bulk-delete-mading-by-ids.usecase';
import { useNavigate } from 'react-router-dom';

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
        Swal.fire({
          title: error.message,
          icon: 'error',
          draggable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeCreateMadingHook, error, loading, success };
};

export const useGetMading = (frontGetAllMadingUseCase: FrontGetAllMadingUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontMadingEntity[] | null>(null);

  const executeGetMadingHook = async () => {
    try {
      setLoading(true);
      const response = await frontGetAllMadingUseCase.execute();
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

export const useUpdateMadingById = (frontUpdateMadingByIdUseCase: FrontUpdateMadingByIdUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const executeUpdateMadingByIdHook = async (id: string, data: FormData) => {
    try {
      setLoading(true);
      const response = await frontUpdateMadingByIdUseCase.execute(id, data);
      const swal = await Swal.fire({
        title: 'Data berhasil diperbarui',
        icon: 'success',
        draggable: true,
      });

      if (swal.isConfirmed) {
        navigate('/admin/kelola-mading');
      }
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        await Swal.fire({
          title: error.message,
          icon: 'error',
          draggable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeUpdateMadingByIdHook, loading, error };
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
        Swal.fire({
          title: error.message,
          icon: 'error',
          draggable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeDeleteMadingByIdHook, loading, error2, success };
};

export const useDeleteAllMading = (frontBulkDeleteMadingByIdsUseCase: FrontBulkDeleteMadingByIdsUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error2, setError2] = useState<string | null>(null);

  const executeDeleteAllMadingHook = async (ids: string[]) => {
    try {
      setLoading(true);
      const response = await frontBulkDeleteMadingByIdsUseCase.execute(ids);
      if (response) {
        setSuccess(true);
        Swal.fire({
          title: 'Data berhasil terhapus!',
          icon: 'success',
          draggable: true,
        });
      }
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError2(error.message);
        Swal.fire({
          title: error.message,
          icon: 'error',
          draggable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeDeleteAllMadingHook, loading, error2, success };
};
