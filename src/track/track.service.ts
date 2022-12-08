import { FileService, FileType } from './../file/file.service';
import { ChangeCommentDto } from './dto/change-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { NotFoundException, BadRequestException } from 'api/exceptions';
import { Success, Created } from 'api/responses';
import { checkDto, checkIsExist } from 'api/utils';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track, TrackDocument } from './track.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio) {
    checkIsExist(picture);
    checkIsExist(audio);
    checkDto(dto);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: picturePath,
      audio: audioPath,
    });
    return new Created();
  }

  async getAll(count = 10, offset = 0) {
    const tracks = await this.trackModel
      .find({}, { comments: 0 })
      .skip(offset * count)
      .limit(count);
    const total = await this.trackModel.countDocuments();
    const pages =
      total % count === 0 ? total / count - 1 : Math.floor(total / count);
    return new Success({ message: 'Tracks', data: { pages, tracks } });
  }

  async getOne(id) {
    const track = await this.trackModel.findById(id);
    return new Success({ message: 'Track', data: track });
  }

  async delete(id) {
    const track = await this.trackModel.findByIdAndDelete(id);

    this.fileService.deleteFile(track.audio.src);
    this.fileService.deleteFile(track.picture.src);

    if (!track) {
      throw new NotFoundException({ message: 'Track not found' });
    }
    return new Success({ message: 'Track deleted' });
  }

  async addComment(dto: CreateCommentDto) {
    checkDto(dto);
    const comment = {
      _id: new mongoose.Types.ObjectId(),
      username: dto.username,
      text: dto.text,
    };
    const track = await this.trackModel.findById(dto.trackId);
    track.comments.push(comment);
    await track.save();
    return new Created();
  }

  async deleteComment(id, dto: DeleteCommentDto) {
    checkDto(dto);
    const track = await this.trackModel.findOne({ _id: dto.trackId });
    track.comments = track.comments.filter((comment) => comment._id != id);
    await track.save();
    return new Success({ message: 'Comment deleted' });
  }

  async changeComment(id, dto: ChangeCommentDto) {
    checkDto(dto);

    const track = await this.trackModel.findOne({ _id: dto.trackId });

    checkIsExist(track);

    track.comments = track.comments.map((comment) => {
      if (comment._id == id) {
        comment.text = dto.text;
      }
      return comment;
    });
    await track.save();
    return new Success({ message: 'Comment changed' });
  }
}
