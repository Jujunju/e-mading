import type { FrontStudentRepository } from "../../../../repositories/mading/admin/front-manage-student-contracts/front-student.repository";

export class FrontBulkDeleteStudentByIdsUseCase {
  frontStudentRepository: FrontStudentRepository;

  constructor(frontStudentRepository: FrontStudentRepository) {
    this.frontStudentRepository = frontStudentRepository;
  }

  async execute(ids: string[]) {
    return await this.frontStudentRepository.bulkDeleteStudentByIds(ids)
  }
}
