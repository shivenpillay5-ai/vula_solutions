export function ArticleIllustration({ section }: { section: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0B1220]">
      <Illustration section={section} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#0B1220] to-transparent" />
    </div>
  );
}

function Illustration({ section }: { section: string }) {
  switch (section) {
    case "getting-started":         return <CompassSVG />;
    case "strategy-and-leadership": return <StrategySVG />;
    case "change-management":       return <ChangeSVG />;
    case "process-improvement":     return <ProcessSVG />;
    case "artificial-intelligence": return <AiSVG />;
    case "software-and-technology": return <TechSVG />;
    case "business-growth":         return <GrowthSVG />;
    default:                        return <CompassSVG />;
  }
}

const T = "#01A1B7";   // teal
const W = "rgba(255,255,255,0.12)"; // subtle white

function CompassSVG() {
  return (
    <svg viewBox="0 0 480 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <circle cx="240" cy="80" r="64" stroke={T} strokeOpacity="0.18" strokeWidth="1" fill="none" />
      <circle cx="240" cy="80" r="48" stroke={T} strokeOpacity="0.28" strokeWidth="1" fill="none" />
      <circle cx="240" cy="80" r="6" fill={T} />
      {/* Cardinal marks */}
      {[0, 90, 180, 270].map((deg, i) => {
        const rad = (deg - 90) * Math.PI / 180;
        const ox = Math.cos(rad); const oy = Math.sin(rad);
        const r1 = 50; const r2 = 58;
        return <line key={i} x1={240 + ox*r1} y1={80 + oy*r1} x2={240 + ox*r2} y2={80 + oy*r2} stroke={T} strokeOpacity={i === 0 ? 0.9 : 0.4} strokeWidth={i === 0 ? 2 : 1} />;
      })}
      {/* North label */}
      <text x="240" y="13" textAnchor="middle" fill={T} fontSize="9" fontFamily="system-ui,sans-serif" opacity="0.85" fontWeight="600">N</text>
      {/* Needle teal (north) */}
      <polygon points="240,32 244.5,76 240,68 235.5,76" fill={T} />
      {/* Needle dim (south) */}
      <polygon points="240,128 244.5,84 240,92 235.5,84" fill="rgba(255,255,255,0.2)" />
      {/* Decorative rings far left/right */}
      <circle cx="80" cy="80" r="28" stroke={W} strokeWidth="1" fill="none" />
      <circle cx="400" cy="80" r="28" stroke={W} strokeWidth="1" fill="none" />
      <circle cx="80" cy="80" r="3" fill={W} />
      <circle cx="400" cy="80" r="3" fill={W} />
    </svg>
  );
}

function StrategySVG() {
  const rows = [[240], [200, 280], [160, 240, 320]];
  return (
    <svg viewBox="0 0 480 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Connector lines */}
      {rows[0].map(cx => rows[1].map(cx2 => <line key={`${cx}-${cx2}`} x1={cx} y1={48} x2={cx2} y2={88} stroke={T} strokeOpacity="0.2" strokeWidth="1" />))}
      {rows[1].map(cx => rows[2].map(cx2 => <line key={`${cx}-${cx2}`} x1={cx} y1={88} x2={cx2} y2={128} stroke={T} strokeOpacity="0.15" strokeWidth="1" />))}
      {/* Top node */}
      <circle cx="240" cy="48" r="14" fill={T} fillOpacity="0.15" stroke={T} strokeWidth="1.5" />
      <circle cx="240" cy="48" r="5" fill={T} />
      {/* Mid nodes */}
      {rows[1].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="88" r="11" fill={T} fillOpacity="0.10" stroke={T} strokeOpacity="0.5" strokeWidth="1" />
          <circle cx={cx} cy="88" r="4" fill={T} fillOpacity="0.6" />
        </g>
      ))}
      {/* Bottom nodes */}
      {rows[2].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="128" r="9" fill={T} fillOpacity="0.07" stroke={T} strokeOpacity="0.35" strokeWidth="1" />
          <circle cx={cx} cy="128" r="3" fill={T} fillOpacity="0.45" />
        </g>
      ))}
      {/* Side decorative lines */}
      <line x1="40" y1="56" x2="120" y2="56" stroke={W} strokeWidth="1" />
      <line x1="40" y1="68" x2="100" y2="68" stroke={W} strokeWidth="1" />
      <line x1="360" y1="56" x2="440" y2="56" stroke={W} strokeWidth="1" />
      <line x1="380" y1="68" x2="440" y2="68" stroke={W} strokeWidth="1" />
    </svg>
  );
}

function ChangeSVG() {
  return (
    <svg viewBox="0 0 480 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Before: scattered blocks */}
      {[60,82,104].map((y, i) => (
        <rect key={i} x={60 + i*8} y={y} width={32 - i*4} height={12} rx="3" fill={W} />
      ))}
      {/* Large arrow */}
      <path d="M180 80 L290 80" stroke={T} strokeWidth="2.5" strokeOpacity="0.7" />
      <polygon points="290,74 302,80 290,86" fill={T} fillOpacity="0.7" />
      {/* After: aligned blocks */}
      <rect x="320" y="60" width="80" height="12" rx="3" fill={T} fillOpacity="0.25" stroke={T} strokeOpacity="0.4" strokeWidth="1" />
      <rect x="320" y="78" width="80" height="12" rx="3" fill={T} fillOpacity="0.18" stroke={T} strokeOpacity="0.3" strokeWidth="1" />
      <rect x="320" y="96" width="80" height="12" rx="3" fill={T} fillOpacity="0.12" stroke={T} strokeOpacity="0.2" strokeWidth="1" />
      {/* Labels */}
      <text x="96" y="130" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui,sans-serif">Before</text>
      <text x="360" y="130" textAnchor="middle" fill={T} fontSize="9" fontFamily="system-ui,sans-serif" opacity="0.75">After</text>
    </svg>
  );
}

function ProcessSVG() {
  const steps = [
    { x: 80, label: "Assess" },
    { x: 200, label: "Design" },
    { x: 320, label: "Build" },
    { x: 440, label: "Scale" },
  ] as const;
  const colors = [0.3, 0.5, 0.7, 0.9];
  return (
    <svg viewBox="0 0 520 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Connecting lines */}
      {steps.slice(0, -1).map((s, i) => (
        <g key={i}>
          <line x1={s.x + 44} y1="80" x2={steps[i+1].x - 44} y2="80" stroke={T} strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points={`${steps[i+1].x - 46},76 ${steps[i+1].x - 38},80 ${steps[i+1].x - 46},84`} fill={T} fillOpacity="0.4" />
        </g>
      ))}
      {/* Step boxes */}
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x - 44} y="62" width="88" height="36" rx="8" fill={T} fillOpacity={colors[i] * 0.12} stroke={T} strokeOpacity={colors[i] * 0.6} strokeWidth="1.5" />
          <text x={s.x} y="84" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui,sans-serif" opacity={0.5 + colors[i] * 0.5} fontWeight="500">{s.label}</text>
        </g>
      ))}
      {/* Step numbers */}
      {steps.map((s, i) => (
        <text key={i} x={s.x} y="54" textAnchor="middle" fill={T} fontSize="9" fontFamily="system-ui,sans-serif" opacity={colors[i]}>0{i+1}</text>
      ))}
    </svg>
  );
}

function AiSVG() {
  const layers = [
    [{ x: 120, y: 50 }, { x: 120, y: 80 }, { x: 120, y: 110 }],
    [{ x: 210, y: 44 }, { x: 210, y: 70 }, { x: 210, y: 96 }, { x: 210, y: 122 }],
    [{ x: 300, y: 55 }, { x: 300, y: 85 }, { x: 300, y: 115 }],
    [{ x: 380, y: 65 }, { x: 380, y: 95 }],
  ];
  return (
    <svg viewBox="0 0 480 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Connections */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.map((n1, i) =>
          layers[li+1].map((n2, j) => (
            <line key={`${li}-${i}-${j}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
              stroke={T} strokeOpacity={0.08 + (i + j) % 3 * 0.06} strokeWidth="1" />
          ))
        )
      )}
      {/* Nodes */}
      {layers.map((layer, li) =>
        layer.map((n, i) => {
          const isLast = li === layers.length - 1;
          const isFirst = li === 0;
          return (
            <g key={`${li}-${i}`}>
              <circle cx={n.x} cy={n.y} r={isLast ? 10 : 8} fill={T} fillOpacity={isLast ? 0.25 : isFirst ? 0.12 : 0.18} stroke={T} strokeOpacity={isLast ? 0.8 : 0.45} strokeWidth="1.5" />
              {isLast && <circle cx={n.x} cy={n.y} r="4" fill={T} />}
            </g>
          );
        })
      )}
      {/* Side labels */}
      <text x="60" y="83" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="system-ui,sans-serif">Input</text>
      <text x="430" y="83" textAnchor="middle" fill={T} fontSize="8" fontFamily="system-ui,sans-serif" opacity="0.6">Output</text>
    </svg>
  );
}

function TechSVG() {
  const lines = [
    { y: 62, w: 100, indent: 0, color: T, opacity: 0.7 },
    { y: 74, w: 70, indent: 16, color: "rgba(255,255,255,0.5)", opacity: 1 },
    { y: 86, w: 90, indent: 16, color: "rgba(255,255,255,0.3)", opacity: 1 },
    { y: 98, w: 55, indent: 32, color: T, opacity: 0.5 },
    { y: 110, w: 80, indent: 16, color: "rgba(255,255,255,0.25)", opacity: 1 },
    { y: 122, w: 60, indent: 0, color: T, opacity: 0.35 },
  ];
  return (
    <svg viewBox="0 0 480 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Monitor frame */}
      <rect x="140" y="24" width="200" height="128" rx="6" fill="none" stroke={W} strokeWidth="1.5" />
      <rect x="140" y="24" width="200" height="20" rx="6" fill="rgba(255,255,255,0.04)" />
      {/* Titlebar dots */}
      <circle cx="156" cy="34" r="3" fill="rgba(255,255,255,0.2)" />
      <circle cx="167" cy="34" r="3" fill="rgba(255,255,255,0.15)" />
      <circle cx="178" cy="34" r="3" fill={T} fillOpacity="0.4" />
      {/* Code lines */}
      {lines.map((l, i) => (
        <rect key={i} x={148 + l.indent} y={l.y} width={l.w} height={7} rx="2" fill={l.color} fillOpacity={l.opacity * 0.6} />
      ))}
      {/* Side decorative elements */}
      <rect x="40" y="56" width="60" height="6" rx="2" fill={W} />
      <rect x="40" y="68" width="44" height="6" rx="2" fill={W} />
      <rect x="40" y="80" width="52" height="6" rx="2" fill={W} />
      <rect x="380" y="56" width="60" height="6" rx="2" fill={W} />
      <rect x="390" y="68" width="50" height="6" rx="2" fill={W} />
    </svg>
  );
}

function GrowthSVG() {
  const bars = [
    { x: 100, h: 40 },
    { x: 160, h: 58 },
    { x: 220, h: 72 },
    { x: 280, h: 90 },
    { x: 340, h: 112 },
  ];
  const baseline = 130;
  return (
    <svg viewBox="0 0 480 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((frac, i) => (
        <line key={i} x1="80" y1={baseline - 120 * frac} x2="400" y2={baseline - 120 * frac} stroke={W} strokeWidth="1" strokeDasharray="3 4" />
      ))}
      {/* Bars */}
      {bars.map((b, i) => (
        <g key={i}>
          <rect x={b.x - 20} y={baseline - b.h} width="40" height={b.h} rx="4"
            fill={T} fillOpacity={0.12 + i * 0.08} stroke={T} strokeOpacity={0.3 + i * 0.14} strokeWidth="1" />
        </g>
      ))}
      {/* Trend line */}
      <polyline
        points={bars.map(b => `${b.x},${baseline - b.h}`).join(" ")}
        fill="none" stroke={T} strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Dots on trend line */}
      {bars.map((b, i) => (
        <circle key={i} cx={b.x} cy={baseline - b.h} r="3.5" fill={T} fillOpacity={i === bars.length - 1 ? 1 : 0.6} />
      ))}
      {/* Arrow at end */}
      <line x1="340" y1={baseline - 112} x2="380" y2={baseline - 130} stroke={T} strokeWidth="2" strokeOpacity="0.5" />
      <polygon points={`380,${baseline-130} 370,${baseline-123} 373,${baseline-118}`} fill={T} fillOpacity="0.5" />
      {/* Baseline */}
      <line x1="75" y1={baseline} x2="410" y2={baseline} stroke={W} strokeWidth="1" />
    </svg>
  );
}
