import { useState } from 'react';
import type { FrontDeleteCommentByIdUseCase } from '../../../../../core/usecases/mading/client/user-comment/front-delete-comment-by-id.usecase';
import type { FrontGetCommentUseCase } from '../../../../../core/usecases/mading/client/user-comment/front-get-comment.usecase';
import type { FrontCommentEntity } from '../../../../../core/entities/front-comment.entity';
import type { FrontGetDetailCommentUseCase } from '../../../../../core/usecases/mading/admin/front-manage-comment/front-get-detail-comment.usecase';

export const useGetComment = (getCommentUseCase: FrontGetCommentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontCommentEntity[] | null>(null);

  const executeGetCommentHook = async () => {
    try {
      setLoading(true);
      const response = await getCommentUseCase.execute();
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

  return { executeGetCommentHook, loading, error, success, data };
};

export const useGetCommentById = (frontGetDetailKomentarUseCase: FrontGetDetailCommentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontCommentEntity[] | null>(null);

  const executeGetCommentByIdHook = async (id: string) => {
    try {
      setLoading(true);
      const response = await frontGetDetailKomentarUseCase.execute(id);
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

  return { executeGetCommentByIdHook, loading, error, success, data };
};

export const useDeleteComment = (frontDeleteKomentarByIdUseCase: FrontDeleteCommentByIdUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeDeleteCommentHook = async (id: string) => {
    try {
      setLoading(true);
      const response = await frontDeleteKomentarByIdUseCase.execute(id);
      setSuccess(true);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeDeleteCommentHook, loading, error, success };
};
