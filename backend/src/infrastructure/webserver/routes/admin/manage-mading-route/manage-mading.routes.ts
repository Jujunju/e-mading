import { MadingController } from '../../../../../interface-adapters/controllers/mading/admin/manage-mading-controller/mading.controller';
import { NextFunction, Request, Response, Router } from 'express';
import { sendResponse } from '../../../../../interface-adapters/utils/status-response.util';
import upload from '../../../../middleware/upload/upload.middleware';
import { authMiddleware } from '../../../../middleware/auth/auth.middleware';

export const createMading = (madingController: MadingController): Router => {
  const madingRoute = Router();

  madingRoute.post('/mading', authMiddleware, upload.single('gambar'), async (req: Request, res: Response, next: NextFunction) => {
    const requestData = { ...req.body, gambar: req.file ? req.file.filename : null };

    console.log(requestData)

    const response = await madingController.handleCreateMading(requestData);
    if (!response) {
      return null;
    }

    sendResponse(res, response);
  });

  return madingRoute;
};

export const getMadingById = (madingController: MadingController): Router => {
  const madingRoute = Router();

  madingRoute.get('/mading/:id', async (req: Request, res: Response, next: NextFunction) => {
    const httpRequestParam = { param: req.params.id };
    const response = await madingController.handleGetMadingById(httpRequestParam.param);
    if (!response) {
      return null;
    }
    sendResponse(res, response);
  });

  return madingRoute;
};

export const updateMadingById = (madingController: MadingController): Router => {
  const madingRoute = Router();

  madingRoute.put('/mading/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const httpRequestParam = { param: req.params.id };
    const httpRequestBody = { body: req.body };

    const response = await madingController.handleUpdateMading({ id: httpRequestParam.param, body: httpRequestBody.body });
    if (!response) {
      return null;
    }
    sendResponse(res, response);
  });

  return madingRoute;
};


export const getMading = (madingController: MadingController): Router => {
  const madingRoute = Router();

  madingRoute.get('/mading', async (req: Request, res: Response, next: NextFunction) => {
    const response = await madingController.handleGetMading();

    if (!response) {
      return null;
    }
    sendResponse(res, response);
  });

  return madingRoute;
};

export const deleteAllMading = (madingController: MadingController): Router => {
  const madingRoute = Router();

  madingRoute.delete('/mading/bulk', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.body;


    const response = await madingController.handleDeleteAllMading(ids);
    if (!response) {
      return null;
    }
    sendResponse(res, response);
  });

  return madingRoute;
};

export const deleteMading = (madingController: MadingController): Router => {
  const madingRoute = Router();

  madingRoute.delete('/mading/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const requestData = { param: req.params.id };
    const response = await madingController.handleDeleteMading(requestData.param);
    if (!response) {
      return null;
    }
    sendResponse(res, response);
  });

  return madingRoute;
};

