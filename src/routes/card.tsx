import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Phone, Mail, Globe, Linkedin, Facebook } from "lucide-react";

export const Route = createFileRoute("/card")({
  head: () => ({
    meta: [
      { title: "Vula Solutions · Business Card" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CardPage,
});

const SITE_URL = "https://vulasolutions.co.za";
const MARK_LEFT = "M160 90L0 0V416.667L160 500V90Z";
const MARK_RIGHT = "M260 90L420 0V416.667L260 500V90Z";

function VulaMark({ h = 56 }: { h?: number }) {
  const w = h * (420 / 500);
  return (
    <svg width={w} height={h} viewBox="0 0 420 500" aria-hidden="true">
      <path d={MARK_LEFT} fill="#F2F7FC" />
      <path d={MARK_RIGHT} fill="#01A1B7" />
    </svg>
  );
}

function QRWithLogo({ size }: { size: number }) {
  return (
    <div style={{ position: "relative", display: "inline-block", padding: "5px", background: "#F2F7FC", borderRadius: "6px", lineHeight: 0, flexShrink: 0 }}>
      <QRCode value={SITE_URL} size={size} bgColor="#F2F7FC" fgColor="#0B1220" level="H" style={{ display: "block" }} />
      {/* VULA mark overlay — Level H gives 30% error correction headroom */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#0B1220",
        padding: "2px 3px",
        borderRadius: "2px",
        lineHeight: 0,
      }}>
        <svg width={Math.round(size * 0.22)} height={Math.round(size * 0.26)} viewBox="0 0 420 500" aria-hidden="true">
          <path d={MARK_LEFT} fill="#F2F7FC" />
          <path d={MARK_RIGHT} fill="#01A1B7" />
        </svg>
      </div>
    </div>
  );
}

function CardPage() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        background: "#05090F",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(1,161,183,0.07) 0%, transparent 55%)", pointerEvents: "none" }} />

      {/* Scene — full width up to 460px, always centred */}
      <div
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? "Show front of card" : "Show back of card"}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
        style={{
          perspective: "1400px",
          width: "100%",
          maxWidth: "460px",
          aspectRatio: "460/272",
          cursor: "pointer",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.72s cubic-bezier(0.32, 0, 0.12, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <FrontFace />
          <BackFace />
        </div>
      </div>

      {/* Hint */}
      <p style={{ marginTop: "1rem", fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#546E88", opacity: flipped ? 0 : 0.45, transition: "opacity 0.4s", position: "relative", zIndex: 1 }}>
        Tap to flip
      </p>

      {/* Site link */}
      <a
        href={SITE_URL}
        onClick={(e) => e.stopPropagation()}
        style={{ marginTop: "0.75rem", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#01A1B7", textDecoration: "none", opacity: 0.7, position: "relative", zIndex: 1 }}
      >
        vulasolutions.co.za
      </a>
    </div>
  );
}

const faceBase: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "16px",
  border: "1px solid rgba(1,161,183,0.20)",
  background: "#0B1220",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  overflow: "hidden",
};

function TealBar() {
  return <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#01A1B7", zIndex: 2 }} />;
}

function Glow() {
  return <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 80% 20%, rgba(1,161,183,0.08) 0%, transparent 60%)" }} />;
}

function FrontFace() {
  return (
    <div style={faceBase}>
      <TealBar />
      <Glow />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,3vw,20px)" }}>
          <VulaMark h={54} />
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.9rem,6.5vw,3rem)", fontWeight: 600, letterSpacing: "0.025em", color: "#F2F7FC", lineHeight: 1 }}>
            VULA
          </span>
        </div>
        <span style={{ fontSize: "0.55rem", color: "#546E88", letterSpacing: "0.20em", textTransform: "uppercase" }}>
          vulasolutions.co.za
        </span>
      </div>
    </div>
  );
}

function BackFace() {
  return (
    <div style={{ ...faceBase, transform: "rotateY(180deg)", display: "grid", gridTemplateRows: "auto 1fr auto", padding: "clamp(14px,3.5%,22px) clamp(16px,4%,26px) clamp(12px,3%,18px)", gap: "clamp(7px,2%,11px)" }}>
      <TealBar />
      <Glow />

      {/* Header: brand left, QR top right */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <VulaMark h={18} />
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.62rem,1.9vw,0.78rem)", fontWeight: 600, letterSpacing: "0.04em", color: "#F2F7FC", lineHeight: 1.1 }}>
            VULA SOLUTIONS
            <span style={{ display: "block", fontFamily: "system-ui, sans-serif", fontSize: "clamp(0.44rem,1.3vw,0.52rem)", fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase", color: "#01A1B7", marginTop: "2px", opacity: 0.85 }}>
              Business Transformation Partner
            </span>
          </div>
        </div>
        <QRWithLogo size={40} />
      </div>

      {/* Middle: names | divider | contacts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px", alignItems: "center", position: "relative", zIndex: 1 }}>

        {/* Left: names */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(7px,2%,11px)", paddingRight: "14px", borderRight: "1px solid rgba(1,161,183,0.15)" }}>
          <Person name="Shiven Pillay" role="Founder & Managing Director" />
          <Person name="Nolene Pillay" role="Co-Founder & Director" />
        </div>

        {/* Right: contacts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4px,1.2%,6px)" }}>
          <ContactRow icon={<Phone size={8} color="#01A1B7" />} text="061 211 9960" />
          <ContactRow icon={<Mail size={8} color="#01A1B7" />} text="info@vulasolutions.co.za" />
          <ContactRow icon={<Globe size={8} color="#01A1B7" />} text="vulasolutions.co.za" />
        </div>
      </div>

      {/* Footer: socials */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "clamp(5px,1.5%,8px)", borderTop: "1px solid rgba(1,161,183,0.10)", position: "relative", zIndex: 1 }}>
        <a href="https://www.linkedin.com/company/vula-solutions/" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "clamp(0.48rem,1.4vw,0.58rem)", color: "#546E88", textDecoration: "none", letterSpacing: "0.04em" }}>
          <Linkedin size={9} color="#01A1B7" />
          LinkedIn
        </a>
        <a href="https://www.facebook.com/vulasolutions/" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "clamp(0.48rem,1.4vw,0.58rem)", color: "#546E88", textDecoration: "none", letterSpacing: "0.04em" }}>
          <Facebook size={9} color="#01A1B7" />
          Facebook
        </a>
      </div>
    </div>
  );
}

function Person({ name, role }: { name: string; role: string }) {
  return (
    <div>
      <div style={{ fontSize: "clamp(0.58rem,1.7vw,0.72rem)", fontWeight: 600, color: "#F2F7FC", lineHeight: 1.2 }}>{name}</div>
      <div style={{ fontSize: "clamp(0.44rem,1.2vw,0.55rem)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "#01A1B7", marginTop: "1px", opacity: 0.9 }}>{role}</div>
    </div>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "clamp(0.48rem,1.4vw,0.6rem)", color: "#546E88", lineHeight: 1 }}>
      {icon}
      {text}
    </div>
  );
}
