export const Field = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }} className={className} {...props}>
    {children}
  </div>
);

export const FormLayout = ({ children, className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => (
  <form
    style={{
      padding: 40,
      backgroundColor: "var(--background-raised)",
      border: "1px solid var(--separator)",
      borderRadius: "var(--radius-control)",
      boxShadow: "0 12px 60px rgb(0 0 0 / .18), 0 4px 16px rgb(0 0 0 / .10), 0 0 0 1px rgb(0 0 0 / .03)",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: 20,
      width: "100%",
      maxWidth: 440,
    }}
    className={className}
    {...props}
  >
    {children}
  </form>
);
