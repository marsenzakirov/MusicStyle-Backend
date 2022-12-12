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
  FileTypeValidator,
  Get,
  Header,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from './comment/comment.schema';
import { AllExceptionsFilter } from 'exception-filter/exception.filter';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from 'api/exceptions';

@ApiTags('Track')
@Controller('/tracks')
@UseFilters(AllExceptionsFilter)
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @ApiBody({ type: CreateTrackDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @UploadedFiles()
    files: { picture: Express.Multer.File[]; audio: Express.Multer.File[] },
    @Body()
    dto: CreateTrackDto,
  ) {
    const { picture, audio } = files;
    if (picture[0].mimetype.split('/')[0] !== 'image') {
      throw new BadRequestException({ message: 'Image is not valid' });
    }
    if (audio[0].mimetype.split('/')[0] !== 'audio') {
      throw new BadRequestException({ message: 'Audio is not valid' });
    }
    console.log(picture, audio);
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all tracks', type: [Track] })
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
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
