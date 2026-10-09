interface AuthFormHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthFormHeader({ title, subtitle }: AuthFormHeaderProps) {
  return (
    <div className="auth-form-header">
      <h2 className="auth-form-title">{title}</h2>
      <p className="auth-form-subtitle">{subtitle}</p>
    </div>
  );
}
