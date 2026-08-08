import { Link } from "@tanstack/react-router";

export const StyledLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link to={to} style={{ padding: "0.65rem 1.75rem" }}
      className="text-xl text-white no-underline bg-white/15 rounded-lg hover:bg-white/25 transition-colors">
      {children}
    </Link>
  );
};
