export const Background = ({ className, style, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{ backgroundColor: "var(--background-primary)", ...style }}
    className={`min-h-screen ${className ?? ""}`}
    {...props}
  >
    {children}
  </div>
);
