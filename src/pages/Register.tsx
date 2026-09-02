import {
  Background,
  Button,
  Input,
  ErrorText,
  FormLayout,
  Field,
  Label,
} from "../ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "../contexts/Auth/useAuthContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Register() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) });

  const registerUser = async (data: { email: string; password: string }) => {
    try {
      const res = await api.post("/api/v1/auth/signup", data);
      localStorage.setItem("accessToken", res.data.accessToken);
      if (res.status == 201) {
        const me = await api.get("/api/v1/auth/me");
        login({ userId: me.data.user._id, email: me.data.user.email });
        console.log(me.data);
      }
      navigate({ to: "/chatroom" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <Background className="text-[#3d2f2f] flex items-center justify-center">
      <FormLayout title="Register" onSubmit={handleSubmit(registerUser)}>
        <Field>
          <Label>Email</Label>
          <Input {...register("email")} type="email" />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </Field>

        <Field>
          <Label>Password</Label>
          <Input {...register("password")} type="password" />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </Field>

        <Field>
          <Button type="submit">
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </Field>

        {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
      </FormLayout>
    </Background>
  );
}
