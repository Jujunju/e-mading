import { UseCaseBase } from '../../../../base/use-case.base';
import { UserEntity } from '../../../../entities/user.entity';
import { StudentRepository } from '../../../../repositories/mading/admin/manage-student-contracts/student.repository';

export class GetAllStudentUseCase implements UseCaseBase<void, UserEntity[]> {
  constructor(private studentRepository: StudentRepository) {}

  async execute(): Promise<UserEntity[]> {
    return await this.studentRepository.getAllStudent();
  }
}
