import * as mongoose from 'mongoose';

export interface CommentType {
  _id: mongoose.Types.ObjectId;
  username: string;
  text: string;
  trackId: mongoose.Types.ObjectId;
}
