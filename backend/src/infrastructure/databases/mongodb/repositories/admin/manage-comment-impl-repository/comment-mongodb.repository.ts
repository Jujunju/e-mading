import { CommentRepository } from '../../../../../../domain/repositories/mading/admins/manage-comment-contracts/comment.repository';
import { CommentEntity } from '../../../../../../domain/entities/comment.entity';
import { CommentModel } from '../../../models/comment-mongodb.model';
import mongoose from 'mongoose';

interface PopulatedUser {
  _id: string;
  fullName: string;
  role: string;
}

interface PopulatedMading {
  _id: string;
  judul: string;
}

export class CommentMongodbRepository implements CommentRepository {
  private toEntity(r: any): CommentEntity {
    const user = r.userId as PopulatedUser;
    const mading = r.madingId as PopulatedMading;

    return new CommentEntity(r?._id.toString(), user?.fullName || 'Anonim', user?._id, mading?._id, user?.role || 'User', mading?.judul || 'Unknown', r.isiKomentar, r.createdAt.toString(), r.updatedAt.toString());
  }

  async getCommentById(id: string): Promise<CommentEntity[] | null> {
      const response = await CommentModel.find({ userId: new mongoose.Types.ObjectId(id) })
        .populate('userId madingId', 'fullName role judul')
        .sort({ createdAt: -1 });

      return response.map((e) => {
        return this.toEntity(e);
      })
  }

}
