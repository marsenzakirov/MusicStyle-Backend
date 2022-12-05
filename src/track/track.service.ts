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
  ) {}
  async create(dto: CreateTrackDto) {
    checkDto(dto);
    const track = await this.trackModel.create({ ...dto, listens: 0 });
    if (!track) {
      throw new BadRequestException();
    }
    return new Created();
  }

  async getAll() {
    const tracks = await this.trackModel.find();
    return new Success({ message: 'Tracks', data: tracks });
  }

  async getOne(id) {
    const track = await this.trackModel.findById(id);
    return new Success({ message: 'Track', data: track });
  }

  async delete(id) {
    const track = await this.trackModel.findByIdAndDelete(id);
    console.log(track);
    if (!track) {
      throw new NotFoundException({ message: 'Track not found' });
    }
    return new Success({ message: 'Track deleted' });
  }

  async addComment(dto: CreateCommentDto) {
    checkDto(dto);

    const comment = { ...dto, _id: new mongoose.Types.ObjectId() };
    const track = await this.trackModel.findById(comment.trackId);
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
