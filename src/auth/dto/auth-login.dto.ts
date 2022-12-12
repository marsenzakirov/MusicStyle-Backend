import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, isString, Length } from 'class-validator';

export class LoginUserDto {
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

  @IsNotEmpty()
  @Length(6, 18, {
    message: 'Password must be longer than 6 and shorter than 18 characters',
  })
  @ApiProperty()
  readonly password: string;
}
