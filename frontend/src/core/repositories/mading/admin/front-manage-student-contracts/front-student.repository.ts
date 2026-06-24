import type { FrontUserEntity } from '../../../../entities/front-user.entity';

export interface FrontStudentRepository {
  getAllStudent(): Promise<FrontUserEntity[] | null>;
  getStudentById(id: string): Promise<FrontUserEntity | null>;
  deleteStudentById(id: string): Promise<void>;
  bulkDeleteStudentByIds(ids: string[]): Promise<void>;
}
