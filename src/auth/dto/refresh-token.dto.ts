import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class RefreshToken {
  @IsNotEmpty()
  @ApiProperty()
  readonly refreshToken: string;
}
