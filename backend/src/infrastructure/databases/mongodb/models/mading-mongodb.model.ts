import mongoose, { UpdateQuery } from "mongoose";

const madingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      index: true,
      immutable: true
    },
    judul: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      index: true,
    },
    kategori: {
      type: String,
      enum: ['prestasi', 'prakerin', 'keagamaan', 'agenda', 'karir', 'info_umum', 'karya_siswa'],
      required: true,
      default: '',
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
    _id: true,
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

madingSchema.pre('updateOne', function() {
  const update = this.getUpdate() as UpdateQuery<any>

  if(update || !Array.isArray(update)) {
    if(update.judul || (update.$set && update.$set.judul)) {
      const judulBaru = update.judul || update.$set?.judul

      const slugBaru = judulBaru
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, ''); 

        if(update.$set) {
          update.$set.slug = slugBaru
        } else {
          update.slug = slugBaru
        }
    }
  }
})

export const MadingModel = mongoose.model('mading', madingSchema)