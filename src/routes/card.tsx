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

function CardPage() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-10"
      style={{ background: "#05090F" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(1,161,183,0.07) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* Scene */}
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          perspective: "1400px",
          width: "min(480px, 92vw)",
          aspectRatio: "480/284",
          cursor: "pointer",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
          position: "relative",
          zIndex: 1,
        }}
        aria-label={flipped ? "Show front of card" : "Show back of card"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
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
          {/* FRONT */}
          <CardFace side="front" />

          {/* BACK */}
          <CardFace side="back" />
        </div>
      </div>

      {/* Flip hint */}
      <p
        style={{
          marginTop: "1.25rem",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#546E88",
          opacity: flipped ? 0 : 0.5,
          transition: "opacity 0.4s",
          position: "relative",
          zIndex: 1,
        }}
      >
        Tap to flip
      </p>

      {/* Link to site */}
      <a
        href={SITE_URL}
        style={{
          marginTop: "1rem",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#01A1B7",
          textDecoration: "none",
          opacity: 0.7,
          position: "relative",
          zIndex: 1,
        }}
      >
        vulasolutions.co.za
      </a>
    </div>
  );
}

function CardFace({ side }: { side: "front" | "back" }) {
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "18px",
    border: "1px solid rgba(1,161,183,0.20)",
    background: "#0B1220",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
  };

  if (side === "front") {
    return (
      <div style={base}>
        <TealBar />
        <Glow />
        {/* Centred logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <VulaMark h={58} />
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem,7vw,3.2rem)", fontWeight: 600, letterSpacing: "0.025em", color: "#F2F7FC", lineHeight: 1 }}>
              VULA
            </span>
          </div>
          <span style={{ fontSize: "0.58rem", color: "#546E88", letterSpacing: "0.20em", textTransform: "uppercase" }}>
            vulasolutions.co.za
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...base, transform: "rotateY(180deg)", display: "grid", gridTemplateRows: "auto 1fr auto", padding: "clamp(16px,4%,24px) clamp(18px,5%,30px) clamp(14px,3.5%,20px)", gap: "clamp(8px,2%,12px)" }}>
      <TealBar />
      <Glow />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
        <VulaMark h={20} />
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", color: "#F2F7FC", lineHeight: 1.1 }}>
          VULA SOLUTIONS
          <span style={{ display: "block", fontFamily: "system-ui, sans-serif", fontSize: "0.52rem", fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: "#01A1B7", marginTop: "2px", opacity: 0.85 }}>
            Business Transformation Partner
          </span>
        </div>
      </div>

      {/* Middle: people + contacts + QR */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "0 12px", alignItems: "center", position: "relative", zIndex: 1 }}>

        {/* People */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingRight: "12px", borderRight: "1px solid rgba(1,161,183,0.12)" }}>
          <Person name="Shiven Pillay" role="Founder & Managing Director" />
          <Person name="Nolene Pillay" role="Co-Founder & Director" />
        </div>

        {/* Contacts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <ContactRow icon={<Phone size={9} color="#01A1B7" />} text="061 211 9960" />
          <ContactRow icon={<Mail size={9} color="#01A1B7" />} text="info@vulasolutions.co.za" />
          <ContactRow icon={<Globe size={9} color="#01A1B7" />} text="vulasolutions.co.za" />
        </div>

        {/* QR code */}
        <div style={{ padding: "5px", background: "#F2F7FC", borderRadius: "6px", flexShrink: 0 }}>
          <QRCode value={SITE_URL} size={52} bgColor="#F2F7FC" fgColor="#0B1220" level="M" style={{ display: "block" }} />
        </div>
      </div>

      {/* Footer: socials */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "clamp(5px,1.5%,8px)", borderTop: "1px solid rgba(1,161,183,0.10)", position: "relative", zIndex: 1 }}>
        <SocialItem icon={<Linkedin size={9} color="#01A1B7" />} label="LinkedIn" />
        <SocialItem icon={<Facebook size={9} color="#01A1B7" />} label="Facebook" />
      </div>
    </div>
  );
}

function TealBar() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: "linear-gradient(90deg, #01A1B7 0%, rgba(1,161,183,0.3) 100%)",
        borderRadius: "18px 18px 0 0", zIndex: 2,
      }}
    />
  );
}

function Glow() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 80% 20%, rgba(1,161,183,0.08) 0%, transparent 60%)",
      }}
    />
  );
}

function Person({ name, role }: { name: string; role: string }) {
  return (
    <div>
      <div style={{ fontSize: "clamp(0.6rem,1.8vw,0.76rem)", fontWeight: 600, color: "#F2F7FC", lineHeight: 1.2 }}>{name}</div>
      <div style={{ fontSize: "clamp(0.47rem,1.3vw,0.58rem)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "#01A1B7", marginTop: "1px", opacity: 0.9 }}>{role}</div>
    </div>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "clamp(0.5rem,1.5vw,0.64rem)", color: "#546E88", lineHeight: 1 }}>
      {icon}
      {text}
    </div>
  );
}

function SocialItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.58rem", color: "#546E88", letterSpacing: "0.04em" }}>
      {icon}
      {label}
    </div>
  );
}
