import { Request, Response, Router } from 'express';
import { ClientCommentController } from '../../../../../interface-adapters/controllers/mading/client/user-comment-controller/comment.controller';
import { sendResponse } from '../../../../utils/status-response.util';
import { AuthMiddleware } from '../../../../middleware/auth/auth.middleware';

export class CommentClientRoute {
  private readonly router = Router();

  constructor(
    private controller: ClientCommentController,
    private authMidl: AuthMiddleware,
  ) {
    this.saveComment();
    this.getComment();
    this.editComment();
    this.deleteCommentById();
  }

  saveComment(): void {
    this.router.post('/client-comment', this.authMidl.authMiddleware, async (req: Request, res: Response) => {
      interface commentPayload {
        madingId: string;
        isiKomentar: string;
      }
      const userId = (req as any).user.id;
      const httpRequest: commentPayload = { userId, ...req.body };

      const response = await this.controller.handleSaveComment(httpRequest);

      return sendResponse(res, response);
    });
  }

  getComment(): void {
    this.router.get('/client-comment', async (req: Request, res: Response) => {
      const response = await this.controller.handleGetComment();

      return sendResponse(res, response);
    });
  }

  editComment(): void {
    this.router.put('/client-comment/:id', this.authMidl.authMiddleware, async (req: Request, res: Response) => {
      const httpRequestParam = { param: req.params.id };
      const httpRequestBody = { body: req.body };

      const response = await this.controller.handleEditComment({ id: httpRequestParam.param, body: httpRequestBody.body });

      return sendResponse(res, response);
    });
  }

  deleteCommentById(): void {
    this.router.delete('/comment/:id', this.authMidl.authMiddleware, async (req: Request, res: Response) => {
      const httpRequest = { param: req.params.id };
      const response = await this.controller.handleDeleteComment(httpRequest.param);

      return sendResponse(res, response);
    });
  }

  public getRoutes = (): Router => {
    return this.router;
  };
}
