/* ─── Modal UI primitives ────────────────────────────────────────── */

export const ModalBackdrop = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "color-mix(in srgb, var(--background-primary) 75%, transparent)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

export const ModalPanel = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <div
    style={{
      backgroundColor: "var(--background-primary-alt)",
      border: "1px solid var(--background-modifier-border)",
      borderRadius: 16,
      padding: 24,
      width: 384,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

export const ModalHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    {children}
  </div>
);

export const ModalTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ color: "var(--text-normal)", fontSize: 16, fontWeight: 600 }}>
    {children}
  </h2>
);

export const ModalCloseBtn = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    style={{
      color: "var(--icon-color)",
      background: "none",
      border: "none",
      fontSize: 16,
      cursor: "pointer",
      lineHeight: 1,
      transition: "color 0.15s",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-normal)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--icon-color)"; }}
  >
    ✕
  </button>
);

export const PrimaryButton = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      backgroundColor: "var(--interactive-accent)",
      color: "var(--text-on-accent)",
      borderRadius: 10,
      padding: "12px 0",
      fontSize: 14,
      fontWeight: 500,
      border: "none",
      width: "100%",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transition: "background 0.15s, opacity 0.15s",
    }}
    onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.backgroundColor = "var(--interactive-accent-hover)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--interactive-accent)"; }}
  >
    {children}
  </button>
);
