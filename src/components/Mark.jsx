// Símbolo da Gabbe redesenhado em SVG a partir das medidas de gabbe-kit/01-marca/MARCA.md
// (G bege entrelaçado a um anel terracota). Cada traço usa pathLength=1 para animar o desenho.

const P = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
};

const arc = (cx, cy, r, from, to) => {
  const [x1, y1] = P(cx, cy, r, from);
  const [x2, y2] = P(cx, cy, r, to);
  const large = to - from > 180 ? 1 : 0;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} 0 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

const W = 58;
const G_ARC = arc(457, 476, 210, 44, 315);
const G_STEM = 'M594.5 487 L594.5 645';
const R_ARC = arc(620, 603, 212, -128, 135);
const R_STEM = 'M484.5 772 L484.5 611';

export default function Mark({ g = '#E9DDD1', ring = '#AD6D4A', className = '', title = 'Símbolo Gabbe', drawRef }) {
  const common = { fill: 'none', strokeWidth: W, pathLength: 1, strokeLinecap: 'butt' };
  return (
    <svg
      viewBox="200 220 680 640"
      className={className}
      role="img"
      aria-label={title}
      ref={drawRef}
    >
      <path d={R_STEM} stroke={ring} strokeWidth={57} {...{ fill: 'none', pathLength: 1 }} data-draw />
      <path d={R_ARC} stroke={ring} {...common} data-draw />
      <path d={G_ARC} stroke={g} {...common} data-draw />
      <path d={G_STEM} stroke={g} strokeWidth={57} fill="none" pathLength={1} data-draw />
    </svg>
  );
}
