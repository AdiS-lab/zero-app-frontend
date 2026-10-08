import { useState } from "react";
import { H1, Button, StyledLink } from "../ui";
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
    <div style={{ flex: 1, height: "100%", backgroundColor: "var(--background-primary)", padding: "2.5rem", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16 }}>
        <Notifications />
        <StyledLink to="/register">Sign Up</StyledLink>
        <StyledLink to="/login">Log In</StyledLink>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <H1>Welcome to 0</H1>
          <Button onClick={checkConnection}>Check Connection</Button>
          {status === "success" && <p style={{ color: "#22c55e", fontSize: 14, margin: 0 }}>Connection successful</p>}
          {status === "error" && <p style={{ color: "#ef4444", fontSize: 14, margin: 0 }}>Connection failed</p>}
        </div>
        <img
          src="/media/coffee-cups.png"
          alt="Coffee cups"
          style={{ maxWidth: 384, filter: "brightness(0.9)" }}
        />
      </div>
    </div>
  );
}
