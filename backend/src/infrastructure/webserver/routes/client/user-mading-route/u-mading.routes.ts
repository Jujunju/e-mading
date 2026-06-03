import { NextFunction, Request, Response, Router } from "express";
import { sendResponse } from '../../../../utils/status-response.util';
import { UserMadingController } from '../../../../../interface-adapters/controllers/mading/client/user-mading-controller/mading.controller';

export class MadingClientRoute {
  private readonly router = Router();

  constructor(private controller: UserMadingController) {
    this.getMadingBySlug();
  }

  private getMadingBySlug(): void {
    this.router.get('/mading/slug/:slug', async (req: Request, res: Response, next: NextFunction) => {
      const httpRequestParam = { param: req.params.slug };

      const response = await this.controller.handleGetMadingBySlug(httpRequestParam.param);
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


