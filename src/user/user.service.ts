import { checkDto } from 'api/utils';
import { Created, Success } from 'api/responses';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: CreateUserDto) {
    checkDto(dto);
    const user = await this.userModel.create(dto);
    return new Created();
  }

  async getAllUsers(count = 10, offset = 0) {
    const users = await this.userModel.find().limit(count).skip(offset);
    const total = await this.userModel.countDocuments();
    const pages =
      total % count === 0 ? total / count - 1 : Math.floor(total / count);
    return new Success({
      data: {
        users,
        pages,
      },
    });
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }, { role: 1 });
    return user;
  }
}
