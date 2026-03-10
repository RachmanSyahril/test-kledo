import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import { fetchRegionData } from './data';
import { RegionFilter } from './RegionFilter';
import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RegionFilter />,
    loader: fetchRegionData,
  },
];

const router = createHashRouter(routes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
