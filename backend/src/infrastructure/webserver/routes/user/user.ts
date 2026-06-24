import { Request, Response, Router } from "express";
import { UserController } from "../../../../interface-adapter/controllers/user/user.controller";
import { sendResponse } from "../../../utils/status-response.util";

export class UserRoute {
  private readonly router = Router();

  constructor(private controller: UserController) {
    this.createUserRoute();
  }

  private createUserRoute(): void {
    this.router.post('/users', async (req: Request, res: Response) => {
      const requestData = req.body;

      const response = await this.controller.handleCreateUser(requestData);

      return sendResponse(res, response);
    });
  }

  public getRoutes = (): Router => {
    return this.router;
  };
}