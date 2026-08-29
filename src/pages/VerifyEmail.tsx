import { useParams } from "@tanstack/react-router";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { ErrorText } from "../ui";

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
        await api.post("/api/v1/auth/verifyEmail", { accessToken: token });
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
    <>
      {success ? <div>SUCCESS HEAD BACK</div> : <div>Loading...</div>}
      {error ?? <ErrorText>error</ErrorText>}
    </>
  );
}
