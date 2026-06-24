import { MadingEntity } from '../../../domain/entities/mading.entity';

export class MadingPresenter {
  static toResponse(entity: MadingEntity) {
    return {
      id: entity.id,
      judul: entity.judul,
      slug: entity.slug,
      kategori: entity.kategori,
      isi: entity.isi,
      gambar: entity.gambar,
      createdAt: entity.createdAt?.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      updatedAt: entity.updatedAt?.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
  }
  static toListResponse(entity: MadingEntity[]) {
    return entity.map((mading) => this.toResponse(mading));
  }
}
