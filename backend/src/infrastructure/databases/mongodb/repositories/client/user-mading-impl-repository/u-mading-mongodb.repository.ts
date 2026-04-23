import { MadingEntity } from "../../../../../../domain/entities/mading.entity";
import { UserMadingRepository } from "../../../../../../domain/repositories/mading/clients/user-mading-contracts/u-mading.repository";
import { MadingModel } from "../../../models/mading-mongodb.model";

export class UserMadingMongodbRepository implements UserMadingRepository {

    private toEntity(r: any): MadingEntity {
        return new MadingEntity(r._id.toString(), r?.judul, r?.slug, r?.kategori, r?.isi, r?.gambar, r.createdAt.toString(), r.updatedAt.toString());
    }

      async findMadingBySlug(slug: string): Promise<MadingEntity[] | null> {
        const response = await MadingModel.find({ slug: slug });
    
        if (!response) {
          return null;
        }
    
        return response.map((r) => {
          return this.toEntity(r);
        });
      }
}