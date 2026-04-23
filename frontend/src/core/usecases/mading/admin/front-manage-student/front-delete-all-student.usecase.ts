import type { FrontStudentRepository } from "../../../../repositories/admin/front-manage-student-contracts/front-student.repository";

export class FrontDeleteAllStudentUseCase {
  frontStudentRepository: FrontStudentRepository;

  constructor(frontStudentRepository: FrontStudentRepository) {
    this.frontStudentRepository = frontStudentRepository;
  }

  async execute(ids: string[]) {
    return await this.frontStudentRepository.deleteAllStudent(ids)
  }
}
