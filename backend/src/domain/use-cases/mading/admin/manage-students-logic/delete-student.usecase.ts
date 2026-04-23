import { UseCaseBase } from '../../../../base/use-case.base';
import { UserResponse } from '../../../../entities/user.entity';
import { AppError } from '../../../../errors/app.error';
import { StudentRepository } from '../../../../repositories/mading/admins/manage-student-contracts/student.repository';

export class DeleteStudentUseCase implements UseCaseBase<string, UserResponse> {
  constructor(private studentRepository: StudentRepository) {}
  async execute(input: string): Promise<UserResponse> {
    try {
      const response = await this.studentRepository.deleteStudent(input);

      if (!response) {
        throw new AppError('Gagal menghapus data', 404);
      }

      return new UserResponse(response.id, response.fullName, response.username, response.role, response.jurusan, response.createdAt, response.updatedAt);
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan sistem saat menghapus data siswa', 500);
    }
  }
}
