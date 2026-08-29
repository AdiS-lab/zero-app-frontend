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
      className="text-xl text-[#D99B7F] no-underline bg-[#464858] rounded-lg hover:bg-[#A56F63] hover:text-white transition-colors">
      {children}
    </Link>
  );
};
