import type { FrontStudentRepository } from "../../../../repositories/admin/front-manage-student-contracts/front-student.repository";

export class FrontDeleteStudentUseCase {
      frontStudentRepository: FrontStudentRepository;
    
      constructor(frontStudentRepository: FrontStudentRepository) {
        this.frontStudentRepository = frontStudentRepository;
      }

      async execute(id: string) {
        return await this.frontStudentRepository.deleteStudent(id)
      }
}