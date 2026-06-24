import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      immutable: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      minLength: 3,
    },
    username: {
      type: String,
      required: true,
      minLength: 3,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    role: {
      type: String,
      enum: ['admin', 'siswa'],
      default: 'siswa',
    },
    kelas: {
      type: String,
      enum: ['X', 'XI', 'XII', undefined],
    },
    jurusan: {
      type: String,
      enum: ['DKV', 'PPLG', 'MPLB', 'TJKT', undefined],
    },
  },
  {
    timestamps: true,
    _id: true,
  },
);

export const UserModel = mongoose.model('user', userSchema);
