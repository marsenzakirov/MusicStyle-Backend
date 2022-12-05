import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateCommentDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly text: string;
  @ApiProperty({
    type: String,
  })
  readonly trackId: mongoose.Types.ObjectId;
}
