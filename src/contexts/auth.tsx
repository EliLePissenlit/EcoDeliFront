import jwtDecode from 'jwt-decode';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, createContext } from 'react';

import { paths } from 'src/routes/paths';

import { useRouter } from 'src/hooks/use-router';

import { setSession } from 'src/utils/jwt';
import { checkRole } from 'src/utils/check-roles';

import { useTranslate } from 'src/locales';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import { DecodedToken } from 'src/types/token';
import { Role, useMeLazyQuery } from 'src/types/graphql/typeDefs';

interface AuthContextProps {
  logout: () => Promise<void>;
  accessToken?: string | null;
  expireUser?: () => Promise<void>;
  isAdmin?: () => boolean;
  refetchMe: () => void;
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  isLoggedAsUser?: boolean;
  onLoginSuccess: (token: string) => void;
  user?: any;
}

const AuthContext = createContext<AuthContextProps>({
  logout: () => Promise.resolve(),
  refetchMe: () => {},
  onLoginSuccess: () => {},
});

const AuthProvider = ({ children }: any) => {
  const { t } = useTranslate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const onFetchError = () => {
    window.localStorage.removeItem('logged-as-token');
    setSession(null);
    setIsAuthenticated(false);
    setIsInitialized(true);
  };

  const [getMe, { data: userData, refetch: refetchMe }] = useMeLazyQuery({
    nextFetchPolicy: 'cache-and-network',
    onError: onFetchError,
    refetchWritePolicy: 'overwrite',
    onCompleted: () => {
      setIsAuthenticated(true);
      setIsInitialized(true);
    },
  });

  const currentRole = userData?.me?.role;

  const accessToken = window.localStorage.getItem('token');

  useEffect(() => {
    const initialize = async () => {
      if (accessToken) {
        setSession(accessToken);
        getMe();
      } else {
        setIsInitialized(true);
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoginSuccess = (token: string) => {
    setSession(token);
    setIsAuthenticated(true);
    router.push(PATH_AFTER_LOGIN);
    router.reload();
  };

  const logout = async () => {
    setSession(null);
    setIsAuthenticated(false);
    router.push(paths.auth.signIn);
    router.reload();
  };

  const expireUser = async () => {
    enqueueSnackbar(t('auth.expire_user.success_message'), { variant: 'info' });
    logout();
  };

  const isLoggedAsUser = () => {
    const loggedAsToken = window.localStorage.getItem('logged-as-token');
    if (!loggedAsToken) return false;
    try {
      const decodedToken: DecodedToken = jwtDecode(loggedAsToken);
      return userData?.me?.id === decodedToken.id;
    } catch {
      return false;
    }
  };

  const isAdmin = () =>
    checkRole({
      currentRole: currentRole || Role.Basic,
      excludeRoleHierarchy: true,
      rolesToCheck: [Role.Admin, Role.SuperAdmin],
    });

  return (
    <AuthContext.Provider
      value={
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        {
          accessToken,
          expireUser,
          isAdmin,
          isAuthenticated,
          isInitialized,
          refetchMe,
          isLoggedAsUser: isLoggedAsUser(),
          logout,
          onLoginSuccess,
          user: userData?.me,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
