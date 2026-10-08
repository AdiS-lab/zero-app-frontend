/* ─── Chat sidebar UI primitives ────────────────────────────────── */

export const SidebarPanel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: 280,
    height: "100%",
    backgroundColor: "var(--background-secondary)",
    borderRight: "1px solid var(--background-modifier-border)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  }}>
    {children}
  </div>
);

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "32px 24px 20px",
    borderBottom: "1px solid var(--background-modifier-border)",
  }}>
    {children}
  </div>
);

export const SidebarTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ color: "var(--text-normal)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.2px" }}>
    {children}
  </h1>
);

export const SidebarIconBtn = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick}
    style={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "1px solid var(--background-modifier-border)",
      color: "var(--icon-color)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "border-color 0.15s, color 0.15s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--background-modifier-border-hover)";
      e.currentTarget.style.color = "var(--text-normal)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--background-modifier-border)";
      e.currentTarget.style.color = "var(--icon-color)";
    }}
  >
    {children}
  </button>
);

export const SidebarList = ({ children }: { children: React.ReactNode }) => (
  <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
    {children}
  </div>
);

export const SidebarItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="hover-fill"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 24px",
      cursor: "pointer",
      borderBottom: "1px solid var(--background-modifier-border)",
    }}
  >
    {children}
  </div>
);

export const SidebarAvatar = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "color-mix(in srgb, var(--interactive-accent) 20%, var(--background-secondary))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--interactive-accent)",
    fontSize: 12,
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
