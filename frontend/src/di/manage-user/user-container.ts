import { CreateUserUseCase } from "../../core/usecases/user/front-manage-user-logic/create-user.usecase";
import { UserImplRepository } from "../../data/repositories/user/user-impl.repository";

const userRepo = new UserImplRepository()
export const createUserUseCase = new CreateUserUseCase(userRepo);