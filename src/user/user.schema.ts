import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role/role.schema';
import { Track } from 'track/track.schema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  password: string;

  @Prop()
  @ApiProperty({ type: Role })
  role: Role;

  @Prop()
  @ApiProperty()
  avatar: string;

  @Prop()
  @ApiProperty({
    type: [Track],
  })
  favoriteTracks: Track[];

  @Prop()
  @ApiProperty({
    type: [Track],
  })
  myTracks: Track[];

  @ApiProperty()
  @Prop()
  @ApiProperty()
  banned: boolean;

  @Prop()
  @ApiProperty()
  banReason: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
