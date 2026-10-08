import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, style, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      style={{
        padding: "8px 14px",
        backgroundColor: "var(--background-primary-alt)",
        color: "var(--text-normal)",
        border: "1px solid var(--background-modifier-border)",
        borderRadius: 8,
        width: "100%",
        fontSize: 14,
        outline: "none",
        transition: "border-color 0.15s",
        ...style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--background-modifier-border-focus)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--background-modifier-border)"; }}
      className={className}
      {...props}
    />
  ),
);
