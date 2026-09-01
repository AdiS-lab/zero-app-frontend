import { Background, Button, Input, ErrorText, FormLayout, Field, Label } from "../ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { Link, useNavigate } from "@tanstack/react-router";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) });

  const loginUser = async (data: { email: string; password: string }) => {
    try {
      const res = await api.post("/api/v1/auth/login", data);
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate({ to: "/chatroom" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <Background className="text-[#3d2f2f] flex items-center justify-center">
        <FormLayout title="Log In" onSubmit={handleSubmit(loginUser)}>
          <Field>
            <Label>Email</Label>
            <Input {...register("email")} type="email" />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </Field>

          <Field>
            <Label>Password</Label>
            <Input {...register("password")} type="password" />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </Field>

          <Field>
            <Button type="submit">
              {isSubmitting ? "Logging In..." : "Log In"}
            </Button>
          </Field>

          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}

          <Link to="/forgot-password/check-email" className="text-sm text-[#3d2f2f]/60 hover:text-[#3d2f2f] transition-colors">
            Forgot password?
          </Link>
        </FormLayout>
    </Background>
  );
}
