import { UserService } from './user.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'auth/roles-auth.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ) {
    return this.userService.getAllUsers(count, offset);
  }
}
