import {
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
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "../contexts/Auth/useAuthContext";
import buildImage from "../helpers/build-image";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const { login } = useAuthContext();
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

      if (res.status === 200) {
        const me = await api.get("/api/v1/auth/me");
        if (!me) throw new Error();

        const avatar = buildImage(
          me.data.user.avatar.buffer.data,
          me.data.user.avatar.mimetype,
        );

        login({
          userId: me.data.user._id,
          email: me.data.user.email,
          avatar,
        });
      }
      navigate({ to: "/chathub" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <div style={{ flex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--background-primary)" }}>
      <FormLayout onSubmit={handleSubmit(loginUser)}>
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
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>
        </Field>

        {errors.root && <ErrorText>{errors.root.message}</ErrorText>}

        <Link
          to="/forgot-password/check-email"
          style={{ fontSize: 13, color: "var(--text-faint)", textDecoration: "none", transition: "color 0.15s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-faint)"; }}
        >
          Forgot password?
        </Link>
      </FormLayout>
    </div>
  );
}
