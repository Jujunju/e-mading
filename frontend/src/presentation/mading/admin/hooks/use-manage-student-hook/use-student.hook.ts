import { useState } from 'react';
import type { FrontGetStudentUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-student.usecase';
import type { FrontGetStudentByIdUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-get-student-by-id.usecase';
import type { FrontDeleteStudentUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-delete-student.usecase';
import type { FrontUserEntity } from '../../../../../core/entities/front-user.entity';
import type { FrontDeleteAllStudentUseCase } from '../../../../../core/usecases/mading/admin/front-manage-student/front-delete-all-student.usecase';
import Swal from 'sweetalert2';

export const useGetStudent = (frontGetStudentUseCase: FrontGetStudentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontUserEntity[] | null>(null);
  const executeStudentHook = async () => {
    try {
      setLoading(true);
      const response = await frontGetStudentUseCase.execute();
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

export const useDeleteStudent = (frontDeleteStudentUseCase: FrontDeleteStudentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const executeDeleteStudentHook = async (id: string) => {
    try {
      setLoading(true);
      const response = await frontDeleteStudentUseCase.execute(id);
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

export const useDeleteAllStudent = (frontDeleteAllStudentUseCase: FrontDeleteAllStudentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const executeDeleteAllStudentHook = async (ids: string[]) => {
    try {
      setLoading(true);
      const response = await frontDeleteAllStudentUseCase.execute(ids);
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
