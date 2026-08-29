import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Button,
  Input,
  Background,
  ErrorText,
  Field,
  FormLayout,
  StyledLink,
  Messages,
  MessageBubble,
} from "../ui";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export default function Chatroom() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const header = { Authorization: `Bearer ${accessToken}` };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  async function handleMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await api.post("/api/v1/chats/", { message: input }, { headers: header });
      socket.emit("chat message", input);
      setInput("");
    } catch (e) {
      console.log(e)
      setError("Failed to send message");
    }
  }

  return (
    <Background className="flex flex-col items-center justify-center">
      <FormLayout
        onSubmit={handleMessage}
        className="max-w-full h-screen justify-end bg-neutral-100"
      >
        <Messages>
          {messages.length === 0 && (
            <p className="text-white/50 text-sm text-center">No messages yet</p>
          )}
          {messages.map((msg, i) => (
            <MessageBubble key={i}>{msg}</MessageBubble>
          ))}
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
          {error && <ErrorText>{error}</ErrorText>}
        </Field>

        <StyledLink to="/">Back to Home</StyledLink>
      </FormLayout>
    </Background>
  );
}
