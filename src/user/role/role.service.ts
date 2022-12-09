import { checkIsUnique } from './../../api/utils';
import { checkDto, checkIsExist } from 'api/utils';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.schema';
import { Created, Success } from 'api/responses';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async createRole(dto) {
    checkDto(dto);
    const candidate = await this.getRoleByName(dto);
    checkIsUnique(candidate.data, 'Role');
    const role = await this.roleModel.create({ ...dto });
    return new Created();
  }

  async getAllRoles() {
    const roles = await this.roleModel.find().lean();
    return new Success({ data: roles });
  }

  async getRoleByName(dto) {
    checkDto(dto);
    const role = await this.roleModel.findOne({ name: dto.name }).lean();
    return new Success({ data: role });
  }

  async deleteRoleByName(dto) {
    checkDto(dto);
    const role = await this.roleModel
      .findOneAndDelete({ name: dto.name })
      .lean();
    checkIsExist(role);
    return new Success({ message: `Role ${role.name} was deleted` });
  }
}
