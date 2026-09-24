import { useEffect, useState } from "react";
import { Button, ErrorText, StyledLink } from "../ui";
import api from "../api/axios";
import { useAuthContext } from "../contexts/Auth/useAuthContext";
import { useNavigate } from "@tanstack/react-router";
import EmailInput from "./EmailInput";
import type { IEmailVals } from "./EmailInput";
import type { MultiValue } from "react-select";

interface Room {
  id: string;
  name: string;
}

interface RoomResponse {
  _id: string;
  chatter: string;
  chattee: string;
}

/**
 * setExistingRooms => gets chatrooms by userId + sets state
 * enterRoom => navigates to nested route, where outlet (chatroom) is displayed
 * handleCreateRoom => finds user by email and creates a chatroom
 */

export const ChatSidebar = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [success, setSuccess] = useState<string>("");
  const [emails, setEmails] = useState<MultiValue<IEmailVals>>([]);
  const [chatCreationError, setError] = useState<string>("");

  const { profile } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function setExistingRooms() {
      try {
        const res = await api.get("/api/v1/chatrooms/me");
        if (!res) return;
        const rooms = res.data.rooms;

        const allRooms = rooms.map((room: RoomResponse) => {
          return { name: room._id, id: room._id };
        });

        setRooms(allRooms);
      } catch (e) {
        console.log("error retrieving stored rooms: ", e);
      }
    }
    setExistingRooms();
  }, []);

  const enterRoom = async (chatRoomId: string) => {
    if (!chatRoomId) return;
    navigate({ to: `/chathub/${chatRoomId}` });
  };

  const handleCreateRoom = async () => {
    try {
      if (!profile || emails.length === 0) return;

      const userIds: Array<string> = [profile.userId];
      
      for (const email of emails) {
        const chattee = await api.post("/api/v1/users/by-email", {
          email: email.value,
        });
        userIds.push(chattee.data.user._id);
      }

      console.log(userIds);

      const { data } = await api.post("/api/v1/chatrooms/create", {
        chatter: profile.userId,
        chatees: userIds,
      });

      if (data) setSuccess(data.message);
      setRooms([...rooms, { name: data.data._id, id: data.data._id }]);

    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const onChange = (values: MultiValue<IEmailVals>) => {
    setEmails([...values]);
  };

  return (
    <div
      style={{ padding: "1rem" }}
      className="flex flex-col gap-4 bg-[#3d2f2f]/30 rounded-sm w-72 min-h-screen"
    >
      <StyledLink to={"/settings"}>Settings</StyledLink>

      <div>
        <EmailInput values={emails} onChange={onChange} />

        <Button onClick={handleCreateRoom} key="chatroom-button" type="submit">
          Create Chatroom
        </Button>

        {chatCreationError && <ErrorText>chatCreationError</ErrorText>}
      </div>

      {success && <div>{success}</div>}

      {rooms.length === 0 ? (
        <Button className="text-[#f5f0eb]/60 text-sm text-center">
          No private rooms joined
        </Button>
      ) : (
        rooms.map((room, index) => (
          <div
            onClick={() => enterRoom(room.id)}
            key={`${room.id}${index}`}
            className="p-2 rounded-sm bg-[#3d2f2f]/50 text-[#f5f0eb] text-sm cursor-pointer hover:bg-[#3d2f2f]/70 transition-colors"
          >
            {room.name}
          </div>
        ))
      )}
    </div>
  );
};
