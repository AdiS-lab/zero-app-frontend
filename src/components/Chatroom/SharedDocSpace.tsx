export const SharedDocSpace = () => (
  <div style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    color: "var(--text-faint)",
    userSelect: "none",
    padding: 40,
  }}>
    {/* Folder / document icon */}
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>

    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
      <p style={{ color: "var(--text-muted)", fontSize: 15, fontWeight: 500 }}>
        Shared Files & Documents
      </p>
      <p style={{ color: "var(--text-faint)", fontSize: 13, maxWidth: 280, lineHeight: 1.55 }}>
        Files sent in this conversation will appear here. You can also upload documents to share with this room.
      </p>
    </div>
  </div>
);
