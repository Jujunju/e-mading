import { FrontCreateCommentUseCase } from "../../../core/usecases/mading/client/user-comment/front-comment.usecase";
import { FrontDeleteCommentByIdUseCase } from "../../../core/usecases/mading/client/user-comment/front-delete-comment-by-id.usecase";
import { FrontEditCommentByIdUseCase } from "../../../core/usecases/mading/client/user-comment/front-edit-comment.usecase";
import { FrontGetCommentUseCase } from "../../../core/usecases/mading/client/user-comment/front-get-comment.usecase";
import { ClientFrontCommentImplRepository } from "../../../data/repositories/mading/client/user-comment/front-comment-impl.repository";

const commentRepoImpl = new ClientFrontCommentImplRepository()
export const createCommentUC = new FrontCreateCommentUseCase(commentRepoImpl);
export const getCommentsUC = new FrontGetCommentUseCase(commentRepoImpl);
export const deleteCommentByIdUC = new FrontDeleteCommentByIdUseCase(commentRepoImpl);
export const editCommentByIdUC = new FrontEditCommentByIdUseCase(commentRepoImpl);
