import { Request, Response, Router } from 'express';
import { AdminCommentController } from '../../../../../interface-adapters/controllers/mading/admin/manage-comment-controller/comment.controller';
import { sendResponse } from '../../../../utils/status-response.util';
import { AuthMiddleware } from '../../../../middleware/auth/auth.middleware';

export class ManageAdminComment {
  private readonly router = Router();

  constructor(
    private controller: AdminCommentController,
    private authMidl: AuthMiddleware,
  ) {
    this.getCommentById();
  }

  getCommentById(): void {
    this.router.get('/admin-comment/:id', this.authMidl.authMiddleware, async (req: Request, res: Response) => {
      const httpRequest = { param: req.params.id };
      const response = await this.controller.handleGetCommentById(httpRequest.param);

      return sendResponse(res, response);
    });
  }

  public getRoutes = (): Router => {
    return this.router;
  };
}
