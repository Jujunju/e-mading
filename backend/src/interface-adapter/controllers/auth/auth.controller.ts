import { LoginDTO } from '../../../domain/dtos/auth/auth.dtos';
import { LoginUseCase } from '../../../domain/use-cases/auth/manage-auth-logic/login.usecase';
import { HttpResponse } from '../../../infrastructure/helpers/http-response.helper';
import { AuthPresenter } from '../../presenter/auth/auth.presenter';

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
  ) {}
  async handleLogin(dto: LoginDTO) {
    try {
      const response = await this.loginUseCase.execute(dto);
      return HttpResponse.ok(AuthPresenter.toLoginResponse(response, response.token), 'Berhasil Login');
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}
