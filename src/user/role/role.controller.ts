import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RoleDto } from 'user/dto/role.dto';
import { RoleService } from './role.service';

@Controller('/role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  createRole(@Body() dto: RoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get()
  getRoleByName(@Body() dto: RoleDto) {
    return this.roleService.getRoleByName(dto);
  }

  @Get('/all')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Delete()
  deleteRoleByName(@Body() dto: RoleDto) {
    return this.roleService.deleteRoleByName(dto);
  }
}
