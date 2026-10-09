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
import { useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "../contexts/Auth/useAuthContext";
import buildImage from "../helpers/build-image";
import { BrandingPanel } from "../components/BrandingPanel";
import { AuthFooter } from "../components/AuthFooter";
import { AuthFormHeader } from "../components/AuthFormHeader";
import { AuthDivider } from "../components/AuthDivider";
import { OAuthButtons } from "../components/OAuthButtons";

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
    <div className="auth-page">
      <BrandingPanel />

      <div className="auth-form-side">
        <FormLayout onSubmit={handleSubmit(loginUser)}>
          <AuthFormHeader
            title="Welcome back"
            subtitle="Sign in to your account"
          />

          <OAuthButtons />

          <AuthDivider label="or" />

          <Field>
            <Label>Email address</Label>
            <Input {...register("email")} type="email" placeholder="you@example.com" />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </Field>

          <Field>
            <Label>Password</Label>
            <Input {...register("password")} type="password" />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </Field>

          <Button type="submit">
            {isSubmitting ? "Signing in\u2026" : "Continue"} <span className="arrow">&rarr;</span>
          </Button>

          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}

          <AuthFooter mode="login" />
        </FormLayout>
      </div>
    </div>
  );
}
