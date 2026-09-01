import { useState } from "react";
import { Background, Button, ErrorText, Field, FormLayout, Input, Label } from "../ui";
import api from "../api/axios";
import { useParams } from "@tanstack/react-router";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema1 = z.object({
  email: z.string().email(),
});

export function CheckEmail() {
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema1) });

  async function checkEmail(data: { email: string }) {
    try {
      if (!data.email) return null;

      await api.post("/api/v1/auth/forgot-password", { email: data.email });

      setSuccess(true);
    } catch (e) {
      if (e instanceof Error) {
        setError("root", { message: e.message });
      }
    }
  }

  return (
    <Background className="text-[#3d2f2f] flex items-center justify-center">
      <FormLayout title="Register" onSubmit={handleSubmit(checkEmail)}>
        <Field>
          <Label>
            Insert new Password
          </Label>
          <Input {...register("email")} type="text" />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </Field>

        <Field>
          <Button type="submit">
            {isSubmitting ? "Sending email..." : "Send Email"}
          </Button>
        </Field>
        {success && <p>success, email sent!</p>}
        {errors.root && <ErrorText>error.message</ErrorText>}
      </FormLayout>
    </Background>
  );
}

const schema2 = z.object({
  newPassword: z.string().min(8),
});

export function ChangePassword() {
  const [success, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema2) });

  const token = useParams({
    from: "/forgot-password/change-password/$token",
    select: (param) => param.token,
  });

  async function updatePassword(data: { newPassword: string }) {
    try {
      if (!data.newPassword) return null;

      await api.post("/api/v1/auth/update-password", {
        newPassword: data.newPassword,
        token,
      });

      setSuccess(true);
    } catch (e) {
      if (e instanceof Error) {
        setError("root", { message: e.message });
      }
    }
  }

  return (
    <Background className="text-[#3d2f2f] flex items-center justify-center">
      <FormLayout
        title="Reset Password"
        onSubmit={handleSubmit(updatePassword)}
      >
        <Field>
          <Label>
            Insert new Password
          </Label>
          <Input {...register("newPassword")} type="text" />
          {errors.newPassword && (
            <ErrorText>{errors.newPassword.message}</ErrorText>
          )}
        </Field>

        <Field>
          <Button type="submit">
            {isSubmitting ? "Changing password..." : "Change Password"}
          </Button>
        </Field>
        {success && <p>success, password changed!</p>}
        {errors.root && <ErrorText>error.message</ErrorText>}
      </FormLayout>
    </Background>
  );
}
