export const ErrorText = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    style={{ color: "var(--color-danger)", fontSize: 13, margin: 0 }}
    className={className}
    {...props}
  >
    {children}
  </p>
);
