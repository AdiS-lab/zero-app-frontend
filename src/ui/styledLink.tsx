import { Link } from "@tanstack/react-router";

export const StyledLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link to={to} 
      className="px-4 py-2 text-sm text-[#d4c5b9] no-underline bg-transparent hover:text-[#f5f0eb] transition-colors">
      {children}
    </Link>
  );
};
