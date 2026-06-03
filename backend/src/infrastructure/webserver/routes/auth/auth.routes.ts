import { Request, Response, Router } from 'express';
import { AuthController } from '../../../../interface-adapters/controllers/auth/auth.controller';
import { sendResponse } from '../../../utils/status-response.util';
import { AuthMiddleware } from '../../../middleware/auth/auth.middleware';
import { LoginResponse } from '../../../../domain/entities/user.entity';

export class AuthRoute {
  private readonly route = Router();

  constructor(
    private controller: AuthController,
    private authMiddle: AuthMiddleware,
  ) {
    this.registerRoute();
    this.loginRoute();
    this.logoutRoute();
    this.checkAuthRoute();
  }

  private registerRoute(): void {
    this.route.post('/auth/register', async (req: Request, res: Response) => {
      const requestData = req.body;

      const response = await this.controller.handleRegister(requestData);

      return sendResponse(res, response);
    });
  }

  private loginRoute(): void {
    this.route.post('/auth/login', async (req: Request, res: Response) => {
      const requestData = req.body;

      const response = await this.controller.handleLogin(requestData);

      if (response.body && 'data' in response.body) {
        const loginResponse = response.body.data as LoginResponse;

        res.cookie('access_token', loginResponse.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: '/',
        });
      }

      return sendResponse(res, response);
    });
  }

  private logoutRoute(): void {
    this.route.get('/auth/logout', this.authMiddle.authMiddleware, async (req: Request, res: Response) => {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        path: '/',
      });

      const response = {
        statusCode: 200,
        body: {
          message: 'Berhasil logout!',
        },
      };

      return sendResponse(res, response);
    });
  }

  private checkAuthRoute(): void {
    this.route.post('/auth/me', this.authMiddle.authMiddleware, (req: Request, res: Response) => {
      const userData = (req as any).user;

      const response = {
        statusCode: 200,
        body: {
          message: 'sesi valid',
          user: userData,
        },
      };

      return sendResponse(res, response);
    });
  }

  public getRoutes = (): Router => {
    return this.route;
  };
}
