import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @ApiProperty()
  readonly username: string;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @ApiProperty()
  readonly text: string;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @ApiProperty({
    type: String,
  })
  readonly trackId: mongoose.Types.ObjectId;
}
