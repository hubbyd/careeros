import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../guards/roles.guard';

export function Roles(...roles: string[]) {
  return SetMetadata(ROLES_KEY, roles);
}