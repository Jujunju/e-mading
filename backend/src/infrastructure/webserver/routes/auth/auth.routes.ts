import express, { Request, Response, Router } from 'express';
import { AuthController } from '../../../../interface-adapters/controllers/auth/auth.controller';
import { sendResponse } from '../../../../interface-adapters/utils/status-response.util';

export const registerRoute = (authController: AuthController): Router => {
  const authRoutes = express.Router();

  authRoutes.post('/auth/register', async (req: Request, res: Response) => {
    const requestData = { body: req.body };

    const response = await authController.handleRegister(requestData.body);
    if (!response) {
      return null;
    }
    sendResponse(res, response);
  });

  return authRoutes;
};

export const loginRoute = (authController: AuthController): Router => {
  const authRoutes = express.Router();

  authRoutes.post('/auth/login', async (req: Request, res: Response) => {
    const requestData = { body: req.body };
    const response = await authController.handleLogin(requestData.body);
    if (!response) {
      return null;
    }
    return sendResponse(res, response);
  });

  return authRoutes;
};
