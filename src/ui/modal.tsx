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
      backgroundColor: "rgb(28 28 27 / .5)",
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
      backgroundColor: "var(--background-raised)",
      border: "1px solid var(--separator)",
      borderRadius: "var(--radius-control)",
      padding: 24,
      width: 384,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      boxShadow: "var(--popover-shadow)",
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
      transition: "color var(--dur-fast) var(--ease-out)",
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
    className="btn btn-solid btn-md"
    style={{
      width: "100%",
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
    }}
  >
    {children}
  </button>
);
