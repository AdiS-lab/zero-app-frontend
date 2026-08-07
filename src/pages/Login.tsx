import { Button, Input, Label, ErrorText } from "../ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const loginUser = (data: { email: string; password: string }) => {
    console.log(data.email);
  };

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <Label htmlFor="email" />
      <Input {...register("email")} type="email" />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Label htmlFor="password" />
      <Input {...register("password")} type="password" />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <Button type="submit">{isSubmitting ? "Logging In..." : "Log In"}</Button>
    </form>
  );
}
