export const Field = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col gap-1.5 w-full ${className ?? ""}`} {...props}>
    {children}
  </div>
);

export const FormLayout = ({ children, className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => (
  <form
    style={{
      padding: "40px",
      backgroundColor: "var(--background-primary-alt)",
      border: "1px solid var(--background-modifier-border)",
      borderRadius: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      width: "100%",
      maxWidth: 400,
    }}
    className={className}
    {...props}
  >
    {children}
  </form>
);
