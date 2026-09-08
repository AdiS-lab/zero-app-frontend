import { useRef, useState } from "react";
import { Background, Button, Input, StyledLink } from "../ui";
import api from "../api/axios";
import { useAuthContext } from "../contexts/Auth/useAuthContext";

export default function Settings() {
  const image = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { profile } = useAuthContext();

  async function handleProfileImage() {
    console.log("this is profile file: ", file);

    if (!file) return;

    try {
      const formData = new FormData(); // in form data = array buffer + MIME type
      formData.append("profileImage", file);
      const res = await api.post("/api/v1/users/update-avatar", formData); // do not wrap in an object or does not detect form-data
      console.log("updated avatar message: ", res.data.message);
    } catch (e) {
      console.log("error updating profile image: ", e);
    }
  }

  return (
    <Background>
      <div className="flex flex-row items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-200 h-full gap-4">
          <StyledLink to="/chathub">Back Home</StyledLink>
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <img
              src={profile?.avatar}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          </div>

          <h2>Choose Profile</h2>

          <Input
            onChange={() => setFile(image.current?.files?.[0])}
            ref={image}
            type="file"
          />

          <Button onClick={handleProfileImage}>Set Profile</Button>
        </div>
      </div>
    </Background>
  );
}
