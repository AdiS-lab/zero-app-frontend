/* ─── Nav sidebar UI primitives ─────────────────────────────────── */

export const NavContainer = ({ children }: { children: React.ReactNode }) => (
  <aside style={{
    position: "relative",
    width: 64,
    height: "100vh",
    backgroundColor: "var(--background-primary)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 4,
    borderRight: "1px solid var(--background-modifier-border)",
  }}>
    {children}
  </aside>
);

export const NavLogo = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "var(--interactive-accent)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-on-accent)",
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 12,
    flexShrink: 0,
    userSelect: "none",
  }}>
    {children}
  </div>
);

interface NavIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const NavIconButton = ({ active, children, ...props }: NavIconButtonProps) => (
  <button
    style={{
      width: 40,
      height: 40,
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      cursor: "pointer",
      background: active ? "color-mix(in srgb, var(--interactive-accent) 22%, transparent)" : "transparent",
      color: active ? "var(--interactive-accent)" : "var(--icon-color)",
      transition: "background 0.15s, color 0.15s",
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = "var(--background-modifier-hover)";
        e.currentTarget.style.color = "var(--text-muted)";
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--icon-color)";
      }
    }}
    {...props}
  >
    {children}
  </button>
);

export const NavSpacer = () => <div style={{ flex: 1 }} />;

export const NavAvatar = ({
  src,
  initial,
  onClick,
}: {
  src?: string;
  initial?: string;
  onClick?: () => void;
}) => {
  const base: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    flexShrink: 0,
    cursor: "pointer",
    transition: "opacity 0.15s",
  };
  return src ? (
    <img src={src} alt="" onClick={onClick} style={{ ...base, objectFit: "cover" }} />
  ) : (
    <div
      onClick={onClick}
      style={{ ...base, backgroundColor: "var(--background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-normal)", fontSize: 12, fontWeight: 600, userSelect: "none" }}
    >
      {initial ?? "?"}
    </div>
  );
};

// ─── Profile popover ──────────────────────────────────────────────

interface NavProfilePopoverProps {
  open: boolean;
  email?: string;
  onSettings: () => void;
  onClose: () => void;
}

export const NavProfilePopover = ({ open, email, onSettings, onClose }: NavProfilePopoverProps) => {
  if (!open) return null;
  return (
    <>
      {/* Invisible backdrop */}
      <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={onClose} />
      {/* Popover panel */}
      <div style={{
        position: "absolute",
        left: "calc(100% + 8px)",
        bottom: 16,
        width: 220,
        backgroundColor: "var(--background-primary-alt)",
        border: "1px solid var(--background-modifier-border)",
        borderRadius: 12,
        padding: "4px 0",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        zIndex: 100,
      }}>
        {email && (
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--background-modifier-border)" }}>
            <p style={{ color: "var(--text-faint)", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Account</p>
            <p style={{ color: "var(--text-normal)", fontSize: 13, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</p>
          </div>
        )}
        <button
          onClick={onSettings}
          className="hover-fill"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: "10px 16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-normal)",
            fontSize: 14,
            textAlign: "left",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--icon-color)", flexShrink: 0 }}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </button>
      </div>
    </>
  );
};
