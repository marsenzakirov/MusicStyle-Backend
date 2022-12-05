import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from './comment/comment.schema';

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
  @ApiProperty()
  picture: string;

  @Prop()
  @ApiProperty()
  audio: string;

  @Prop()
  @ApiProperty({
    type: [Comment],
  })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
