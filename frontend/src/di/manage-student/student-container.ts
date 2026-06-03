import { FrontDeleteAllStudentUseCase } from '../../core/usecases/mading/admin/front-manage-student/front-delete-all-student.usecase';
import { FrontDeleteStudentUseCase } from '../../core/usecases/mading/admin/front-manage-student/front-delete-student.usecase';
import { FrontGetStudentByIdUseCase } from '../../core/usecases/mading/admin/front-manage-student/front-get-student-by-id.usecase';
import { FrontGetStudentUseCase } from '../../core/usecases/mading/admin/front-manage-student/front-student.usecase';
import { FrontStudentImplRepository } from '../../data/repositories/mading/admin/front-manage-student-impl-repository/front-student-impl.repository';

const studentRepoImpl = new FrontStudentImplRepository();
export const getStudentsUC = new FrontGetStudentUseCase(studentRepoImpl);
export const getStudentByIdUC = new FrontGetStudentByIdUseCase(studentRepoImpl);
export const deleteStudentUC = new FrontDeleteStudentUseCase(studentRepoImpl);
export const deleteAllStudentUC = new FrontDeleteAllStudentUseCase(studentRepoImpl);