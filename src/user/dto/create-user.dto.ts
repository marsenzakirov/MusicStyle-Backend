import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly password: string;
}
