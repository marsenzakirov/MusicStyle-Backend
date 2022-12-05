import * as mongoose from 'mongoose';

export class ChangeCommentDto {
  readonly text: string;
  readonly trackId: mongoose.Types.ObjectId;
}
