import { Outlet } from "react-router-dom"
import { AuthProvider } from "./AuthProvider"
import { chechAuth, loginClientUseCase, logoutClientUseCase } from "../../../di/manage-auth/auth-container";
import { createUserUseCase } from "../../../di/manage-user/user-container";

export const AuthLayout = () => {
    return (
      <AuthProvider checkAuthUC={chechAuth} loginAuthUC={loginClientUseCase} logoutAuthUC={logoutClientUseCase} createUserUC={createUserUseCase}>
        <Outlet />
      </AuthProvider>
    );
}