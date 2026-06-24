import { Kategori, MadingEntity } from '../../../domain/entities/mading.entity';

export class MadingDTO implements Omit<MadingEntity, 'createdAt' | 'updatedAt'> {
  constructor(
    public readonly id: string,
    public readonly judul: string,
    public readonly kategori: Kategori,
    public readonly isi: string,
    public gambar: string | null,
  ) {}
}

