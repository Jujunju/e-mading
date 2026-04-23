import { Request, Response, Router } from "express";
import { AdminCommentController } from "../../../../../interface-adapters/controllers/mading/admin/manage-comment-controller/comment.controller";
import { authMiddleware } from "../../../../middleware/auth/auth.middleware";
import { sendResponse } from "../../../../../interface-adapters/utils/status-response.util";

export const getCommentById = (adminCommentController: AdminCommentController): Router => {
  const commentRoutes = Router();
  commentRoutes.get('/admin-comment/:id', authMiddleware, async (req: Request, res: Response) => {
    const httpRequest = { param: req.params.id };
    const response = await adminCommentController.handleGetCommentById(httpRequest.param);

    return sendResponse(res, response);
  });
  return commentRoutes;
};