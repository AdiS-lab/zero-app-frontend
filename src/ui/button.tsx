export const Button = ({ className, children, style, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    data-slot="button"
    style={{
      padding: "8px 20px",
      backgroundColor: "var(--interactive-accent)",
      color: "var(--text-on-accent)",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      outline: "none",
      transition: "background 0.15s, opacity 0.15s",
      ...style,
    }}
    className={className}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--interactive-accent-hover)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--interactive-accent)"; }}
    {...props}
  >
    {children}
  </button>
);
