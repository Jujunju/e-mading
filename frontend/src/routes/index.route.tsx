import { createBrowserRouter } from 'react-router-dom';
import { RegisterForm } from '../presentation/auth/pages/RegisterForm';
import { LoginForm } from '../presentation/auth/pages/LoginForm';
import { MyDashboard } from '../presentation/mading/admin/pages/MainDashboard';
import { HomePage } from '../presentation/mading/clients/landing/pages/Homepage';
import { DetailMading } from '../presentation/mading/clients/comment/components/DetailMading';
import { MyProfile } from '../presentation/mading/clients/landing/components/MyProfile';
import { AuthLayout } from '../presentation/auth/context/AuthLayout';

export const routesApp = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'register',
        element: <RegisterForm />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'my-profile/:id',
        element: <MyProfile />,
      },
      {
        path: 'detail-mading/:slug',
        element: <DetailMading />,
      },
      {
        path: 'admin/*',
        element: <MyDashboard />,
      },
    ],
  },
]);
