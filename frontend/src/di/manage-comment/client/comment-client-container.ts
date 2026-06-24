import { FrontCreateCommentUseCase } from "../../../core/usecases/mading/client/user-comment/front-comment.usecase";
import { FrontUpdateCommentByIdUseCase } from '../../../core/usecases/mading/client/user-comment/front-update-comment.usecase';
import { ClientFrontCommentImplRepository } from '../../../data/repositories/mading/client/user-comment/front-comment-impl.repository';

const commentRepoImpl = new ClientFrontCommentImplRepository();
export const createCommentUC = new FrontCreateCommentUseCase(commentRepoImpl);
export const editCommentByIdUC = new FrontUpdateCommentByIdUseCase(commentRepoImpl);
