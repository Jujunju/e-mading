import { MadingController } from '../../../../../interface-adapters/controllers/mading/admin/manage-mading-controller/mading.controller';
import { NextFunction, Request, Response, Router } from 'express';
import { sendResponse } from '../../../../utils/status-response.util';
import upload from '../../../../middleware/upload/upload.middleware';
import { AuthMiddleware } from '../../../../middleware/auth/auth.middleware';

export class MadingRoute {
  private readonly router = Router();

  constructor(
    private controller: MadingController,
    private authMidl: AuthMiddleware,
  ) {
    this.createMading();
    this.getMading();
    this.updateMadingById()
    this.getMadingById();
    this.deleteMading();
    this.deleteAllMading();
  }

  createMading(): void {
    this.router.post('/mading', this.authMidl.authMiddleware, upload.single('gambar'), async (req: Request, res: Response, next: NextFunction) => {
      const requestData = { ...req.body, gambar: req.file ? req.file.filename : null };

      const response = await this.controller.handleCreateMading(requestData);
      if (!response) {
        return null;
      }

      sendResponse(res, response);
    });
  }

  getMadingById(): void {
    this.router.get('/mading/:id', async (req: Request, res: Response, next: NextFunction) => {
      const httpRequestParam = { param: req.params.id };
      const response = await this.controller.handleGetMadingById(httpRequestParam.param);
      if (!response) {
        return null;
      }
      sendResponse(res, response);
    });
  }

  updateMadingById(): void {
    this.router.put('/mading/:id', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const httpRequestParam = { param: req.params.id };
      const httpRequestBody = { body: req.body };

      const response = await this.controller.handleUpdateMading({ id: httpRequestParam.param, body: httpRequestBody.body });
      if (!response) {
        return null;
      }
      sendResponse(res, response);
    });
  }

  getMading(): void {
    this.router.get('/mading', async (req: Request, res: Response, next: NextFunction) => {
      const response = await this.controller.handleGetMading();

      if (!response) {
        return null;
      }
      sendResponse(res, response);
    });
  }

  deleteAllMading(): void {
    this.router.delete('/mading/bulk', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const { ids } = req.body;

      console.log(ids)

      const response = await this.controller.handleDeleteAllMading(ids);
      if (!response) {
        return null;
      }
      sendResponse(res, response);
    });
  }

  deleteMading(): void {
    this.router.delete('/mading/:id', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const requestData = { param: req.params.id };
      const response = await this.controller.handleDeleteMading(requestData.param);
      if (!response) {
        return null;
      }
      sendResponse(res, response);
    });
  }

  public getRoutes = (): Router => {
    return this.router;
  };
}
