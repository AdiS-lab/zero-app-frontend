import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { useNavigate } from "@tanstack/react-router";
import { CreateRoomModal } from "./CreateRoomModal";
import {
  SidebarPanel, SidebarHeader, SidebarTitle, SidebarIconBtn,
  SidebarList, SidebarItem, SidebarAvatar, SidebarEmptyText,
} from "../../ui/sidebar";

interface Room {
  id: string;
  createdBy: string;
  participants: string[];
}

interface RoomResponse {
  _id: string;
  createdBy: string;
  participants: string[];
}

interface RoomCardProps {
  room: Room;
  userId?: string;
  onClick: () => void;
}

const RoomCard = ({ room, userId, onClick }: RoomCardProps) => {
  const others = room.participants.filter((id) => id !== userId);
  const isGroup = room.participants.length > 2;
  const displayLabel = others.map((id) => `...${id.slice(-6)}`).join(", ");

  return (
    <SidebarItem onClick={onClick}>
      <SidebarAvatar>
        {isGroup ? room.participants.length : others[0]?.slice(-2).toUpperCase()}
      </SidebarAvatar>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "var(--text-normal)", fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {displayLabel}
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500, marginTop: 3 }}>
          {isGroup ? "Group" : "Direct message"}
        </p>
      </div>
    </SidebarItem>
  );
};

export const ChatSidebar = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { profile } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function setExistingRooms() {
      try {
        const res = await api.get("/api/v1/chatrooms/me");
        if (!res) return;
        setRooms(res.data.rooms.map((room: RoomResponse) => ({
          id: room._id,
          createdBy: room.createdBy,
          participants: room.participants,
        })));
      } catch (e) {
        console.log("error retrieving stored rooms: ", e);
      }
    }
    setExistingRooms();
  }, []);

  const enterRoom = (chatRoomId: string) => {
    if (!chatRoomId) return;
    navigate({ to: `/chathub/${chatRoomId}` });
  };

  return (
    <>
      <SidebarPanel>
        <SidebarHeader>
          <SidebarTitle>Messages</SidebarTitle>
          <SidebarIconBtn onClick={() => setModalOpen(true)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </SidebarIconBtn>
        </SidebarHeader>

        <SidebarList>
          {rooms.length === 0 ? (
            <SidebarEmptyText>No conversations yet</SidebarEmptyText>
          ) : (
            rooms.map((room, index) => (
              <RoomCard
                key={`${room.id}${index}`}
                room={room}
                userId={profile?.userId}
                onClick={() => enterRoom(room.id)}
              />
            ))
          )}
        </SidebarList>
      </SidebarPanel>

      {modalOpen && (
        <CreateRoomModal
          onClose={() => setModalOpen(false)}
          onCreated={(room) => setRooms((prev) => [...prev, room])}
        />
      )}
    </>
  );
};
