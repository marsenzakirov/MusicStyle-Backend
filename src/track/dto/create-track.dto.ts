import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly artist: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly audio: object;
  @ApiProperty()
  readonly picture: object;
}
