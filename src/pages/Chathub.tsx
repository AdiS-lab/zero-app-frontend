import { Background } from "../ui";
import { ChatSidebar } from "../components/ChatSidebar";
import { Outlet } from "@tanstack/react-router";

export default function Chathub() {
  return (
    <Background className="flex">
      <ChatSidebar />
      <Outlet />
    </Background>
  );
}
