import { CommentEntity } from "../../../../../../domain/entities/comment.entity";
import { CommentDTO } from '../../../../../../domain/dtos/comment/comment.dtos';
import { UserCommentRepository } from "../../../../../../domain/repositories/mading/clients/user-comment-contracts/u-comment.repository";
import { CommentModel } from "../../../models/comment-mongodb.model";
import mongoose from "mongoose";

interface PopulatedUser {
  _id: string;
  fullName: string;
  role: string;
}

interface PopulatedMading {
  _id: string;
  judul: string;
}

export class UserCommentMongodbRepository implements UserCommentRepository {
  private toEntity(r: any): CommentEntity {
    const user = r.userId as PopulatedUser;
    const mading = r.madingId as PopulatedMading;

    return new CommentEntity(r?._id.toString(), user?.fullName || 'Anonim', user?._id, mading?._id, user?.role || 'User', mading?.judul || 'Unknown', r.isiKomentar, r.createdAt.toString(), r.updatedAt.toString());
  }

  async create(data: CommentDTO): Promise<CommentEntity | null> {
    const response = new CommentModel({
      userId: new mongoose.Types.ObjectId(data.userId),
      madingId: new mongoose.Types.ObjectId(data.madingId),
      isiKomentar: data.isiKomentar,
    });
    await response.save();

    const finalData = await response.populate('userId madingId', 'fullName role judul');

    return response ? this.toEntity(finalData) : null;
  }

  async editComment(id: string, data: CommentDTO): Promise<CommentEntity | null> {
    const response = await CommentModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { $set: { isiKomentar: data.isiKomentar } }, { returnDocument: 'after' });

    return response ? this.toEntity(response) : null;
  }

  async getDetailComment(): Promise<CommentEntity[] | null> {
    const response = await CommentModel.find({}).populate('userId madingId', 'fullName role judul').sort({ createdAt: -1 }).lean();

    if (!response) {
      return null;
    }

    return response.map((e) => {
      return this.toEntity(e);
    });
  }

  async deleteComment(id: string): Promise<CommentEntity | null> {
    const response = await CommentModel.findByIdAndDelete(id).populate('userId madingId', 'fullName role judul').lean();

    return response ? this.toEntity(response) : null;
  }
}
