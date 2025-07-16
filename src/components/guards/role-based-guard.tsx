import React from 'react';
import { Navigate } from 'react-router';

import { paths } from 'src/routes/paths';

import { useAuth } from 'src/hooks/use-auth';

import getSafeArray from 'src/utils/safe-array';

const useCurrentRole = () => {
  const { user } = useAuth();
  return user?.role;
};

const RoleBasedGuard = ({
  accessibleRoles,
  children,
}: {
  accessibleRoles: string[];
  children: React.ReactNode;
}) => {
  const currentRole = useCurrentRole();

  if (!currentRole) return null;
  if (!getSafeArray(accessibleRoles).includes(currentRole)) {
    return <Navigate replace to={paths.auth.signUp} />;
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
