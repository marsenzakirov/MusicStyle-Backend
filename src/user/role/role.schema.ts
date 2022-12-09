import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({})
  @ApiProperty()
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
