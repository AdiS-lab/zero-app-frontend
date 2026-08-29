import { Button, Input, ErrorText, Background, FormLayout, Field } from "../ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { useNavigate } from "@tanstack/react-router";

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
    <Background>
      <div className="flex items-center justify-center min-h-screen">
        <FormLayout title="Log In" onSubmit={handleSubmit(loginUser)}>
          <Field>
            <label className="text-white text-sm font-medium">Email</label>
            <Input {...register("email")} type="email" />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </Field>

          <Field>
            <label className="text-white text-sm font-medium">Password</label>
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
        </FormLayout>
      </div>
    </Background>
  );
}
