import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
export class DeleteCommentDto {
  @ApiProperty({
    type: String,
  })
  readonly trackId: mongoose.Types.ObjectId;
}
