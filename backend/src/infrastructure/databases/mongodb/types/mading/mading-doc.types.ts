
import { Kategori } from "../../../../../domain/entities/mading.entity";

export interface MadingDoc {
  readonly id?: string | null;
  readonly judul: string;
  readonly slug?: string | null;
  readonly kategori: Kategori | string;
  readonly isi: string;
  readonly gambar: string;
  readonly createdAt: string | Date;
  readonly updatedAt: string | Date;
}
