export const Button = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      data-slot="button"
      style={{ padding: "0.25rem 0.75rem" }}
      className={`bg-[#464858] border-none rounded-lg text-white outline-none cursor-pointer hover:bg-[#A56F63] transition-colors ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
