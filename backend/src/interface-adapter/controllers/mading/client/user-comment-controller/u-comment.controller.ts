import { CreateCommentUseCase } from "../../../../../domain/use-cases/mading/client/user-comment-logic/create-comment-user.usecase";
import { DeleteCommentByIdUseCase } from "../../../../../domain/use-cases/mading/client/user-comment-logic/delete-comment-user-by-id.usecase";
import { UpdateCommentUseCase } from '../../../../../domain/use-cases/mading/client/user-comment-logic/update-user-comment.usecase';
import { GetAllCommentUseCase } from "../../../../../domain/use-cases/mading/client/user-comment-logic/get-all-comment-user.usecase";
import { HttpResponse } from '../../../../../infrastructure/helpers/http-response.helper';
import { CommentDTO } from "../../../../../domain/dtos/comment/comment.dtos";
import { CommentPresenter } from "../../../../presenter/comment/comment.presenter";

export class ClientCommentController {
  constructor(
    private createCommentUseCase: CreateCommentUseCase,
    private GetAllCommentUseCase: GetAllCommentUseCase,
    private updateCommentUseCase: UpdateCommentUseCase,
    private deleteCommentByIdUseCase: DeleteCommentByIdUseCase,
  ) {}

  async handleCreateComment(dto: CommentDTO) {
    try {
      const response = await this.createCommentUseCase.execute(dto);

      return HttpResponse.created(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleUpdateComment(id: string, dto: CommentDTO) {
    try {
      const response = await this.updateCommentUseCase.execute({id, dto});

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleGetAllComment() {
    try {
      const response = await this.GetAllCommentUseCase.execute();

      return HttpResponse.ok(CommentPresenter.toListResponse(response));
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleDeleteCommentById(id: string) {
    try {
      const response = await this.deleteCommentByIdUseCase.execute(id);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}