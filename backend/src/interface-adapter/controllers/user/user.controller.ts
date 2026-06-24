import { CreateUserDTO } from "../../../domain/dtos/user/user.dto";
import { CreateUserUseCase } from "../../../domain/use-cases/user/manage-user-logic/create-user.usecase";
import { HttpResponse } from "../../../infrastructure/helpers/http-response.helper";

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handleCreateUser(dto: CreateUserDTO) {
    try {
      const response = await this.createUserUseCase.execute(dto);
      return HttpResponse.created(response, 'Data berhasil dibuat!');
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}
