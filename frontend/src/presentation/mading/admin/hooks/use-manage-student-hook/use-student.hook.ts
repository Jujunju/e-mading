import { useState } from 'react';
import type { FrontGetAllStudentUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-get-all-student.usecase';
import type { FrontGetStudentByIdUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-get-student-by-id.usecase';
import type { FrontDeleteStudentByIdUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-delete-student-by-id.usecase';
import type { FrontUserEntity } from '../../../../../core/entities/front-user.entity';
import type { FrontBulkDeleteStudentByIdsUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-bulk-delete-student-by-ids.usecase';
import Swal from 'sweetalert2';

export const useGetStudent = (frontGetAllStudentUseCase: FrontGetAllStudentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontUserEntity[] | null>(null);
  const executeStudentHook = async () => {
    try {
      setLoading(true);
      const response = await frontGetAllStudentUseCase.execute();
      setSuccess(true);
      setData(response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeStudentHook, loading, error, success, data };
};

export const useGetStudentById = (frontGetStudentByIdUseCase: FrontGetStudentByIdUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontUserEntity | null>(null);
  const executeGetStudentByIdHook = async (id: string) => {
    try {
      setLoading(true);
      const response = await frontGetStudentByIdUseCase.execute(id);
      setSuccess(true);
      setData(response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeGetStudentByIdHook, loading, error, success, data };
};

export const useDeleteStudent = (frontDeleteStudentByIdUseCase: FrontDeleteStudentByIdUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const executeDeleteStudentHook = async (id: string) => {
    try {
      setLoading(true);
      const response = await frontDeleteStudentByIdUseCase.execute(id);
      setSuccess(true);

      Swal.fire({
        title: 'Data siswa berhasil dihapus!',
        icon: 'success',
        draggable: true,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeDeleteStudentHook, loading, error, success };
};

export const useDeleteAllStudent = (frontBulkDeleteStudentByIdsUseCase: FrontBulkDeleteStudentByIdsUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const executeDeleteAllStudentHook = async (ids: string[]) => {
    try {
      setLoading(true);
      const response = await frontBulkDeleteStudentByIdsUseCase.execute(ids);
      setSuccess(true);

      Swal.fire({
        title: 'Data siswa berhasil dihapus!',
        icon: 'success',
        draggable: true,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeDeleteAllStudentHook, loading, error, success };
};
