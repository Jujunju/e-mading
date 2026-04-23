export enum Kategori {
  PRESTASI = 'prestasi',
  PRAKERIN = 'prakerin',
  KEAGAMAAN = 'keagamaan',
  AGENDA = 'agenda',
  KARIR = 'karir',
  INFO_UMUM = 'info_umum',
  KARYA_SISWA = 'karya_siswa',
}

export class MadingEntity {
  constructor(
    public readonly id: string,
    public readonly judul: string,
    public readonly slug: string,
    public readonly kategori: Kategori | string,
    public readonly isi: string,
    public readonly gambar: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}
}

export class MadingResponse implements Omit<MadingEntity, 'createdAt' | 'updatedAt'> {
  constructor(
    public readonly id: string,
    public readonly judul: string,
    public readonly slug: string,
    public readonly kategori: Kategori | string,
    public readonly isi: string,
    public readonly gambar: string,
  ) {}
}