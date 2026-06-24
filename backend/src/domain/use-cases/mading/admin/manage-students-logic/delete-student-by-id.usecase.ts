import { UseCaseBase } from '../../../../base/use-case.base';
import { AppError } from '../../../../errors/app.error';
import { StudentRepository } from '../../../../repositories/mading/admin/manage-student-contracts/student.repository';

export class DeleteStudentByIdUseCase implements UseCaseBase<string, boolean> {
  constructor(private studentRepository: StudentRepository) {}
  async execute(input: string): Promise<boolean> {
    const response = await this.studentRepository.deleteStudentById(input);

    if (!response) {
      throw new AppError('Siswa tidak ditemukan', 404);
    }

    return true;
  }
}
