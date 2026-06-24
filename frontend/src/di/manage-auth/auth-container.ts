import { CheckAuthClientUseCase } from "../../core/usecases/auth/front-manage-auth-logic/check-auth-client.usecase";
import { LoginClientUseCase } from "../../core/usecases/auth/front-manage-auth-logic/login-client.usecase";
import { LogoutClientUseCase } from "../../core/usecases/auth/front-manage-auth-logic/logout-client.usecase";
import { AuthClientImplRepository } from "../../data/repositories/auth/auth-client-impl.repository";

const authRepoImpl = new AuthClientImplRepository();
export const loginClientUseCase = new LoginClientUseCase(authRepoImpl);
export const logoutClientUseCase = new LogoutClientUseCase(authRepoImpl);
export const chechAuth = new CheckAuthClientUseCase(authRepoImpl);
