import { useEffect, useState } from "react";
import { Button, Input, ErrorText, StyledLink } from "../ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { useAuthContext } from "../contexts/Auth/useAuthContext";
import { useNavigate } from "@tanstack/react-router";

const schema = z.object({
  email: z.string().email(),
});

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const enterRoom = async (chatRoomId: string) => {
    if (!chatRoomId) return;
    navigate({ to: `/chathub/${chatRoomId}` });
  };

  const handleCreateRoom = async (formData: { email: string }) => {
    try {
      if (!profile) return;

      const chattee = await api.post("/api/v1/users/by-email", {
        email: formData?.email,
      });

      const { data } = await api.post("/api/v1/chatrooms/create", {
        chatter: profile.userId,
        chattee: chattee.data.user._id,
      });

      if (data) setSuccess(data.message);

      setRooms([...rooms, { name: data.data._id, id: data.data._id }]);

      reset();
    } catch (err) {
      if (err instanceof Error) {
        setError("email", { message: err.message });
      }
    }
  };

  return (
    <div
      style={{ padding: "1rem" }}
      className="flex flex-col gap-4 bg-[#3d2f2f]/30 rounded-sm w-72 min-h-screen"
    >
      <StyledLink to={"/settings"}>Settings</StyledLink>

      <form
        onSubmit={handleSubmit(handleCreateRoom)}
        style={{ padding: "0.75rem" }}
        className="flex flex-col gap-2 bg-[#3d2f2f]/40 rounded-sm"
      >
        <Input {...register("email")} type="email" placeholder="Enter email" />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        <Button key="chatroom-button" type="submit">
          {isSubmitting ? "Creating..." : "Create chatroom"}
        </Button>
      </form>

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
