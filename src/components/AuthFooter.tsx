import { Link } from "@tanstack/react-router";

interface AuthFooterProps {
  mode: "login" | "register";
}

export function AuthFooter({ mode }: AuthFooterProps) {
  const hoverUnderline = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.textDecoration = "underline";
      (e.currentTarget.style).textUnderlineOffset = "3px";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.textDecoration = "none";
    },
  };

  return (
    <>
      <div style={{ width: "100%", height: 1, background: "var(--separator)" }} />

      <p style={{ fontSize: 14, color: "var(--text-muted)", textAlign: "center", margin: 0 }}>
        {mode === "login" ? "Don't have an account? " : "Already have an account? "}
        <Link
          to={mode === "login" ? "/register" : "/login"}
          style={{ color: "var(--text-normal)", fontWeight: 600, textDecoration: "none" }}
          {...hoverUnderline}
        >
          {mode === "login" ? "Sign up" : "Sign in"}
        </Link>
      </p>

      {mode === "login" && (
        <Link
          to="/forgot-password/check-email"
          style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}
          {...hoverUnderline}
        >
          Forgot password?
        </Link>
      )}
    </>
  );
}
