import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, style, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={`field ${className ?? ""}`}
      style={style}
      {...props}
    />
  ),
);
