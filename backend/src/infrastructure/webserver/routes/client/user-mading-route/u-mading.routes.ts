import { NextFunction, Request, Response, Router } from "express";
import { sendResponse } from "../../../../../interface-adapters/utils/status-response.util";
import { UserMadingController } from "../../../../../interface-adapters/controllers/mading/client/user-mading-controller/mading.controller";

export const getMadingBySlug = (userMadingController: UserMadingController): Router => {
  const madingRoute = Router();

  madingRoute.get('/mading/slug/:slug', async (req: Request, res: Response, next: NextFunction) => {
    const httpRequestParam = { param: req.params.slug };

    const response = await userMadingController.handleGetMadingBySlug(httpRequestParam.param);
    if (!response) {
      return null;
    }
    sendResponse(res, response);
  });

  return madingRoute;
};
