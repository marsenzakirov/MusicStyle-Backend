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
  async create(dto: CreateTrackDto): Promise<Track> {
    const track = await this.trackModel.create({ ...dto, listens: 0 });
    return track;
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();
    return tracks;
  }

  async getOne(id) {
    const track = await this.trackModel.findById(id);
    return track;
  }

  async delete(id) {
    await this.trackModel.findByIdAndDelete(id);
    return id;
  }

  async addComment(dto: CreateCommentDto) {
    const comment = { ...dto, _id: new mongoose.Types.ObjectId() };
    const track = await this.trackModel.findById(comment.trackId);
    track.comments.push(comment);
    await track.save();
    return track;
  }

  async deleteComment(id, dto) {
    const track = await this.trackModel.findOne({ _id: dto.trackId });
    console.log(track);
    if (!track) {
      throw new Error('Track not found');
    }
    track.comments = track.comments.filter((comment) => comment._id != id);
    await track.save();
    return track;
  }

  async changeComment(id, dto) {
    const track = await this.trackModel.findOne({ _id: dto.trackId });
    if (!track) {
      throw new Error('Track not found');
    }
    track.comments = track.comments.map((comment) => {
      if (comment._id == id) {
        comment.text = dto.text;
      }
      return comment;
    });
    await track.save();
    return track;
  }
}
