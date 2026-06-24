import { FrontDeleteCommentByIdUseCase } from '../../core/usecases/comment/front-manage-comment/front-delete-comment-by-id.usecase';
import { FrontGetAllCommentUseCase } from '../../core/usecases/comment/front-manage-comment/front-get-all-comment.usecase';
import { FrontCommentImplRepository } from '../../data/repositories/mading/admin/front-manage-comment-impl-repository/front-comment-impl.repository';

const commentRepoImpl = new FrontCommentImplRepository();
export const frontGetAllCommentUseCase = new FrontGetAllCommentUseCase(commentRepoImpl);
export const deleteCommentByIdUC = new FrontDeleteCommentByIdUseCase(commentRepoImpl);
