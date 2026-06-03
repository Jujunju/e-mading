import { Kategori, MadingEntity } from '../../../domain/entities/mading.entity';

export class MadingDTO implements Omit<MadingEntity, 'id' | 'createdAt' | 'updatedAt'> {
  constructor(
    public readonly judul: string,
    public readonly kategori: Kategori,
    public readonly isi: string,
    public readonly gambar: string,
  ) {}
}