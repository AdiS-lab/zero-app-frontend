import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
// import { AuthProvider } from "../store/AuthContext";

export default function App() {
  return (
    // <AuthProvider>
      <RouterProvider router={router} />
    // </AuthProvider>
  );
}
