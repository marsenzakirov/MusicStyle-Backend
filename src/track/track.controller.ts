import { ChangeCommentDto } from './dto/change-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto) {
    return this.trackService.addComment(dto);
  }

  @Delete('/comment/:id')
  deleteComment(@Param('id') id: ObjectId, @Body() dto: { trackId: ObjectId }) {
    return this.trackService.deleteComment(id, dto);
  }

  @Put('/comment/change/:id')
  changeComment(@Param('id') id: ObjectId, @Body() dto: ChangeCommentDto) {
    return this.trackService.changeComment(id, dto);
  }
}
