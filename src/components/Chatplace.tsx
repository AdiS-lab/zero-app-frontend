import { useEffect, useState } from "react";
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
import api from "../api/axios";
import { useParams } from "@tanstack/react-router";
import buildImage from "../helpers/build-image";
import config from "../config/config";

const socket = io(config.serverUrl, {
  auth: { token: localStorage.getItem("accessToken") },
});

interface message {
  userId: string;
  text: string;
  avatar: string;
}

interface IAvatar {
  buffer: {
    data: Array<number>;
    type: string;
  };
  mimetype: string;
}

interface MessageResponse {
  chatter: {
    _id: string;
    avatar: IAvatar;
    email: string;
  };
  content: string;
}

/**
 * handleMessage => adds message to db + emits event
 * getStoredMessages => gets all messages on mount
 * message-sent => creates listener on mount to recieve events
 */

export default function Chatplace() {
  const [messages, setMessages] = useState<Array<message>>([]);
  const [input, setInput] = useState("");
  const { profile } = useAuthContext();

  const chatroomId = useParams({
    from: "/chathub/$chatRoomId",
    select: (param) => param.chatRoomId,
  });

  useEffect(() => {
    async function getStoredMessages() {
      try {
        const { data } = await api.get(`/api/v1/chats/${chatroomId}`);
        if (!data.messageList) return;

        const currentMessages = data.messageList.messages.map(
          (msg: MessageResponse) => {
            const avatar = buildImage(
              msg.chatter.avatar.buffer.data,
              msg.chatter.avatar.mimetype,
            );
            return {
              userId: msg.chatter._id,
              text: msg.content,
              avatar,
            };
          },
        );

        setMessages(currentMessages);
      } catch (e) {
        console.log("error retrieving stored messages: ", e);
      }
    }
    getStoredMessages();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("ANYTHING");
    });

    socket.emit("join-room", {
      chatroomId,
    });

    socket.on("joined-room", (data) => {
      console.log("successfully joined room", data);
    });

    socket.on("message-sent", (message) => {
      setMessages((prev) => [...prev, message]);
      console.log("message incoming: ", message);
    });

    return () => {
      socket.off("message-sent");
      socket.off("joined-room");
      // socket.disconnect();
    };
  }, []);

  async function handleMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await api.post("/api/v1/chats/add-message", {
        chatroomId,
        message: input,
      }); // updating the db with the message

      socket.emit("chat-message", {
        chatroomId,
        userId: profile?.userId,
        text: input,
        avatar: profile?.avatar,
      }); // emitting message so others get it

      setInput("");
    } catch (e) {
      console.log("error sending message: ", e);
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
              <MessageBubble imgId={msg.avatar} key={i}>
                {msg.text}
              </MessageBubble>
            ) : (
              <OtherMessageBubble imgId={msg.avatar} key={i}>
                {msg.text}
              </OtherMessageBubble>
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
