import { RoleService } from './role/role.service';
import { Created, Success } from 'api/responses';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByName('user');
    console.log(role);
    const user = await this.userModel.create({ ...dto, role: role.data });
    return user;
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
    const user = await this.userModel.findOne({ email }).lean();
    return new Success({ data: user });
  }
}
