import { Outlet } from "react-router-dom"
import { AuthProvider } from "./AuthProvider"
import { AuthClientImplRepository } from "../../../data/repositories/auth/auth-client-impl.repository"
import { LoginClientUseCase } from "../../../core/usecases/auth/front-manage-auth-logic/login-client.usecase"
import { RegisterClientUseCase } from "../../../core/usecases/auth/front-manage-auth-logic/register-client.usecase"
import { LogoutClientUseCase } from "../../../core/usecases/auth/front-manage-auth-logic/logout-client.usecase"
import { CheckAuthClientUseCase } from "../../../core/usecases/auth/front-manage-auth-logic/check-auth-client.usecase"

const authRepoImpl = new AuthClientImplRepository()
const loginClientUseCase = new LoginClientUseCase(authRepoImpl);
const registerClientUseCase = new RegisterClientUseCase(authRepoImpl);
const logoutClientUseCase = new LogoutClientUseCase(authRepoImpl);
const chechAuth = new CheckAuthClientUseCase(authRepoImpl);

export const AuthLayout = () => {
    return (
      <AuthProvider checkAuthUC={chechAuth} loginAuthUC={loginClientUseCase} logoutAuthUC={logoutClientUseCase} registerAuthUC={registerClientUseCase}>
        <Outlet />
      </AuthProvider>
    );
}