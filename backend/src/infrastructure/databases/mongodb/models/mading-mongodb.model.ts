import mongoose from "mongoose";

const madingSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    kategori: {
      type: String,
      enum: ['prestasi', 'prakerin', 'keagamaan', 'agenda', 'karir', 'info_umum', 'karya_siswa'],
      required: true,
    },
    isi: {
      type: String,
      required: true,
    },
    gambar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

madingSchema.pre('save', function() {
  if(this.isModified('judul')) {
    this.slug = this.judul
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, ''); 
  }
})

export const MadingModel = mongoose.model('mading', madingSchema)