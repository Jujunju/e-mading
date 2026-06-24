import type { FrontStudentRepository } from "../../../../repositories/mading/admin/front-manage-student-contracts/front-student.repository";

export class FrontDeleteStudentByIdUseCase {
      frontStudentRepository: FrontStudentRepository;
    
      constructor(frontStudentRepository: FrontStudentRepository) {
        this.frontStudentRepository = frontStudentRepository;
      }

      async execute(id: string) {
        return await this.frontStudentRepository.deleteStudentById(id)
      }
}