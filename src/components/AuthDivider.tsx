interface AuthDividerProps {
  label?: string;
}

export function AuthDivider({ label = "email" }: AuthDividerProps) {
  return (
    <div className="auth-divider">
      <span className="auth-divider-label">{label}</span>
    </div>
  );
}
