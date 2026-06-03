import { DeleteAllStudentUseCase } from '../../../../../domain/use-cases/mading/admin/manage-students-logic/delete-all-student.usecase';
import { DeleteStudentUseCase } from '../../../../../domain/use-cases/mading/admin/manage-students-logic/delete-student.usecase';
import { GetStudentByIdUseCase } from '../../../../../domain/use-cases/mading/admin/manage-students-logic/get-student-by-id.usecase';
import { GetStudentUseCase } from '../../../../../domain/use-cases/mading/admin/manage-students-logic/get-student.usecase';
import { HttpResponse } from '../../../../../infrastructure/helpers/http-response.helper';

export class StudentController {
  constructor(
    private getStudentUseCase: GetStudentUseCase,
    private getStudentByIdUseCase: GetStudentByIdUseCase,
    private deleteStudentUseCase: DeleteStudentUseCase,
    private deleteAllStudentUseCase: DeleteAllStudentUseCase,
  ) {}

  async handleGetStudent(httpRequest: any) {
    try {
      const response = await this.getStudentUseCase.execute(httpRequest);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleGetStudentById(httpRequest: any) {
    try {
      const response = await this.getStudentByIdUseCase.execute(httpRequest);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleDeleteStudent(httpRequest: any) {
    try {
      const response = await this.deleteStudentUseCase.execute(httpRequest);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleDeleteAllStudent(httpRequest: any) {
    try {
      const response = await this.deleteAllStudentUseCase.execute(httpRequest);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}
