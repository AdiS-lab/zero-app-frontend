import { useParams } from "@tanstack/react-router";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { Background, ErrorText } from "../ui";

export default function VerifyEmail() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const token = useParams({
    from: "/verify/$token",
    select: (param) => param.token,
  });

  useEffect(() => {
    async function checkEmail() {
      try {
        await api.post("/api/v1/auth/verify-email", { accessToken: token });
        setSuccess(true);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }

    checkEmail();
  }, [token]);

  return (
    <Background className="text-[#f5f0eb] flex items-center justify-center">
      {success ? <div>SUCCESS HEAD BACK</div> : <div>Loading...</div>}
      {error ?? <ErrorText>error</ErrorText>}
    </Background>
  );
}
