import { GetMadingBySlugUseCase } from '../../../../../domain/use-cases/mading/client/user-mading-logic/get-mading-by-slug.usecase';
import { HttpResponse } from '../../../../../infrastructure/helpers/http-response.helper';

export class UserMadingController {
  constructor(public getMadingBySlugUseCase: GetMadingBySlugUseCase) {}

  async handleGetMadingBySlug(httpRequest: any) {
    try {
      const response = await this.getMadingBySlugUseCase.execute(httpRequest);
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}
