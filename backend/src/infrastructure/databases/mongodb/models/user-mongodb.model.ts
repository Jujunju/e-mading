import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
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
    fullName: {
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
      enum: ['X', 'XI', 'XII'],
      default: null,
    },
    jurusan: {
      type: String,
      enum: ['DKV', 'PPLG', 'MPLB', 'TJKT'],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type UserDoc = InferSchemaType<typeof userSchema>;

export const UserModel = mongoose.model('user', userSchema);
