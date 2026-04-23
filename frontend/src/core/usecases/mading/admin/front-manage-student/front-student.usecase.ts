import type { FrontStudentRepository } from "../../../../repositories/admin/front-manage-student-contracts/front-student.repository";

export class FrontGetStudentUseCase {
  frontStudentRepository: FrontStudentRepository;

  constructor(frontStudentRepository: FrontStudentRepository) {
    this.frontStudentRepository = frontStudentRepository;
  }

  async execute() {
    return await this.frontStudentRepository.getStudent();
  }
}
