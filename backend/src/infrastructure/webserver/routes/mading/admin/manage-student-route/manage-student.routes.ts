import { NextFunction, Request, Response, Router } from 'express';
import { StudentController } from '../../../../../../interface-adapter/controllers/mading/admin/manage-student-controller/student.controller';
import { sendResponse } from '../../../../../utils/status-response.util';
import { AuthMiddleware } from '../../../../../middleware/auth/auth.middleware';

export class StudentsRoute {
  private readonly router = Router();

  constructor(
    private controller: StudentController,
    private authMidl: AuthMiddleware,
  ) {
    this.getStudent();
    this.getStudentById();
    this.deleteStudentById();
    this.deleteAllStudent();
  }

  getStudent() {
    this.router.get('/student', async (req: Request, res: Response, next: NextFunction) => {

      const response = await this.controller.handleGetStudent();

      if (!response) {
        return;
      }
      sendResponse(res, response);
    });
  }

  getStudentById(): void {
    this.router.get('/student/:id', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const requestData = req.params.id as string;

      const response = await this.controller.handleGetStudentById(requestData);

      if (!response) {
        return;
      }
      sendResponse(res, response);
    });
  }

  deleteStudentById(): void {
    this.router.delete('/student/:id', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const requestData = req.params.id as string;

      const response = await this.controller.handleDeleteStudentById(requestData);

      if (!response) {
        return;
      }
      sendResponse(res, response);
    });
  }

  deleteAllStudent(): void {
    this.router.delete('/student/bulk', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const { ids } = req.body;

      const response = await this.controller.handleBulkDeleteStudentByIds(ids);

      if (!response) {
        return;
      }
      sendResponse(res, response);
    });
  }

  public getRoutes = (): Router => {
    return this.router;
  };
}
