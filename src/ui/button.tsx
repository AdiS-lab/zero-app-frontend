export const Button = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      data-slot="button"
      style={{ padding: "0.5rem 1rem" }}
      className={`bg-[#3d2f2f] border-none rounded-sm text-[#f5f0eb] outline-none cursor-pointer hover:bg-[#2a1f1f] transition-colors text-sm font-medium ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
