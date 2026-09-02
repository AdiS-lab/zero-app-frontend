import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import AuthContextProvider from "./contexts/Auth/AuthContextProvider";
import { useAuthContext } from "./contexts/Auth/useAuthContext";

function InnerRouter() {
  const auth = useAuthContext();
  return <RouterProvider router={router} context={{ auth }} />;
}

export default function App() {
  return (
    <AuthContextProvider>
      <InnerRouter />
    </AuthContextProvider>
  );
}
