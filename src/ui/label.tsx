export const Label = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    style={{ color: "var(--text-normal)", fontSize: 14, fontWeight: 500 }}
    className={className}
    {...props}
  >
    {children}
  </label>
);
