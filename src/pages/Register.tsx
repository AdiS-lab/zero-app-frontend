import { Button, Input, ErrorText, Background, FormLayout, Field } from "../ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Register() {
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
      localStorage.setItem("refreshToken", res.data.refreshToken);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <Background>
      <div className="flex items-center justify-center min-h-screen">
        <FormLayout title="Register" onSubmit={handleSubmit(registerUser)}>
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
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </Field>

          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
        </FormLayout>
      </div>
    </Background>
  );
}
