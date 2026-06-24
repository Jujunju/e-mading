import { AppError } from '../../../../domain/errors/app.error';

export class HandleMongooseError {
  static handlerError(err: any): never {
    if (err.name === 'MongooseError') {
      throw new AppError('kesalahan umum Mongoose', 500);
    } else if (err.name === 'CastError') {
      throw new AppError('Nilai inputan tidak valid', 500);
    } else if (err.name === 'DocumentNotFoundError') {
      throw new AppError('Dokumen tidak ditemukan', 500);
    } else if (err.name === 'ValidationError') {
      throw new AppError('Data inputan tidak valid', 500);
    } else if (err.name === 'ValidatorError') {
      throw new AppError('Data input tidak valid', 500);
    } else if (err.code === 11000) {
      throw new AppError('Data sudah ada di database (duplikasi)', 500);
    }
    throw new AppError('Terjadi kesalahan internal server', 500);
  }
}
