import { GetCommentByIdUseCase } from "../../../../../domain/use-cases/mading/admin/manage-comment-logic/get-comment-by-id.usecase";
import { HttpResponse } from '../../../../../infrastructure/helpers/http-response.helper';

export class AdminCommentController {
    constructor(private getCommentByIdUseCase: GetCommentByIdUseCase) {}

    async handleGetCommentById(httpRequest: any) {
        try {
            const response = await this.getCommentByIdUseCase.execute(httpRequest)
            return HttpResponse.ok(response)
        } catch (error) {
            return HttpResponse.error(error);
        }
    }
}