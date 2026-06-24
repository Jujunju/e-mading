import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      index: true,
      immutable: true,
    },
    userId: {
      type: String,
      ref: 'user',
    },
    madingId: {
      type: String,
      ref: 'mading',
    },
    isiKomentar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: true,
  },
);

export const CommentModel = mongoose.model('comment', commentSchema);
