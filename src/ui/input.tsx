import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      style={{ padding: "0.45rem 1rem" }}
      className={`border border-[#464858] bg-[#0F3040] text-white w-full rounded-lg focus:outline-none focus:border-[#D99B7F] ${className ?? ""}`}
      {...props}
    />
  );
});
