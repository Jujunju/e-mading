import mongoose, { Types } from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    madingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mading',
    },
    isiKomentar: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  },
);

export const CommentModel = mongoose.model('comment', commentSchema);
