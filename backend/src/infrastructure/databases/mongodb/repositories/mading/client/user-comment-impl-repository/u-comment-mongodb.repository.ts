import { CommentEntity } from "../../../../../../../domain/entities/comment.entity";
import { CommentDTO } from '../../../../../../../domain/dtos/comment/comment.dtos';
import { UserCommentRepository } from '../../../../../../../domain/repositories/mading/client/user-comment-contracts/u-comment.repository';
import { CommentModel } from '../../../../models/comment-mongodb.model';
import { CommentMapper } from '../../../../../../../interface-adapter/mappers/comment/comment.mapper';

export class UserCommentMongodbRepository implements UserCommentRepository {
  async create(data: CommentEntity): Promise<void> {
    const result = new CommentModel({
      id: data.id,
      userId: data.userId,
      madingId: data.madingId,
      isiKomentar: data.isiKomentar
    });
    await result.save();
  }

  async updateComment(id: string, data: CommentDTO): Promise<boolean> {
    const result = await CommentModel.updateOne({id}, { $set: { isiKomentar: data.isiKomentar } });

    return result.modifiedCount > 0;
  }

  async getAllComment(): Promise<CommentEntity[]> {
    const result = await CommentModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'id',
          as: 'userDetail',
        },
      },
      { $unwind: '$userDetail' },
      {
        $lookup: {
          from: 'madings',
          localField: 'madingId',
          foreignField: 'id',
          as: 'madingDetail',
        },
      },
      { $unwind: '$madingDetail' },
      {
        $project: {
          id: 1,
          isiKomentar: 1,
          createdAt: 1,
          'userId': '$userDetail.id',
          'fullName': '$userDetail.fullName',
          'role': '$userDetail.role',
          'madingId': '$madingDetail.id',
          'judul': '$madingDetail.judul'
        }
      },
      {$sort: {createdAt: -1}}
    ]);

    return CommentMapper.toListEntity(result);
  }

  async deleteCommentById(id: string): Promise<boolean> {
    const result = await CommentModel.deleteOne({id});

    return result.deletedCount > 0;
  }
}
