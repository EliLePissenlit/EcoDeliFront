import React from 'react';

import { useAuth } from 'src/hooks/use-auth';

import { checkRole } from 'src/utils/check-roles';

const WithRoles = ({
  children,
  excludeRoleHierarchy = false,
  roles,
}: {
  children: React.ReactNode;
  excludeRoleHierarchy: boolean;
  roles: string[];
}) => {
  const { user } = useAuth();

  if (!user) return null;

  if (roles && !checkRole({ currentRole: user.role, excludeRoleHierarchy, rolesToCheck: roles }))
    return null;

  return <>{children}</>;
};

export default WithRoles;
