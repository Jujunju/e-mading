import { UserEntity } from "../../../../entities/user.entity";

export interface StudentRepository {
  getAllStudent(): Promise<UserEntity[]>;
  findStudentById(id: string): Promise<UserEntity | null>;
  findManyStudentByIds(ids: string[]): Promise<UserEntity[]>;
  deleteStudentById(id: string): Promise<boolean>;
  bulkDeleteStudentByIds(ids: string[]): Promise<boolean>;
}