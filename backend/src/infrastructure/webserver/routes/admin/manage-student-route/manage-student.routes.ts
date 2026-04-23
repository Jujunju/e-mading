import { NextFunction, Request, Response, Router } from 'express';
import { StudentController } from '../../../../../interface-adapters/controllers/mading/admin/manage-student-controller/student.controller';
import { sendResponse } from '../../../../../interface-adapters/utils/status-response.util';
import { authMiddleware } from '../../../../middleware/auth/auth.middleware';

export const getStudent = (studentController: StudentController): Router => {
  const studentRoute = Router();

  studentRoute.get('/student', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = { body: req.body };

    const response = await studentController.handleGetStudent(requestData.body);

    if (!response) {
      return;
    }
    sendResponse(res, response);
  });

  return studentRoute;
};

export const getStudentById = (studentController: StudentController): Router => {
  const studentRoute = Router();

  studentRoute.get('/student/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const requestData = { param: req.params.id };

    const response = await studentController.handleGetStudentById(requestData.param);

    if (!response) {
      return;
    }
    sendResponse(res, response);
  });

  return studentRoute;
};

export const deleteStudent = (studentController: StudentController): Router => {
  const studentRoute = Router();

  studentRoute.delete('/student/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const requestData = { param: req.params.id };

    const response = await studentController.handleDeleteStudent(requestData.param);

    if (!response) {
      return;
    }
    sendResponse(res, response);
  });

  return studentRoute;
};

export const deleteAllStudent = (studentController: StudentController): Router => {
  const studentRoute = Router();

  studentRoute.delete('/student/bulk', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.body;

    const response = await studentController.handleDeleteAllStudent(ids);

    if (!response) {
      return;
    }
    sendResponse(res, response);
  });

  return studentRoute;
};
