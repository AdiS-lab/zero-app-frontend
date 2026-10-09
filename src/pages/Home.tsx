import { useState } from "react";
import { Link } from "@tanstack/react-router";
import api from "../api/axios";
export default function Home() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const checkConnection = async () => {
    try {
      await api.get("/ping");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const dotColor =
    status === "success" ? "#4ade80" : status === "error" ? "#f87171" : "var(--color-base-60)";

  return (
    <section className="landing-hero theme-dark">
      {/* Background image */}
      <img
        className="landing-image"
        src="/chrome_KN5iZZBISZ.png"
        alt=""
      />

      {/* Scanlines */}
      <div className="landing-scanlines" />

      {/* Scrim — bottom-left legibility */}
      <div className="landing-scrim" />

      {/* Wordmark */}
      <span className="landing-wordmark">Zero</span>

      {/* Connection dot — top-right */}
      <button
        onClick={checkConnection}
        title="Check connection"
        style={{
          position: "absolute",
          top: 28,
          right: 28,
          zIndex: 1,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: dotColor,
            display: "block",
            transition: "background-color 400ms",
          }}
        />
      </button>

      {/* Content — bottom-left */}
      <div className="landing-content">
        <h1 className="landing-headline">
          <span style={{ color: "var(--text-normal)" }}>Chat freely.</span>
          <br />
          <span style={{ color: "var(--text-muted)" }}>Connect instantly.</span>
        </h1>

        <div className="cta-row" style={{ display: "flex", gap: 12, marginTop: 32, alignItems: "center" }}>
          <Link to="/register" className="btn btn-solid btn-lg">
            Sign up <span className="arrow">→</span>
          </Link>
          <Link to="/login" className="btn btn-outline btn-lg">
            Log in
          </Link>
          <a
            href="https://github.com/AdiS-lab/zero-app-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
            style={{ gap: 8 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.58l-.02-2.04c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
