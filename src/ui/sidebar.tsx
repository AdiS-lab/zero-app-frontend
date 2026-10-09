/* ─── Chat sidebar UI primitives ────────────────────────────────── */

export const SidebarPanel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: 300,
    height: "100%",
    background: "var(--background-secondary)",
    borderRight: "1px solid var(--separator)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  }}>
    {children}
  </div>
);

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    height: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    borderBottom: "1px solid var(--separator)",
    flexShrink: 0,
  }}>
    {children}
  </div>
);

export const SidebarTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ color: "var(--text-normal)", fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>
    {children}
  </h1>
);

export const SidebarIconBtn = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick}
    style={{
      width: 28,
      height: 28,
      borderRadius: "var(--radius-control)",
      backgroundColor: "transparent",
      border: "1px solid var(--separator)",
      color: "var(--icon-color)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--border-field-hover)";
      e.currentTarget.style.color = "var(--text-normal)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--separator)";
      e.currentTarget.style.color = "var(--icon-color)";
    }}
  >
    {children}
  </button>
);

export const SidebarList = ({ children }: { children: React.ReactNode }) => (
  <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", padding: "4px 0" }}>
    {children}
  </div>
);

export const SidebarItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      height: 64,
      padding: "0 12px",
      cursor: "pointer",
      borderRadius: "var(--radius-control)",
      transition: "background var(--dur-fast) var(--ease-out)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--background-hover)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
  >
    {children}
  </div>
);

export const SidebarAvatar = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: 40,
    height: 40,
    borderRadius: "var(--radius-avatar)",
    background: "var(--avatar-bg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-base-100)",
    fontSize: 14,
    fontWeight: 600,
    flexShrink: 0,
    userSelect: "none",
  }}>
    {children}
  </div>
);

export const SidebarEmptyText = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: "var(--text-faint)", fontSize: 14, textAlign: "center", padding: "40px 24px" }}>
    {children}
  </p>
);
