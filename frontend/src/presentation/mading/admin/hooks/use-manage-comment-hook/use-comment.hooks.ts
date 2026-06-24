import { useState } from 'react';
import type { FrontDeleteCommentByIdUseCase } from '../../../../../core/usecases/comment/front-manage-comment/front-delete-comment-by-id.usecase';
import type { FrontCommentEntity } from '../../../../../core/entities/front-comment.entity';
import type { FrontGetAllCommentUseCase } from '../../../../../core/usecases/comment/front-manage-comment/front-get-all-comment.usecase';

export const useGetAllComment = (frontGetAllCommentUseCase: FrontGetAllCommentUseCase) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontCommentEntity[]>([]);

  const executeGetAllCommentHook = async () => {
    try {
      setLoading(true);
      const response = await frontGetAllCommentUseCase.execute();
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

  return { executeGetAllCommentHook, loading, error, success, data };
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
