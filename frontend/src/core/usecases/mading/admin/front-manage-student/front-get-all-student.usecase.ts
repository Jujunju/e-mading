import type { FrontStudentRepository } from "../../../../repositories/mading/admin/front-manage-student-contracts/front-student.repository";

export class FrontGetAllStudentUseCase {
  frontStudentRepository: FrontStudentRepository;

  constructor(frontStudentRepository: FrontStudentRepository) {
    this.frontStudentRepository = frontStudentRepository;
  }

  async execute() {
    return await this.frontStudentRepository.getAllStudent();
  }
}
