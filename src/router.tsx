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
import Chatplace from "./components/Chatroom/Chatplace";
import { ChangePassword, CheckEmail } from "./pages/ForgotPasswordFlow";
import Settings from "./pages/Settings";
import { type IAuthContext } from "./contexts/Auth/useAuthContext";
import Chathub from "./pages/Chathub";
import { NavSidebar } from "./components/NavSidebar";
import { ChatEmptyState } from "./ui/chat";

// Root — just a full-screen shell, no nav
export const rootRoute = createRootRouteWithContext<{
  auth: IAuthContext | undefined;
}>()({
  component: () => (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Outlet />
    </div>
  ),
});

// ── Auth / public layout (no NavSidebar) ──
const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "/",
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "/register",
  component: Register,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => authLayout,
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

// ── App layout (with NavSidebar) ──
const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: () => (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <NavSidebar />
      <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
        <Outlet />
      </div>
    </div>
  ),
});

const chathubRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/chathub",
  component: Chathub,
});

export const chathubIndexRoute = createRoute({
  getParentRoute: () => chathubRoute,
  path: "/",
  component: () => (
    <div style={{ flex: 1, height: "100%", backgroundColor: "var(--background-primary)" }}>
      <ChatEmptyState />
    </div>
  ),
});

export const chatplaceRoute = createRoute({
  getParentRoute: () => chathubRoute,
  path: "/$chatRoomId",
  component: Chatplace,
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/settings",
  component: Settings,
});

// ── Route tree ──
const routeTree = rootRoute.addChildren([
  authLayout.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    forgotPasswordRoute.addChildren([checkEmailRoute, changePasswordRoute]),
  ]),
  appLayout.addChildren([
    chathubRoute.addChildren([chathubIndexRoute, chatplaceRoute]),
    settingsRoute,
  ]),
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
