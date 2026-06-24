import { UserEntity } from "../../../domain/entities/user.entity";
import { UserDoc } from "../../../infrastructure/databases/mongodb/types/student/student-doc.types";

export class UserMapper {
    static toEntity(data: UserDoc): UserEntity {
        return new UserEntity(data.id, data.fullName, data.username, data.password, data.role, data.kelas, data.jurusan, data.createdAt, data.updatedAt);
    }
    static toListEntity(data: UserDoc[]): UserEntity[] {
        return data.map((user) => this.toEntity(user));
    }
}
