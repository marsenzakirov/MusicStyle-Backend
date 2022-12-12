import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class ChangeCommentDto {
  @IsNotEmpty({ message: 'Text is required' })
  @IsString({ message: 'Text must be a string' })
  @ApiProperty()
  readonly text: string;

  @IsNotEmpty({ message: 'TrackId is required' })
  @IsString({ message: 'TrackId must be a string' })
  @ApiProperty({
    type: String,
  })
  readonly trackId: mongoose.Types.ObjectId;
}
