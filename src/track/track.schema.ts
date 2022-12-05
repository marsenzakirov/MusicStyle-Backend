import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CommentType } from '@types';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  listens: number;

  @Prop()
  description: string;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop()
  comments: CommentType[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
