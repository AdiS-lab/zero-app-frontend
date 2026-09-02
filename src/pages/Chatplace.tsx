import { useEffect, useState } from "react";
// import api from "../api/axios";
import {
  Button,
  Input,
  Background,
  Field,
  FormLayout,
  StyledLink,
  Messages,
  MessageBubble,
  OtherMessageBubble,
} from "../ui";
import { io } from "socket.io-client";
import { useAuthContext } from "../contexts/Auth/useAuthContext";

const socket = io("http://localhost:8000");

// babel module resolver

interface message {
  userId: string;
  text: string;
}

export default function Chatroom() {
  const [messages, setMessages] = useState<Array<message>>([]);
  const [input, setInput] = useState("");
  const { profile } = useAuthContext();

  console.log(profile);

  const accessToken = localStorage.getItem("accessToken");
  // const header = { Authorization: `Bearer ${accessToken}` };

  console.log(accessToken);

  useEffect(() => {
    socket.on("message-sent", (message) => {
      setMessages((prev) => [...prev, message]);
      console.log("message incoming: ", message);
    });

    return () => {
      socket.off("message-sent");
    };
  }, []);

  async function handleMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      // await api.post("/api/v1/chats/", { message: input }, { headers: header });
      socket.emit("chat-message", { userId: profile?.userId, text: input });
      setInput("");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Background className="flex flex-col items-center justify-center">
      <FormLayout
        onSubmit={handleMessage}
        className="max-w-full h-screen justify-end bg-[#3d2f2f]"
      >
        <Messages>
          {messages.length === 0 && (
            <p className="text-white/50 text-sm text-center">No messages yet</p>
          )}
          {messages.map((msg, i) =>
            msg.userId === profile?.userId ? (
              <MessageBubble key={i}>{msg.text}</MessageBubble>
            ) : (
              <OtherMessageBubble key={i}>{msg.text}</OtherMessageBubble>
            ),
          )}
        </Messages>

        <Field>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" className="py-1">
              Send
            </Button>
          </div>
        </Field>

        <StyledLink to="/">Back to Home</StyledLink>
        <StyledLink to="/settings">Settings</StyledLink>
      </FormLayout>
    </Background>
  );
}
