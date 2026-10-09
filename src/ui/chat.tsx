/* ─── Chat area UI primitives ────────────────────────────────────── */

// ─── Tab bar ──────────────────────────────────────────────────────

export const ChatTabBar = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    height: 52,
    borderBottom: "1px solid var(--separator)",
    padding: "0 16px",
    flexShrink: 0,
  }}>
    {children}
  </div>
);

export const ChatTab = ({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      borderBottom: active
        ? "2px solid var(--color-accent)"
        : "2px solid transparent",
      padding: "10px 16px",
      marginBottom: -1,
      cursor: "pointer",
      color: active ? "var(--text-normal)" : "var(--text-faint)",
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      letterSpacing: "-0.01em",
      transition: "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
      flexShrink: 0,
    }}
    onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "var(--text-muted)"; }}
    onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "var(--text-faint)"; }}
  >
    {children}
  </button>
);

// ─── Main pane ────────────────────────────────────────────────────

export const ChatPane = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}) => (
  <form
    onSubmit={onSubmit}
    style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%", backgroundColor: "var(--background-primary)" }}
  >
    {children}
  </form>
);

export const ChatScrollArea = ({ children }: { children: React.ReactNode }) => (
  <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column" }}>
    {children}
  </div>
);

export const ChatEmptyState = () => (
  <div style={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    color: "var(--text-faint)",
    userSelect: "none",
  }}>
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  </div>
);

// ─── Input box ────────────────────────────────────────────────────

export const ChatInputSection = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: "0 16px 16px" }}>
    <div style={{
      border: "1px solid var(--border-field)",
      borderRadius: "var(--radius-control)",
      backgroundColor: "var(--background-input)",
      overflow: "hidden",
      transition: "border-color var(--dur-fast) var(--ease-out)",
    }}>
      {children}
    </div>
  </div>
);

// ─── Format bar (top row) ─────────────────────────────────────────

const FmtBtn = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <button
    type="button"
    title={title}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--icon-color)",
      borderRadius: "var(--radius-control)",
      width: 28,
      height: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      fontWeight: 700,
      flexShrink: 0,
      transition: "color var(--dur-fast) var(--ease-out)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-normal)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--icon-color)"; }}
  >
    {children}
  </button>
);

const FmtDivider = () => (
  <div style={{ width: 1, height: 14, backgroundColor: "var(--separator)", margin: "0 4px", flexShrink: 0 }} />
);

export const ChatFormatBar = () => (
  <div style={{
    display: "flex",
    alignItems: "center",
    padding: "6px 10px",
    gap: 2,
    borderBottom: "1px solid var(--separator)",
  }}>
    <FmtBtn title="Bold"><b>B</b></FmtBtn>
    <FmtBtn title="Italic"><i style={{ fontStyle: "italic", fontWeight: 400 }}>I</i></FmtBtn>
    <FmtBtn title="Underline"><u>U</u></FmtBtn>
    <FmtBtn title="Strikethrough"><s style={{ fontWeight: 400 }}>S</s></FmtBtn>
    <FmtDivider />
    <FmtBtn title="Link">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </FmtBtn>
    <FmtDivider />
    <FmtBtn title="Ordered list">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" />
        <path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </svg>
    </FmtBtn>
    <FmtBtn title="Unordered list">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
        <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
        <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    </FmtBtn>
    <FmtBtn title="Block quote">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" />
      </svg>
    </FmtBtn>
    <FmtDivider />
    <FmtBtn title="Inline code">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    </FmtBtn>
    <FmtBtn title="Code block">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    </FmtBtn>
  </div>
);

// ─── Text area (middle row) ────────────────────────────────────────

export const ChatTextArea = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) => (
  <textarea
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    style={{
      display: "block",
      width: "100%",
      background: "transparent",
      color: "var(--text-normal)",
      border: "none",
      outline: "none",
      fontSize: 14,
      padding: "12px 16px",
      resize: "none",
      minHeight: 36,
      maxHeight: 200,
      lineHeight: 1.55,
      fontFamily: "var(--font-ui)",
      fieldSizing: "content",
    } as React.CSSProperties}
  />
);

// ─── Action row (bottom row) ──────────────────────────────────────

export const ChatActionRow = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 10px",
    borderTop: "1px solid var(--separator)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>{left}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>{right}</div>
  </div>
);

const ActionBtn = ({ children, title, onClick }: { children: React.ReactNode; title?: string; onClick?: () => void }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--icon-color)",
      borderRadius: "var(--radius-control)",
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      flexShrink: 0,
      transition: "color var(--dur-fast) var(--ease-out)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-normal)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--icon-color)"; }}
  >
    {children}
  </button>
);

export const ChatFileButton = ({ onChange }: { onChange?: (file: File) => void }) => (
  <label
    title="Attach file"
    style={{
      cursor: "pointer",
      color: "var(--icon-color)",
      borderRadius: "var(--radius-control)",
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      fontWeight: 300,
      flexShrink: 0,
      lineHeight: 1,
      transition: "color var(--dur-fast) var(--ease-out)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-normal)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--icon-color)"; }}
  >
    <input
      type="file"
      style={{ display: "none" }}
      onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange?.(f); }}
    />
    +
  </label>
);

export const ChatFontBtn    = () => <ActionBtn title="Format text">Aa</ActionBtn>;
export const ChatEmojiBtn   = () => <ActionBtn title="Emoji">☺</ActionBtn>;
export const ChatMentionBtn = () => <ActionBtn title="Mention">@</ActionBtn>;
export const ChatMoreBtn    = () => <ActionBtn title="More">···</ActionBtn>;

export const ChatSendBtn = () => (
  <button
    type="submit"
    title="Send"
    style={{
      backgroundColor: "var(--color-accent-fill)",
      color: "var(--bubble-sent-text)",
      border: "none",
      borderRadius: "var(--radius-control)",
      width: 28,
      height: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
      transition: "filter var(--dur-fast) var(--ease-out)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(.92)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
  >
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  </button>
);
