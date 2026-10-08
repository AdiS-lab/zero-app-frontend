export const Label = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500 }}
    className={className}
    {...props}
  >
    {children}
  </label>
);
