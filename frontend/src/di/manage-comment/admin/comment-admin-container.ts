import { FrontGetDetailCommentUseCase } from "../../../core/usecases/mading/admin/front-manage-comment/front-get-detail-comment.usecase";
import { AdminFrontCommentImplRepository } from "../../../data/repositories/mading/admin/front-manage-comment-impl-repository/front-comment-impl.repository";

const commentRepoImpl = new AdminFrontCommentImplRepository()
export const frontGetDetailCommentUseCase = new FrontGetDetailCommentUseCase(commentRepoImpl);