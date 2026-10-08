export const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, color: "var(--text-normal)", lineHeight: 1.1 }}>
    {children}
  </h1>
);
