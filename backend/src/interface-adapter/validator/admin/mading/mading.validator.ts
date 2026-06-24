import { MadingDTO } from '../../../../domain/dtos/mading/mading.dtos';
import { Kategori } from '../../../../domain/entities/mading.entity';
import { AppError } from '../../../../domain/errors/app.error';

export class MadingValidator {
  static handleMadingValidator(input: MadingDTO) {
    const checkKategori: string[] = ['prestasi', 'prakerin', 'keagamaan', 'agenda', 'karir', 'info_umum', 'karya_siswa'];

    if (!input.judul) {
      throw new AppError('Form Judul tidak boleh kosong', 400);
    }

    if (!input.kategori) {
      throw new AppError('Form Kategori tidak boleh kosong', 400);
    } else if (!checkKategori.includes(input.kategori as Kategori)) {
      throw new AppError('Form kategori tidak valid', 400);
    }

    if (!input.isi) {
      throw new AppError('Form Isi tidak boleh kosong', 400);
    }
  }
}
