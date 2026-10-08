import { Link } from "@tanstack/react-router";

export const StyledLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    style={{ color: "var(--text-muted)", fontSize: 14, textDecoration: "none", transition: "color 0.15s" }}
    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-normal)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
  >
    {children}
  </Link>
);
