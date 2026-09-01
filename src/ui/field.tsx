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
      style={{ padding: "3.5rem 3.5rem 4.5rem" }}
      className={`flex flex-col items-center gap-7 w-full max-w-md border border-[#d4c5b9] bg-[#f5f0eb] rounded-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </form>
  );
};
