import { ChatSidebar } from "../components/Chatroom/ChatSidebar";
import { Outlet } from "@tanstack/react-router";

export default function Chathub() {
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden", backgroundColor: "var(--background-primary)" }}>
      <ChatSidebar />
      <Outlet />
    </div>
  );
}
