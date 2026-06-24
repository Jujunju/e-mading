import { GetMadingBySlugUseCase } from '../../../../../domain/use-cases/mading/client/user-mading-logic/get-mading-by-slug.usecase';
import { HttpResponse } from '../../../../../infrastructure/helpers/http-response.helper';
import { MadingPresenter } from '../../../../presenter/mading/mading.presenter';

export class UserMadingController {
  constructor(public getMadingBySlugUseCase: GetMadingBySlugUseCase) {}

  async handleGetMadingBySlug(slug: string) {
    try {
      const response = await this.getMadingBySlugUseCase.execute(slug);
      return HttpResponse.ok(MadingPresenter.toListResponse(response));
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}
