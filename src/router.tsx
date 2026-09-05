import {
  createRouter,
  createRoute,
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatplace from "./components/Chatplace";
import { ChangePassword, CheckEmail } from "./pages/ForgotPasswordFlow";
import Settings from "./pages/Settings";
import { type IAuthContext } from "./contexts/Auth/useAuthContext";
import Chathub from "./pages/Chathub";

export const rootRoute = createRootRouteWithContext<{
  auth: IAuthContext | undefined;
}>()({
  component: () => (
    <div className="flex-1 overflow-auto">
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
  beforeLoad: ({ context }) => {
    // if (context.auth?.profile) throw redirect({ to: "/chatroom" });
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
  beforeLoad: ({ context }) => {
    // if (context.auth?.profile) throw redirect({ to: "/chatroom" });
  },
});

const chathubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chathub",
  component: Chathub,
});

export const chathubIndexRoute = createRoute({
  getParentRoute: () => chathubRoute,
  path: "/",
  component: () => (
    <div className="p-4">Select a chatroom to start messaging</div>
  ),
});

export const chatplaceRoute = createRoute({
  getParentRoute: () => chathubRoute,
  path: "/$chatRoomId",
  component: Chatplace,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: Settings,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: () => <Outlet />,
});

const checkEmailRoute = createRoute({
  getParentRoute: () => forgotPasswordRoute,
  path: "/check-email",
  component: CheckEmail,
});

const changePasswordRoute = createRoute({
  getParentRoute: () => forgotPasswordRoute,
  path: "/change-password/$token",
  component: ChangePassword,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  settingsRoute,
  forgotPasswordRoute.addChildren([checkEmailRoute, changePasswordRoute]),
  chathubRoute.addChildren([chathubIndexRoute, chatplaceRoute]),
]);

export const router = createRouter({
  routeTree,
  context: { auth: undefined },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
