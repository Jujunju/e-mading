import { useState } from 'react';
import type { FrontCommentDTO } from '../../../../../../core/dto/front-comment.dtos';
import type { FrontCommentUseCase } from '../../../../../../core/usecases/mading/client/user-comment/front-comment.usecase';
import type { FrontCommentEntity } from '../../../../../../core/entities/front-comment.entity';
import type { FrontGetCommentUseCase } from '../../../../../../core/usecases/mading/client/user-comment/front-get-comment.usecase';
import type { FrontEditCommentUseCase } from '../../../../../../core/usecases/mading/client/user-comment/front-edit-comment.usecase';

export const useSaveComment = (frontCommentUseCase: FrontCommentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeCommentHook = async (data: FrontCommentDTO) => {
    try {
      setLoading(true);
      const response = await frontCommentUseCase.execute(data);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeCommentHook, loading, error };
};

export const useEditComment = (frontEditCommentUseCase: FrontEditCommentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeEditCommentHook = async (id: string, data: FrontCommentDTO) => {
    try {
      setLoading(true);
      const response = await frontEditCommentUseCase.execute(id, data);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeEditCommentHook, loading, error };
};

export const useGetComment = (getCommentUseCase: FrontGetCommentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontCommentEntity[] | null>(null);

  const executeGetCommentHook = async () => {
    try {
      setLoading(true);
      const response = await getCommentUseCase.execute();
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

  return { executeGetCommentHook, data, loading, error };
};
