import { Button, Input, Label, ErrorText } from "../ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(8),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const registerUser = (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    console.log(data.email);
  };

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <Label htmlFor="email" />
      <Input {...register("email")} type="email" />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Label htmlFor="username" />
      <Input {...register("username")} type="username" />
      {errors.username && <ErrorText>{errors.username.message}</ErrorText>}

      <Label htmlFor="password" />
      <Input {...register("password")} type="password" />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <Button type="submit">
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}
