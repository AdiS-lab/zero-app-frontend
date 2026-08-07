import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export const rootRoute = createRootRoute({
  component: () => (
        <div className="flex-1 overflow-auto p-5">
            <Outlet />
        </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}