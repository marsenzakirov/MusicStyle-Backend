import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
@Schema()
export class Comment {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  text: string;

  @Prop()
  @ApiProperty()
  trackId: mongoose.Types.ObjectId;
}
