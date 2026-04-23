import { UserEntity } from "../../../../entities/user.entity";

export interface StudentRepository {
  getStudent(): Promise<UserEntity[]>;
  getStudentById(id: string): Promise<UserEntity | null>;
  findManyStudentById(ids: string[]): Promise<UserEntity[] | null>;
  deleteStudent(id: string): Promise<UserEntity | null>;
  deleteAllStudent(ids: string[]): Promise<boolean>;
}