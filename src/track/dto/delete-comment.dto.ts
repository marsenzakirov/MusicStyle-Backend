import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
export class DeleteCommentDto {
  @IsNotEmpty({ message: 'TrackId is required' })
  @IsMongoId({ message: 'Invalid trackId' })
  @ApiProperty({
    type: String,
  })
  readonly trackId: mongoose.Types.ObjectId;
}
