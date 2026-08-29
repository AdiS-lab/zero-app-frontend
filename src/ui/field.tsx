export const Field = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

export const FormLayout = ({
  children,
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      style={{ padding: "3rem" }}
      className={`flex flex-col items-center gap-6 w-full max-w-lg border border-[#464858] bg-[#0F3040] ${className ?? ""}`}
      {...props}
    >
      {children}
    </form>
  );
};
