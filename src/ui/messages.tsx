/* ─── Message UI primitives ──────────────────────────────────────── */

export const Messages = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col w-full ${className ?? ""}`} style={{ gap: 6 }} {...props}>
    {children}
  </div>
);

const avatarStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
};

const bubbleBase: React.CSSProperties = {
  borderRadius: 12,
  padding: "10px 16px",
  fontSize: 14,
  lineHeight: 1.55,
  maxWidth: 360,
};

// Sent by current user — right-aligned, avatar on right
export const MessageBubble = ({
  children,
  className,
  imgId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { imgId?: string }) => (
  <div
    className={`flex items-end self-end ${className ?? ""}`}
    style={{ gap: 10 }}
    {...props}
  >
    <div style={{ ...bubbleBase, backgroundColor: "var(--interactive-accent)", color: "var(--text-on-accent)" }}>
      {children}
    </div>
    {imgId && <img src={imgId} alt="" style={avatarStyle} />}
  </div>
);

// Received from others — left-aligned, avatar on left
export const OtherMessageBubble = ({
  children,
  className,
  imgId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { imgId?: string }) => (
  <div
    className={`flex items-end self-start ${className ?? ""}`}
    style={{ gap: 10 }}
    {...props}
  >
    {imgId && <img src={imgId} alt="" style={avatarStyle} />}
    <div style={{ ...bubbleBase, backgroundColor: "var(--background-secondary)", color: "var(--text-normal)" }}>
      {children}
    </div>
  </div>
);
