export const Button = ({ className, children, style, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    data-slot="button"
    className={`btn btn-solid btn-md ${className ?? ""}`}
    style={{ width: "100%", ...style }}
    {...props}
  >
    {children}
  </button>
);
