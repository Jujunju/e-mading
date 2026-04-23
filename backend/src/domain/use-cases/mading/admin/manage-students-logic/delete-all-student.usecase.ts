import { UseCaseBase } from '../../../../base/use-case.base';
import { AppError } from '../../../../errors/app.error';
import { StudentRepository } from '../../../../repositories/mading/admins/manage-student-contracts/student.repository';

export class DeleteAllStudentUseCase implements UseCaseBase<string[], boolean> {
  constructor(private studentRepository: StudentRepository) {}

  async execute(input: string[]): Promise<boolean> {
    try {
      const responseFindStudent = await this.studentRepository.findManyStudentById(input);

      if (!responseFindStudent || responseFindStudent.length === 0) {
        throw new AppError('Data siswa masih kosong', 400);
      }

      const responseDeleteManyStudent = await this.studentRepository.deleteAllStudent(input);

      if (!responseDeleteManyStudent) {
        throw new AppError('Database gagal dibersihkan', 200);
      }

      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan sistem saat menghapus data siswa', 500);
    }
  }
}
