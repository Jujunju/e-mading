import type { FrontUserEntity } from '../../../entities/front-user.entity';

export interface FrontStudentRepository {
  getStudent(): Promise<FrontUserEntity[] | null>;
  getStudentById(id: string): Promise<FrontUserEntity | null>;
  deleteStudent(id: string): Promise<void>;
  deleteAllStudent(ids: string[]): Promise<void>;
}
