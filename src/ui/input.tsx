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
      className={`border border-[#d4c5b9] bg-[#f5f0eb] text-[#3d2f2f] w-full rounded-sm focus:outline-none focus:border-[#3d2f2f] text-sm ${className ?? ""}`}
      {...props}
    />
  );
});
