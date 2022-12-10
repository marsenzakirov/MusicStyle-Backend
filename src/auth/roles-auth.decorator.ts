import { SetMetadata } from '@nestjs/common';
import { Role } from 'user/role/role.schema';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
