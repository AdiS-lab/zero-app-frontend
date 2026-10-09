/* ─── Message UI primitives ──────────────────────────────────────── */

export const Messages = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 2, marginTop: "auto" }} className={className} {...props}>
    {children}
  </div>
);

const AVATAR_SIZE = 40;
const AVATAR_GAP = 12;
const INDENT = AVATAR_SIZE + AVATAR_GAP;

function formatTime(ts: number): string {
  if (!ts || isNaN(ts)) return "";
  const d = new Date(ts);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

interface MessageRowProps {
  text: string;
  avatar?: string;
  username: string;
  timestamp: number;
  isOwn: boolean;
  showHeader: boolean;
}

export const MessageRow = ({ text, avatar, username, timestamp, isOwn, showHeader }: MessageRowProps) => {
  if (showHeader) {
    return (
      <div style={{ display: "flex", gap: AVATAR_GAP, marginTop: 12, paddingLeft: 16, paddingRight: 16 }}>
        {avatar
          ? <img src={avatar} alt="" style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: "var(--radius-avatar)", objectFit: "cover", flexShrink: 0 }} />
          : <div style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: "var(--radius-avatar)", background: "var(--avatar-bg)", flexShrink: 0 }} />
        }
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: isOwn ? "var(--color-accent)" : "var(--text-normal)", letterSpacing: "-0.01em" }}>
              {username}
            </span>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
              {formatTime(timestamp)}
            </span>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-normal)", lineHeight: "19px", margin: 0, wordBreak: "break-word" }}>
            {text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: INDENT + 16, paddingRight: 16, marginTop: 2 }}>
      <p style={{ fontSize: 14, color: "var(--text-normal)", lineHeight: "19px", margin: 0, wordBreak: "break-word" }}>
        {text}
      </p>
    </div>
  );
};
