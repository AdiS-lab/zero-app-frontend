import { useState } from "react";
import type { MultiValue } from "react-select";
import api from "../../api/axios";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import EmailInput from "./EmailInput";
import type { IEmailVals } from "./EmailInput";
import {
  ModalBackdrop,
  ModalPanel,
  ModalHeader,
  ModalTitle,
  ModalCloseBtn,
  PrimaryButton,
} from "../../ui/modal";

interface Room {
  id: string;
  createdBy: string;
  participants: string[];
}

interface Props {
  onClose: () => void;
  onCreated: (room: Room) => void;
}

export function CreateRoomModal({ onClose, onCreated }: Props) {
  const [emails, setEmails] = useState<MultiValue<IEmailVals>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { profile } = useAuthContext();

  const handleCreate = async () => {
    if (!profile || emails.length === 0) return;
    setLoading(true);
    try {
      const userIds: string[] = [profile.userId];
      for (const email of emails) {
        const res = await api.post("/api/v1/users/by-email", {
          email: email.value,
        });
        userIds.push(res.data.user._id);
      }

      const { data } = await api.post("/api/v1/chatrooms/create", {
        createdBy: profile.userId,
        participants: userIds,
      });

      const chatroomExists =
        data.message.toLowerCase() === "chatroom already exists";

      if (!chatroomExists) {
        onCreated({
          id: data.data._id,
          createdBy: data.data.createdBy,
          participants: data.data.participants,
        });
      }
      onClose();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalPanel onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>New Conversation</ModalTitle>
          <ModalCloseBtn onClick={onClose} />
        </ModalHeader>

        <EmailInput values={emails} onChange={(vals) => setEmails([...vals])} />

        {error && <p style={{ color: "var(--color-danger)", fontSize: 13 }}>{error}</p>}

        <PrimaryButton
          onClick={handleCreate}
          disabled={loading || emails.length === 0}
        >
          {loading ? "Creating..." : "Start Conversation"}
        </PrimaryButton>
      </ModalPanel>
    </ModalBackdrop>
  );
}
