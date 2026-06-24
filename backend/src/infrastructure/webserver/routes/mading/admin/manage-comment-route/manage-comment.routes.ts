import { Request, Response, Router } from 'express';
import { AdminCommentController } from '../../../../../../interface-adapter/controllers/mading/admin/manage-comment-controller/comment.controller';
import { sendResponse } from '../../../../../utils/status-response.util';
import { AuthMiddleware } from '../../../../../middleware/auth/auth.middleware';

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
      const httpRequest = req.params.id as string
      
      const response = await this.controller.handleGetCommentById(httpRequest);

      return sendResponse(res, response);
    });
  }

  public getRoutes = (): Router => {
    return this.router;
  };
}
