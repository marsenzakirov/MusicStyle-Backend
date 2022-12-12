import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestException } from 'api/exceptions';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    if (metadata.type === 'custom') return value;
    const errors = await validate(obj, {});
    if (errors.length > 0) {
      const messages = errors.map((error) => {
        return { [error.property]: Object.values(error.constraints) };
      });
      throw new BadRequestException({
        data: messages,
      });
    }

    return value;
  }
}
