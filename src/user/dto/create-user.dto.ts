import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, isString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Incorrect email',
    },
  )
  @IsNotEmpty({
    message: 'Email is required',
  })
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty({
    message: 'Name is required',
  })
  @Length(4, 16, {
    message: 'Name must be longer than 4 and shorter than 16 characters',
  })
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @Length(6, 18, {
    message: 'Password must be longer than 6 and shorter than 18 characters',
  })
  @ApiProperty()
  readonly password: string;
}
