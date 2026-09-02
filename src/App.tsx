import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import AuthContextProvider from "./contexts/Auth/AuthContextProvider";

export default function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}
