import { useState } from "react";
import { H1, Button, StyledLink, Background } from "../ui";
import { Notifications } from "../components/Notifications";
import api from "../api/axios";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const checkConnection = async () => {
    try {
      await api.get("/ping");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Background style={{ padding: "2.5rem" }} className="text-[#f5f0eb] flex flex-col">
      <div className="flex justify-end items-center gap-4">
        <Notifications />
        <StyledLink to="/register">Sign Up</StyledLink>
        <StyledLink to="/login">Log In</StyledLink>
      </div>
      <div className="flex items-center justify-between flex-1">
        <div className="flex flex-col gap-4">
          <H1>Welcome to 0</H1>
          <Button onClick={checkConnection}>Check Connection</Button>
          {status === "success" && (
            <p className="text-green-500 text-sm">Connection successful</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm">Connection failed</p>
          )}
        </div>
        <img
          src="/media/coffee-cups.png"
          alt="Coffee cups"
          className="max-w-md brightness-90"
        />
      </div>
    </Background>
  );
}
