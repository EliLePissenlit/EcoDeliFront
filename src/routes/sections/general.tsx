import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from 'src/hooks/use-auth';

import SimpleLayout from 'src/layouts/simple';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';
import RoleBasedGuard from 'src/components/guards/role-based-guard';

import { Role } from 'src/types/graphql/typeDefs';
// ----------------------------------------------------------------------

const DashboardPage = lazy(() => import('src/pages/authenticated/dashboard'));
const ProfilePage = lazy(() => import('src/pages/authenticated/profile'));
const UsersAdministration = lazy(() => import('src/pages/administration/users-administration'));
const CategoriesAdministration = lazy(
  () => import('src/pages/administration/categories-administration')
);
const PricingAdministration = lazy(() => import('src/pages/administration/pricing-administration'));
const RelayPointsAdministration = lazy(
  () => import('src/pages/administration/relay-points-administration')
);

// Tâches utilisateur
const TasksListPage = lazy(() => import('src/pages/authenticated/tasks-list'));
const TaskDetailPage = lazy(() => import('src/pages/authenticated/task-detail'));
const TaskCreatePage = lazy(() => import('src/pages/authenticated/task-create'));
const TaskMessagesPage = lazy(() => import('src/pages/authenticated/task-messages'));
// Tâches admin
const TasksAdminPage = lazy(() => import('src/pages/administration/tasks-admin'));

// ----------------------------------------------------------------------

function LayoutWrapper() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<LoadingScreen />}>
      {isAuthenticated ? (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ) : (
        <SimpleLayout>
          <Outlet />
        </SimpleLayout>
      )}
    </Suspense>
  );
}

export const generalRoutes = [
  {
    path: '/',
    element: <LayoutWrapper />,
    children: [
      {
        path: 'dashboard',
        element: (
          <RoleBasedGuard accessibleRoles={[Role.Admin, Role.SuperAdmin, Role.Basic, Role.Partner]}>
            <DashboardPage />
          </RoleBasedGuard>
        ),
      },
      // ROUTES TÂCHES UTILISATEUR
      {
        path: 'tasks',
        element: <TasksListPage />,
      },
      {
        path: 'tasks/create',
        element: <TaskCreatePage />,
      },
      {
        path: 'tasks/:id',
        element: <TaskDetailPage />,
      },
      {
        path: 'tasks/:id/messages',
        element: <TaskMessagesPage />,
      },
      // ROUTE ADMINISTRATION TÂCHES
      {
        path: 'administration/tasks',
        element: (
          <RoleBasedGuard accessibleRoles={[Role.Admin, Role.SuperAdmin]}>
            <TasksAdminPage />
          </RoleBasedGuard>
        ),
      },
      // AUTRES ROUTES EXISTANTES
      {
        path: 'administration/users',
        element: (
          <RoleBasedGuard accessibleRoles={[Role.Admin, Role.SuperAdmin]}>
            <UsersAdministration />
          </RoleBasedGuard>
        ),
      },
      {
        path: 'administration/categories',
        element: (
          <RoleBasedGuard accessibleRoles={[Role.Admin, Role.SuperAdmin]}>
            <CategoriesAdministration />
          </RoleBasedGuard>
        ),
      },
      {
        path: 'administration/pricing',
        element: (
          <RoleBasedGuard accessibleRoles={[Role.Admin, Role.SuperAdmin]}>
            <PricingAdministration />
          </RoleBasedGuard>
        ),
      },
      {
        path: 'administration/relay-points',
        element: (
          <RoleBasedGuard accessibleRoles={[Role.Admin, Role.SuperAdmin]}>
            <RelayPointsAdministration />
          </RoleBasedGuard>
        ),
      },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
];
