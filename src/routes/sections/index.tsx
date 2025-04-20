import { Navigate, useRoutes } from 'react-router-dom';

import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { generalRoutes } from './general';

export default function Router() {
  return useRoutes([
    // Auth routes
    ...authRoutes,
    // Main routes
    ...mainRoutes,
    // General routes
    ...generalRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
