import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class File {
  @Prop()
  @ApiProperty()
  src: string;

  @Prop()
  @ApiProperty()
  size: number;
}
