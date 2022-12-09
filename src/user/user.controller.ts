import { UserService } from './user.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ) {
    return this.userService.getAllUsers(count, offset);
  }
}
