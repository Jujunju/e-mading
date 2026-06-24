import { UseCaseBase } from '../../../../base/use-case.base';
import { UserEntity } from '../../../../entities/user.entity';
import { AppError } from '../../../../errors/app.error';
import { StudentRepository } from '../../../../repositories/mading/admin/manage-student-contracts/student.repository';

export class GetStudentByIdUseCase implements UseCaseBase<string, UserEntity> {
  constructor(private studentRepository: StudentRepository) {}

  async execute(input: string): Promise<UserEntity> {
    const response = await this.studentRepository.findStudentById(input);

    if (!response) {
      throw new AppError('Data siswa tidak ditemukan', 404);
    }

    return response;
  }
}
