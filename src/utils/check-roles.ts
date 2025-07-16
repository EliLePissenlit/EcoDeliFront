import { Role } from 'src/types/graphql/typeDefs';

import getSafeArray from './safe-array';

export const roleHierarchy: Record<string, string[]> = {
  [Role.Basic]: [Role.Basic, Role.Admin, Role.SuperAdmin],
  [Role.Admin]: [Role.Admin, Role.SuperAdmin],
  [Role.SuperAdmin]: [Role.SuperAdmin],
};

export const checkRole = ({
  currentRole,
  excludeRoleHierarchy = false,
  rolesToCheck,
}: {
  currentRole: Role;
  excludeRoleHierarchy?: boolean;
  rolesToCheck: string | string[];
}): boolean => {
  if (!rolesToCheck) {
    return true;
  }
  const safeRequiredRoles = getSafeArray(rolesToCheck);
  if (excludeRoleHierarchy) return safeRequiredRoles.includes(currentRole);
  return safeRequiredRoles.some((requiredRole) =>
    roleHierarchy[requiredRole].includes(currentRole)
  );
};
