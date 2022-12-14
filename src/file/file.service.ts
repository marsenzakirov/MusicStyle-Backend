import { BadRequestException } from 'api/exceptions';
import { Injectable } from '@nestjs/common';
import { getAudioDurationInSeconds } from 'get-audio-duration';

import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { File } from './file.schema';
export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  async createFile(type: FileType, file): Promise<File> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const fileSize = +(file.size / 1024 / 1024).toFixed(3);
      const filePath = path.resolve(__dirname, '../', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      if (type == 'audio') {
        const duration = await getAudioDurationInSeconds(
          path.resolve(filePath, fileName),
        );
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration - minutes * 60);
        return {
          src: type + '/' + fileName,
          size: fileSize,
          duration: `${minutes}:${
            seconds.toString().length == 1 ? '0' : ''
          }${seconds}`,
        };
      }

      return { src: type + '/' + fileName, size: fileSize };
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
  deleteFile(src) {
    const filePath = path.resolve(__dirname, '../', 'static', src);
    if (fs.existsSync(filePath)) {
      return fs.unlinkSync(filePath);
    }
    throw new BadRequestException({ message: 'File not found' });
  }
}
