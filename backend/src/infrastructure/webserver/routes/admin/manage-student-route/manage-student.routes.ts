import { NextFunction, Request, Response, Router } from 'express';
import { StudentController } from '../../../../../interface-adapters/controllers/mading/admin/manage-student-controller/student.controller';
import { sendResponse } from '../../../../utils/status-response.util';
import { AuthMiddleware } from '../../../../middleware/auth/auth.middleware';
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
      const requestData = { body: req.body };

      const response = await this.controller.handleGetStudent(requestData.body);

      if (!response) {
        return;
      }
      sendResponse(res, response);
    });
  }

  getStudentById(): void {
    this.router.get('/student/:id', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const requestData = { param: req.params.id };

      const response = await this.controller.handleGetStudentById(requestData.param);

      if (!response) {
        return;
      }
      sendResponse(res, response);
    });
  }

  deleteStudentById(): void {
    this.router.delete('/student/:id', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const requestData = { param: req.params.id };

      const response = await this.controller.handleDeleteStudent(requestData.param);

      if (!response) {
        return;
      }
      sendResponse(res, response);
    });
  }

  deleteAllStudent(): void {
    this.router.delete('/student/bulk', this.authMidl.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const { ids } = req.body;

      const response = await this.controller.handleDeleteAllStudent(ids);

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
