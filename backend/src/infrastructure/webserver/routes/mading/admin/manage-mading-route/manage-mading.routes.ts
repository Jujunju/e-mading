import { MadingController } from '../../../../../../interface-adapter/controllers/mading/admin/manage-mading-controller/mading.controller';
import { NextFunction, Request, Response, Router } from 'express';
import { sendResponse } from '../../../../../utils/status-response.util';
import upload from '../../../../../middleware/upload/upload.middleware';
import { AuthMiddleware } from '../../../../../middleware/auth/auth.middleware';
import { MadingDTO } from '../../../../../../domain/dtos/mading/mading.dtos';

export class MadingRoute {
  private readonly router = Router();

  constructor(
    private controller: MadingController,
    private authMidl: AuthMiddleware,
  ) {
    this.createMading();
    this.getMading();
    this.updateMadingById();
    this.getMadingById();
    this.bulkDeleteMadingByIds();
    this.deleteMadingById();
  }

  createMading(): void {
    this.router.post('/mading', this.authMidl.authMiddleware, upload.single('gambar'), async (req: Request, res: Response, next: NextFunction) => {
      
      let gambarBase64 = null;
      
      if(req.file){
        gambarBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      }

      const requestData = { ...req.body, gambar: gambarBase64 };

      const response = await this.controller.handleCreateMading(requestData);
      if (!response) {
        return null;
      }

      sendResponse(res, response);
    });
  }

  getMadingById(): void {
    this.router.get('/mading/:id', async (req: Request, res: Response, next: NextFunction) => {
      const httpRequestParam = req.params.id as string;
      const response = await this.controller.handleGetMadingById(httpRequestParam);
      if (!response) {
        return null;
      }
      sendResponse(res, response);
    });
  }

  updateMadingById(): void {
    this.router.put('/mading/:id', this.authMidl.authMiddleware, upload.single('gambar'), async (req: Request, res: Response, next: NextFunction) => {
      const httpRequestParam = req.params.id as string;
      const { judul, kategori, isi, gambarLama } = req.body;

      const data: MadingDTO = {
        id: httpRequestParam,
        judul,
        kategori,
        isi,
        gambar: req.file ? req.file.filename : gambarLama,
      };

      const response = await this.controller.handleUpdateMadingById(data);
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

  bulkDeleteMadingByIds(): void {
    this.router.delete('/mading/bulk', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const { ids } = req.body;

      const response = await this.controller.handleBulkDeleteMadingByIds(ids);
      if (!response) {
        return null;
      }
      sendResponse(res, response);
    });
  }

  deleteMadingById(): void {
    this.router.delete('/mading/:id', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const requestData = req.params.id as string;
      const response = await this.controller.handleDeleteMadingById(requestData);
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
