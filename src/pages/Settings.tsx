import { useRef, useState } from "react";
import { Button, Input, StyledLink } from "../ui";
import api from "../api/axios";
import { useAuthContext } from "../contexts/Auth/useAuthContext";

export default function Settings() {
  const image = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { profile } = useAuthContext();

  async function handleProfileImage() {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      const res = await api.post("/api/v1/users/update-avatar", formData);
      console.log("updated avatar message: ", res.data.message);
    } catch (e) {
      console.log("error updating profile image: ", e);
    }
  }

  return (
    <div style={{ flex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--background-primary)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: 320 }}>
        <StyledLink to="/chathub">← Back to Messages</StyledLink>

        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", backgroundColor: "var(--background-secondary)", flexShrink: 0 }}>
          <img src={profile?.avatar} alt="Profile preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <h2 style={{ color: "var(--text-normal)", fontSize: 18, fontWeight: 600, margin: 0 }}>Profile Photo</h2>

        <Input
          onChange={() => setFile(image.current?.files?.[0])}
          ref={image}
          type="file"
        />

        <Button onClick={handleProfileImage}>Set Profile</Button>
      </div>
    </div>
  );
}
