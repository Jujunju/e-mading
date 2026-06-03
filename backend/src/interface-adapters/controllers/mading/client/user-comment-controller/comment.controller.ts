import { CreateCommentUseCase } from "../../../../../domain/use-cases/mading/client/user-comment-logic/create-user-comment.usecase";
import { DeleteCommentUseCase } from "../../../../../domain/use-cases/mading/client/user-comment-logic/delete-user-comment.usecase";
import { EditCommentUseCase } from "../../../../../domain/use-cases/mading/client/user-comment-logic/edit-user-comment.usecase";
import { GetCommentUseCase } from "../../../../../domain/use-cases/mading/client/user-comment-logic/get-user-comment.usecase";
import { HttpResponse } from '../../../../../infrastructure/helpers/http-response.helper';

export class ClientCommentController {
  constructor(
    private createCommentUseCase: CreateCommentUseCase,
    private getCommentUseCase: GetCommentUseCase,
    private editCommentUseCase: EditCommentUseCase,
    private deleteCommentUseCase: DeleteCommentUseCase,
  ) {}

  async handleSaveComment(httpRequest: any) {
    try {
      const response = await this.createCommentUseCase.execute(httpRequest);

      return HttpResponse.created(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleEditComment(httpRequest: any) {
    try {
      const response = await this.editCommentUseCase.execute(httpRequest);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleGetComment() {
    try {
      const response = await this.getCommentUseCase.execute();

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleDeleteComment(httpRequest: any) {
    try {
      const response = await this.deleteCommentUseCase.execute(httpRequest);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}