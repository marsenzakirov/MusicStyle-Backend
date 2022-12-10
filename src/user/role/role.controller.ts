import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { RoleGuard } from 'auth/role-auth.guard';
import { Roles } from 'auth/roles-auth.decorator';
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
    return this.roleService.getRoleByName(dto.name);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/all')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Delete()
  deleteRoleByName(@Body() dto: RoleDto) {
    return this.roleService.deleteRoleByName(dto);
  }
}
