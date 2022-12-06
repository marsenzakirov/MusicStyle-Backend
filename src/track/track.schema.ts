import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from './comment/comment.schema';
import { File } from 'file/file.schema';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  artist: string;

  @Prop()
  @ApiProperty()
  listens: number;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty({
    type: File,
  })
  picture: File;

  @Prop()
  @ApiProperty({
    type: File,
  })
  audio: File;

  @Prop()
  @ApiProperty({
    type: [Comment],
  })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
