export type Kategori = 'prestasi' | 'prakerin' | 'keagamaan' | 'agenda' | 'karir' | 'info_umum' | 'karya_siswa';

export class MadingEntity {
  constructor(
    public readonly id: string,
    public readonly judul?: string,
    public readonly slug?: string | null,
    public readonly kategori?: Kategori | string,
    public readonly isi?: string,
    public readonly gambar?: string | null,
    public readonly createdAt?: string | Date,
    public readonly updatedAt?: string | Date,
  ) {}
}

