import { UseCaseBase } from '../../../../base/use-case.base';
import { UserResponse } from '../../../../entities/user.entity';
import { AppError } from '../../../../errors/app.error';
import { StudentRepository } from '../../../../repositories/mading/admins/manage-student-contracts/student.repository';

const isDate = new Date().toISOString();

export class GetStudentByIdUseCase implements UseCaseBase<string, UserResponse> {
  constructor(private studentRepository: StudentRepository) {}

  async execute(input: string): Promise<UserResponse> {
    try {
      const response = await this.studentRepository.getStudentById(input);

      if (!response) {
        throw new AppError('Data siswa tidak ditemukan', 404);
      }

      return new UserResponse(response.id, response.fullName, response.username, response.role ?? 'siswa', response.kelas ?? '', response.jurusan ?? '', response.createdAt ?? isDate, response.updatedAt ?? isDate);
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan sistem saat menghapus data siswa', 500);
    }
  }
}
