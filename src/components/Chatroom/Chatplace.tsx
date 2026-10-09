import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "@tanstack/react-router";
import { chatplaceRoute } from "../../router";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import api from "../../api/axios";
import buildImage from "../../helpers/build-image";
import config from "../../config/config";
import { Messages, MessageRow } from "../../ui/messages";
import {
  ChatTabBar,
  ChatTab,
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
import { SharedDocSpace } from "./SharedDocSpace";

const socket = io(config.serverUrl, {
  auth: { token: localStorage.getItem("accessToken") },
});

interface Message {
  userId: string;
  text: string;
  avatar: string;
  username: string;
  timestamp: number;
}

interface IAvatar {
  buffer: { data: Array<number>; type: string };
  mimetype: string;
}

interface MessageResponse {
  chatter: { _id: string; avatar: IAvatar; email: string };
  content: string;
  timestamp?: string;
}

const RUN_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes before using logo again

function isNewRun(msgs: Message[], i: number): boolean {
  if (i === 0) return true; // first message
  if (msgs[i].userId !== msgs[i - 1].userId) return true; // someone else sends
  if (msgs[i].timestamp - msgs[i - 1].timestamp > RUN_TIMEOUT_MS) return true; // other case
  return false;
}

export default function Chatplace() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "files">("messages");
  const { profile } = useAuthContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const chatroomId = useParams({
    from: chatplaceRoute.id,
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
            avatar: buildImage(
              msg.chatter.avatar.buffer.data,
              msg.chatter.avatar.mimetype,
            ),
            username: msg.chatter.email.split("@")[0],
            timestamp: msg.timestamp ? new Date(msg.timestamp).getTime() : Date.now(),
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
    socket.on("message-sent", (message) =>
      setMessages((prev) => [...prev, message]),
    );

    return () => {
      socket.off("message-sent");
      socket.off("joined-room");
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      await api.post("/api/v1/chats/add-message", {
        chatroomId,
        message: input,
      });
      socket.emit("chat-message", {
        chatroomId,
        userId: profile?.userId,
        text: input,
        avatar: profile?.avatar,
        username: profile?.email?.split("@")[0] ?? "unknown",
        timestamp: Date.now(),
      });
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
      <ChatTabBar>
        <ChatTab active={activeTab === "messages"} onClick={() => setActiveTab("messages")}>
          Messages
        </ChatTab>
        <ChatTab active={activeTab === "files"} onClick={() => setActiveTab("files")}>
          Files
        </ChatTab>
      </ChatTabBar>

      {activeTab === "messages" ? (
        <>
          <ChatScrollArea>
            {messages.length === 0 ? (
              <ChatEmptyState />
            ) : (
              <Messages>
                {messages.map((msg, i) => (
                  <MessageRow
                    key={i}
                    text={msg.text}
                    avatar={msg.avatar}
                    username={msg.username}
                    timestamp={msg.timestamp}
                    isOwn={msg.userId === profile?.userId}
                    showHeader={isNewRun(messages, i)}
                  />
                ))}
                <div ref={messagesEndRef} />
              </Messages>
            )}
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
        </>
      ) : (
        <SharedDocSpace />
      )}
    </ChatPane>
  );
}
