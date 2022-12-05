import { Track } from './track.schema';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
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
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from './comment/comment.schema';

@ApiTags('Track')
@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @ApiBody({ type: CreateTrackDto })
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all tracks', type: [Track] })
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get track', type: Track })
  @ApiParam({
    name: 'id',
    description: 'Type id track',
  })
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete track', type: Track })
  @ApiParam({
    name: 'id',
    description: 'Type id track',
  })
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  @ApiResponse({ status: 200, description: 'Add comment', type: Comment })
  @ApiBody({ type: CreateCommentDto })
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Delete('/comment/:id')
  @ApiResponse({ status: 200, description: 'Delete comment', type: Comment })
  @ApiParam({
    name: 'id',
    description: 'Type id comment',
  })
  @ApiBody({ type: DeleteCommentDto })
  deleteComment(@Param('id') id: ObjectId, @Body() dto: DeleteCommentDto) {
    return this.trackService.deleteComment(id, dto);
  }

  @Put('/comment/change/:id')
  @ApiResponse({ status: 200, description: 'Change comment', type: Comment })
  @ApiParam({
    name: 'id',
    description: 'Type id comment',
  })
  @ApiBody({ type: ChangeCommentDto })
  changeComment(@Param('id') id: ObjectId, @Body() dto: ChangeCommentDto) {
    return this.trackService.changeComment(id, dto);
  }
}
