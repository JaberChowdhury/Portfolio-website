/* biome-ignore-all lint/security/noDangerouslySetInnerHtml: style tag injection */
"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080808",
        overflow: "hidden",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        @keyframes gridDrift {
          0%   { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes podRun {
          0%   { left: -70px; opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 1; }
          95%  { opacity: 0; }
          100% { left: 320px; opacity: 0; }
        }
        @keyframes wordmarkReveal {
          from { opacity: 0; letter-spacing: 0.5em; transform: translateY(-6px); }
          to   { opacity: 1; letter-spacing: 0.22em; transform: translateY(0); }
        }
        @keyframes fillReveal {
          0%   { clip-path: inset(0 100% 0 0); }
          45%  { clip-path: inset(0 0% 0 0); }
          55%  { clip-path: inset(0 0% 0 0); }
          100% { clip-path: inset(0 100% 0 0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%       { opacity: 0.7;  transform: scale(1); }
        }

        .hl-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridDrift 8s linear infinite;
        }
        .hl-scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
          pointer-events: none;
        }
        .hl-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, #080808 100%);
          pointer-events: none;
        }
        .hl-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          opacity: 0.2;
        }
        .hl-corner-tl { top: 28px; left: 28px; border-top: 1px solid #fff; border-left: 1px solid #fff; }
        .hl-corner-tr { top: 28px; right: 28px; border-top: 1px solid #fff; border-right: 1px solid #fff; }
        .hl-corner-bl { bottom: 28px; left: 28px; border-bottom: 1px solid #fff; border-left: 1px solid #fff; }
        .hl-corner-br { bottom: 28px; right: 28px; border-bottom: 1px solid #fff; border-right: 1px solid #fff; }

        .hl-wordmark-wrap {
          position: relative;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 8vw, 64px);
          letter-spacing: 0.22em;
          user-select: none;
        }
        .hl-wordmark-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.85);
          animation: wordmarkReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hl-wordmark-fill {
          position: absolute;
          inset: 0;
          color: #fff;
          -webkit-text-stroke: 0;
          clip-path: inset(0 100% 0 0);
          animation: fillReveal 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.4s;
        }

        .hl-track {
          position: relative;
          width: min(320px, 60vw);
          height: 2px;
          background: rgba(255,255,255,0.08);
        }
        .hl-track::before {
          content: '';
          position: absolute;
          left: -8px; top: -3px;
          width: 8px; height: 8px;
          border-top: 1px solid rgba(255,255,255,0.2);
          border-left: 1px solid rgba(255,255,255,0.2);
        }
        .hl-track::after {
          content: '';
          position: absolute;
          right: -8px; bottom: -3px;
          width: 8px; height: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          border-right: 1px solid rgba(255,255,255,0.2);
        }
        .hl-pod {
          position: absolute;
          top: 50%; left: 0;
          transform: translateY(-50%);
          width: 60px;
          height: 2px;
          animation: podRun 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .hl-pod-trail {
          position: absolute;
          right: 100%; top: 0;
          width: 80px; height: 100%;
          background: linear-gradient(to left, rgba(255,255,255,0.25), transparent);
        }
        .hl-pod-body {
          width: 100%; height: 100%;
          background: #e8e8e8;
          box-shadow: 0 0 12px 2px rgba(255,255,255,0.6), 0 0 40px 6px rgba(255,255,255,0.15);
        }
        .hl-pod-nose {
          position: absolute;
          left: 100%; top: -1px;
          width: 0; height: 0;
          border-top: 2px solid transparent;
          border-bottom: 2px solid transparent;
          border-left: 8px solid #e8e8e8;
        }

        .hl-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #fff;
          animation: blink 1.2s ease-in-out infinite;
        }
        .hl-dot:nth-child(2) { animation-delay: 0.2s; }
        .hl-dot:nth-child(3) { animation-delay: 0.4s; }

        .hl-accent-bar { height: 1px; background: #fff; }
      `,
        }}
      />

      {/* Background grid */}
      <div className="hl-grid" />
      <div className="hl-scanline" />
      <div className="hl-vignette" />

      {/* Corner brackets */}
      <div className="hl-corner hl-corner-tl" />
      <div className="hl-corner hl-corner-tr" />
      <div className="hl-corner hl-corner-bl" />
      <div className="hl-corner hl-corner-br" />

      {/* Side accent bars */}
      <div
        style={{
          position: "absolute",
          left: 28,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          opacity: 0.1,
        }}
      >
        <div className="hl-accent-bar" style={{ width: 48 }} />
        <div className="hl-accent-bar" style={{ width: 28 }} />
        <div className="hl-accent-bar" style={{ width: 38 }} />
        <div className="hl-accent-bar" style={{ width: 18 }} />
      </div>

      {/* Center content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          zIndex: 2,
        }}
      >
        {/* Wordmark */}
        <div className="hl-wordmark-wrap">
          <span className="hl-wordmark-outline">HYPERLOOP_STUDIO</span>
          <span className="hl-wordmark-fill">HYPERLOOP_STUDIO</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: -20,
          }}
        >
          <div
            style={{
              width: 32,
              height: 1,
              background: "rgba(255,255,255,0.18)",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.28)",
              textTransform: "uppercase",
            }}
          >
            Design in Motion
          </span>
          <div
            style={{
              width: 32,
              height: 1,
              background: "rgba(255,255,255,0.18)",
            }}
          />
        </div>

        {/* Magnetic rail */}
        <div className="hl-track">
          <div className="hl-pod">
            <div className="hl-pod-trail" />
            <div className="hl-pod-body" />
            <div className="hl-pod-nose" />
          </div>
        </div>

        {/* Status dots */}
        <div style={{ display: "flex", gap: 8 }}>
          <div className="hl-dot" />
          <div className="hl-dot" />
          <div className="hl-dot" />
        </div>
      </div>
    </motion.div>
  );
}
