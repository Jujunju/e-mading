import { useState } from 'react';
import type { FrontCommentDTO } from '../../../../../../core/dto/front-comment.dtos';
import type { FrontCreateCommentUseCase } from '../../../../../../core/usecases/mading/client/user-comment/front-comment.usecase';
import type { FrontCommentEntity } from '../../../../../../core/entities/front-comment.entity';
import type { FrontGetAllCommentUseCase } from '../../../../../../core/usecases/comment/front-manage-comment/front-get-all-comment.usecase';
import type { FrontUpdateCommentByIdUseCase } from '../../../../../../core/usecases/mading/client/user-comment/front-update-comment.usecase';

export const useSaveComment = (frontCreateCommentUseCase: FrontCreateCommentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeCommentHook = async (data: FrontCommentDTO) => {
    try {
      setLoading(true);
      const response = await frontCreateCommentUseCase.execute(data);
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

export const useEditComment = (frontUpdateCommentByIdUseCase: FrontUpdateCommentByIdUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeEditCommentHook = async (id: string, data: FrontCommentDTO) => {
    try {
      setLoading(true);
      const response = await frontUpdateCommentByIdUseCase.execute(id, data);
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

export const useGetComment = (frontGetAllCommentUseCase: FrontGetAllCommentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontCommentEntity[] | null>(null);

  const executeGetCommentHook = async () => {
    try {
      setLoading(true);
      const response = await frontGetAllCommentUseCase.execute();
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
