import { UseCaseBase } from '../../../../base/use-case.base';
import { UserResponse} from '../../../../entities/user.entity';
import { AppError } from '../../../../errors/app.error';
import { StudentRepository } from '../../../../repositories/mading/admins/manage-student-contracts/student.repository';

export class GetStudentUseCase implements UseCaseBase<void, UserResponse[]> {
  constructor(private studentRepository: StudentRepository) {}

  async execute(input: void): Promise<UserResponse[]> {
    try {
          const response = await this.studentRepository.getStudent();

          return response.map((e) => {
            return new UserResponse(e.id, e.fullName, e.username, e.role, e.kelas, e.jurusan, e.createdAt);
          });
    } catch (error) {
            if (error instanceof AppError) throw error;
      
            throw new AppError('Terjadi kesalahan sistem saat menghapus data siswa', 500);
    }
  }
}
