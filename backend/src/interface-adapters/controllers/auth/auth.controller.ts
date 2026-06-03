import { LoginUseCase } from "../../../domain/use-cases/auth/manage-auth-logic/login.usecase";
import { RegisterUseCase } from "../../../domain/use-cases/auth/manage-auth-logic/register.usecase";
import { HttpResponse } from '../../../infrastructure/helpers/http-response.helper';

export class AuthController {
  constructor(private registerUseCase: RegisterUseCase, private loginUseCase: LoginUseCase) {}

  async handleRegister(httpRequest: any) {
    try {
      const response = await this.registerUseCase.execute(httpRequest);
      return HttpResponse.created(response, 'Data berhasil dibuat');
    } catch (error) {
      return HttpResponse.error(error)
    }
  }

  async handleLogin(httpRequest: any) {

    try {
      const response = await this.loginUseCase.execute(httpRequest)
      return HttpResponse.ok(response, "Berhasil Login")
    } catch (error) {
      return HttpResponse.error(error)
    }

  }
}
