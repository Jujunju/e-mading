import { DeleteAllStudentUseCase } from '../../../../../domain/use-cases/mading/admin/manage-students-logic/bulk-delete-student-by-id.usecase';
import { DeleteStudentByIdUseCase } from '../../../../../domain/use-cases/mading/admin/manage-students-logic/delete-student-by-id.usecase';
import { GetStudentByIdUseCase } from '../../../../../domain/use-cases/mading/admin/manage-students-logic/get-student-by-id.usecase';
import { GetAllStudentUseCase } from '../../../../../domain/use-cases/mading/admin/manage-students-logic/get-all-student.usecase';
import { HttpResponse } from '../../../../../infrastructure/helpers/http-response.helper';
import { StudentMapper } from '../../../../mappers/student/student.mapper';
import { StudentPresenter } from '../../../../presenter/student/student.presenter';

export class StudentController {
  constructor(
    private getAllStudentUseCase: GetAllStudentUseCase,
    private getStudentByIdUseCase: GetStudentByIdUseCase,
    private deleteStudentByIdUseCase: DeleteStudentByIdUseCase,
    private deleteAllStudentUseCase: DeleteAllStudentUseCase,
  ) {}

  async handleGetStudent() {
    try {
      const response = await this.getAllStudentUseCase.execute();

      return HttpResponse.ok(StudentPresenter.toListResponse(response));
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleGetStudentById(id: string) {
    try {
      const response = await this.getStudentByIdUseCase.execute(id);

      return HttpResponse.ok(StudentPresenter.toResponse(response));
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleDeleteStudentById(id: string) {
    try {
      const response = await this.deleteStudentByIdUseCase.execute(id);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleBulkDeleteStudentByIds(ids: string[]) {
    try {
      const response = await this.deleteAllStudentUseCase.execute(ids);

      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}
