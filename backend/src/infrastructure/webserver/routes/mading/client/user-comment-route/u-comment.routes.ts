import { Request, Response, Router } from 'express';
import { ClientCommentController } from '../../../../../../interface-adapter/controllers/mading/client/user-comment-controller/u-comment.controller';
import { sendResponse } from '../../../../../utils/status-response.util';
import { AuthMiddleware } from '../../../../../middleware/auth/auth.middleware';

export class CommentClientRoute {
  private readonly router = Router();

  constructor(
    private controller: ClientCommentController,
    private authMidl: AuthMiddleware,
  ) {
    this.createComment();
    this.getAllComment();
    this.updateCommentById();
    this.deleteCommentById();
  }

  createComment(): void {
    this.router.post('/client-comment', this.authMidl.authMiddleware, async (req: Request, res: Response) => {
      const userId = (req as any).user.id;
      const httpRequest = { userId, ...req.body };


      const response = await this.controller.handleCreateComment(httpRequest);

      return sendResponse(res, response);
    });
  }

  getAllComment(): void {
    this.router.get('/client-comment', async (req: Request, res: Response) => {
      const response = await this.controller.handleGetAllComment();

      return sendResponse(res, response);
    });
  }

  updateCommentById(): void {
    this.router.put('/client-comment/:id', this.authMidl.authMiddleware, async (req: Request, res: Response) => {
      const httpRequestParam = req.params.id as string;
      const httpRequestBody = req.body;

      const response = await this.controller.handleUpdateComment(httpRequestParam, httpRequestBody);

      return sendResponse(res, response);
    });
  }

  deleteCommentById(): void {
    this.router.delete('/comment/:id', this.authMidl.authMiddleware, async (req: Request, res: Response) => {
      const httpRequest = req.params.id as string;
      const response = await this.controller.handleDeleteCommentById(httpRequest);

      return sendResponse(res, response);
    });
  }

  public getRoutes = (): Router => {
    return this.router;
  };
}
