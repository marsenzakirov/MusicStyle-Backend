import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty({ message: 'Artist is required' })
  @ApiProperty()
  readonly artist: string;

  @IsNotEmpty({ message: 'Text is required' })
  @ApiProperty()
  readonly description: string;
}
