import { MadingEntity } from "../../../domain/entities/mading.entity";
import { MadingDoc } from "../../../infrastructure/databases/mongodb/types/mading/mading-doc.types";

export class MadingMapper {
    static toEntity(data: MadingDoc): MadingEntity {
        return new MadingEntity(data.id as string, data.judul, data.slug, data.kategori, data.isi, data.gambar, data.createdAt, data.updatedAt)
    }
    static toListEntity(data: MadingDoc[]): MadingEntity[] {
        return data.map((mading) => this.toEntity(mading))
    }
}
