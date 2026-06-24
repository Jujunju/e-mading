import { Request, Response, Router } from 'express';
import { AuthController } from '../../../../interface-adapter/controllers/auth/auth.controller';
import { sendResponse } from '../../../utils/status-response.util';
import { AuthMiddleware } from '../../../middleware/auth/auth.middleware';

export class AuthRoute {
  private readonly router = Router();

  constructor(
    private controller: AuthController,
    private authMiddle: AuthMiddleware,
  ) {
    this.loginRoute();
    this.logoutRoute();
    this.checkAuthRoute();
  }

  private loginRoute(): void {
    this.router.post('/auth/login', async (req: Request, res: Response) => {
      const requestData = req.body;

      const response = await this.controller.handleLogin(requestData);

      let token

      if (response.body && 'data' in response.body) {
        token = response.body.data.token;

      }
      
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'? true : false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });

      return sendResponse(res, response);
    });
  }

  private logoutRoute(): void {
    this.router.get('/auth/logout', this.authMiddle.authMiddleware, async (req: Request, res: Response) => {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
    this.router.post('/auth/me', this.authMiddle.authMiddleware, async (req: Request, res: Response) => {
      const userData = await (req as any).user;

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
    return this.router;
  };
}
