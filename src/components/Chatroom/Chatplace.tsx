import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "@tanstack/react-router";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import api from "../../api/axios";
import buildImage from "../../helpers/build-image";
import config from "../../config/config";
import { Messages, MessageBubble, OtherMessageBubble } from "../../ui/messages";
import {
  ChatPane,
  ChatScrollArea,
  ChatEmptyState,
  ChatInputSection,
  ChatFormatBar,
  ChatTextArea,
  ChatActionRow,
  ChatFileButton,
  ChatFontBtn,
  ChatEmojiBtn,
  ChatMentionBtn,
  ChatMoreBtn,
  ChatSendBtn,
} from "../../ui/chat";

const socket = io(config.serverUrl, {
  auth: { token: localStorage.getItem("accessToken") },
});

interface Message {
  userId: string;
  text: string;
  avatar: string;
}

interface IAvatar {
  buffer: { data: Array<number>; type: string };
  mimetype: string;
}

interface MessageResponse {
  chatter: { _id: string; avatar: IAvatar; email: string };
  content: string;
}

export default function Chatplace() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { profile } = useAuthContext();

  const chatroomId = useParams({
    from: "/chathub/$chatRoomId",
    select: (p) => p.chatRoomId,
  });

  useEffect(() => {
    async function getStoredMessages() {
      try {
        const { data } = await api.get(`/api/v1/chats/${chatroomId}`);
        if (!data.messageList) return;
        setMessages(
          data.messageList.messages.map((msg: MessageResponse) => ({
            userId: msg.chatter._id,
            text: msg.content,
            avatar: buildImage(msg.chatter.avatar.buffer.data, msg.chatter.avatar.mimetype),
          })),
        );
      } catch (e) {
        console.log("error retrieving stored messages: ", e);
      }
    }
    getStoredMessages();
  }, []);

  useEffect(() => {
    socket.on("connect", () => console.log("connected to chatroom"));
    socket.emit("join-room", { chatroomId });
    socket.on("joined-room", (data) => console.log("joined room", data));
    socket.on("message-sent", (message) => setMessages((prev) => [...prev, message]));

    return () => {
      socket.off("message-sent");
      socket.off("joined-room");
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      await api.post("/api/v1/chats/add-message", { chatroomId, message: input });
      socket.emit("chat-message", { chatroomId, userId: profile?.userId, text: input, avatar: profile?.avatar });
      setInput("");
    } catch (e) {
      console.log("error sending message: ", e);
    }
  };

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChatPane onSubmit={handleMessage}>
      <ChatScrollArea>
        <Messages>
          {messages.length === 0 && <ChatEmptyState />}
          {messages.map((msg, i) =>
            msg.userId === profile?.userId ? (
              <MessageBubble imgId={msg.avatar} key={i}>{msg.text}</MessageBubble>
            ) : (
              <OtherMessageBubble imgId={msg.avatar} key={i}>{msg.text}</OtherMessageBubble>
            ),
          )}
        </Messages>
      </ChatScrollArea>

      <ChatInputSection>
        <ChatFormatBar />
        <ChatTextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <ChatActionRow
          left={
            <>
              <ChatFileButton />
              <ChatFontBtn />
              <ChatEmojiBtn />
              <ChatMentionBtn />
              <ChatMoreBtn />
            </>
          }
          right={<ChatSendBtn />}
        />
      </ChatInputSection>
    </ChatPane>
  );
}
