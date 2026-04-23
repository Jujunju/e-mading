import { Request, Response, Router } from 'express';
import { ClientCommentController } from '../../../../../interface-adapters/controllers/mading/client/user-comment-controller/comment.controller';
import { sendResponse } from '../../../../../interface-adapters/utils/status-response.util';
import { authMiddleware } from '../../../../middleware/auth/auth.middleware';

export const saveComment = (clientCommentController: ClientCommentController): Router => {
  const commentRoutes = Router();
  commentRoutes.post('/client-comment', authMiddleware, async (req: Request, res: Response) => {
    interface commentPayload {
      madingId: string;
      isiKomentar: string;
    }
    const userId = (req as any).user.id;
    const httpRequest: commentPayload = { userId, ...req.body };

    const response = await clientCommentController.handleSaveComment(httpRequest);

    return sendResponse(res, response);
  });
  return commentRoutes;
};


export const getComment = (clientCommentController: ClientCommentController): Router => {
  const commentRoutes = Router();
  commentRoutes.get('/client-comment', async (req: Request, res: Response) => {
    const response = await clientCommentController.handleGetComment();

    return sendResponse(res, response);
  });
  return commentRoutes;
};

export const editComment = (clientCommentController: ClientCommentController): Router => {
  const commentRoutes = Router();
  commentRoutes.put('/client-comment/:id', authMiddleware, async (req: Request, res: Response) => {

        const httpRequestParam = { param: req.params.id };
        const httpRequestBody = { body: req.body };

    const response = await clientCommentController.handleEditComment({id: httpRequestParam.param, body: httpRequestBody.body});

    return sendResponse(res, response);
  });
  return commentRoutes;
};

export const deleteComment = (clientCommentController: ClientCommentController): Router => {
  const commentRoutes = Router();
  commentRoutes.delete('/comment/:id', authMiddleware,  async (req: Request, res: Response) => {
    const httpRequest = { param: req.params.id };
    const response = await clientCommentController.handleDeleteComment(httpRequest.param);

    return sendResponse(res, response);
  });
  return commentRoutes;
};


