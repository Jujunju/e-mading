import { FrontBulkDeleteStudentByIdsUseCase } from '../../core/usecases/mading/admin/front-manage-student/front-bulk-delete-student-by-ids.usecase';
import { FrontDeleteStudentByIdUseCase } from '../../core/usecases/mading/admin/front-manage-student/front-delete-student-by-id.usecase';
import { FrontGetStudentByIdUseCase } from '../../core/usecases/mading/admin/front-manage-student/front-get-student-by-id.usecase';
import { FrontGetAllStudentUseCase } from '../../core/usecases/mading/admin/front-manage-student/front-get-all-student.usecase';
import { FrontStudentImplRepository } from '../../data/repositories/mading/admin/front-manage-student-impl-repository/front-student-impl.repository';

const studentRepoImpl = new FrontStudentImplRepository();
export const getStudentsUC = new FrontGetAllStudentUseCase(studentRepoImpl);
export const getStudentByIdUC = new FrontGetStudentByIdUseCase(studentRepoImpl);
export const deleteStudentUC = new FrontDeleteStudentByIdUseCase(studentRepoImpl);
export const deleteAllStudentUC = new FrontBulkDeleteStudentByIdsUseCase(studentRepoImpl);
