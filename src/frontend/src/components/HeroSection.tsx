import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, Smartphone } from "lucide-react";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

const trustItems = [
  { icon: Clock, label: "Fast Delivery", desc: "2–7 Days" },
  { icon: Smartphone, label: "Starting from", desc: "₹3,999" },
];

// 3D floating geometric shape definitions
const shapes = [
  // Large blurred orb — far back layer (slow)
  {
    id: "orb1",
    type: "orb",
    size: 480,
    x: "62%",
    y: "-8%",
    depthX: 22,
    depthY: 14,
    cls: "floating-shape-slow",
    opacity: 0.18,
    blur: 90,
    color: "oklch(0.62 0.26 265 / 0.6)",
    initDelay: 0.2,
  },
  // Medium orb bottom-left (mid layer)
  {
    id: "orb2",
    type: "orb",
    size: 320,
    x: "-8%",
    y: "50%",
    depthX: 38,
    depthY: 22,
    cls: "floating-shape-slow",
    opacity: 0.12,
    blur: 60,
    color: "oklch(0.55 0.2 265 / 0.45)",
    initDelay: 0.5,
  },
  // Cube wireframe — close layer
  {
    id: "cube1",
    type: "cube",
    size: 110,
    x: "74%",
    y: "52%",
    depthX: 70,
    depthY: 44,
    depthRot: 18,
    cls: "floating-shape",
    opacity: 0.45,
    blur: 0,
    initDelay: 0.7,
  },
  // Ring — close layer
  {
    id: "ring1",
    type: "ring",
    size: 130,
    x: "14%",
    y: "18%",
    depthX: 90,
    depthY: 55,
    depthRot: 22,
    cls: "floating-shape-fast",
    opacity: 0.38,
    blur: 0,
    initDelay: 0.9,
  },
  // Small cube — foreground
  {
    id: "cube2",
    type: "cube",
    size: 70,
    x: "52%",
    y: "78%",
    depthX: 110,
    depthY: 70,
    depthRot: 28,
    cls: "floating-shape-fast",
    opacity: 0.35,
    blur: 0,
    initDelay: 1.1,
  },
  // Tiny orb accent
  {
    id: "orb3",
    type: "orb",
    size: 80,
    x: "38%",
    y: "10%",
    depthX: 100,
    depthY: 62,
    cls: "floating-shape",
    opacity: 0.22,
    blur: 20,
    color: "oklch(0.7 0.22 265 / 0.5)",
    initDelay: 1.2,
  },
  // Ring bottom-right
  {
    id: "ring2",
    type: "ring",
    size: 90,
    x: "83%",
    y: "20%",
    depthX: 80,
    depthY: 50,
    depthRot: 16,
    cls: "floating-shape-slow",
    opacity: 0.3,
    blur: 0,
    initDelay: 1.4,
  },
];

const headlineWords = [
  { text: "Websites", highlight: false },
  { text: "that", highlight: false },
  { text: "turn", highlight: false },
  { text: "visitors", highlight: true },
  { text: "into", highlight: true },
  { text: "customers", highlight: true },
];

const gradientTextStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, oklch(0.82 0.18 265), oklch(0.62 0.26 265))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// Renders a single 3D wireframe cube via SVG
function WireframeCube({
  size,
  opacity,
}: {
  size: number;
  opacity: number;
}) {
  const s = size;
  const d = s * 0.32; // depth offset
  const strokeColor = "oklch(0.72 0.22 265)";
  const pts = {
    // front face
    tfl: [s * 0.08, s * 0.08],
    tfr: [s * 0.68, s * 0.08],
    bfl: [s * 0.08, s * 0.68],
    bfr: [s * 0.68, s * 0.68],
    // back face (offset)
    tbl: [s * 0.08 + d, s * 0.08 - d * 0.6],
    tbr: [s * 0.68 + d, s * 0.08 - d * 0.6],
    bbl: [s * 0.08 + d, s * 0.68 - d * 0.6],
    bbr: [s * 0.68 + d, s * 0.68 - d * 0.6],
  };
  const lines = [
    [pts.tfl, pts.tfr],
    [pts.tfr, pts.bfr],
    [pts.bfr, pts.bfl],
    [pts.bfl, pts.tfl],
    [pts.tbl, pts.tbr],
    [pts.tbr, pts.bbr],
    [pts.bbr, pts.bbl],
    [pts.bbl, pts.tbl],
    [pts.tfl, pts.tbl],
    [pts.tfr, pts.tbr],
    [pts.bfr, pts.bbr],
    [pts.bfl, pts.bbl],
  ];
  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      {lines.map(([a, b], i) => (
        <line
          // biome-ignore lint/suspicious/noArrayIndexKey: static geometry
          key={i}
          x1={a[0]}
          y1={a[1]}
          x2={b[0]}
          y2={b[1]}
          stroke={strokeColor}
          strokeWidth={size > 80 ? 1.2 : 0.9}
          strokeOpacity={0.75}
        />
      ))}
    </svg>
  );
}

// Renders a 3D torus-like ring via SVG ellipses
function RingShape({
  size,
  opacity,
}: {
  size: number;
  opacity: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const rx = size * 0.42;
  const ry = size * 0.16;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Outer ellipse */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        stroke="oklch(0.72 0.22 265)"
        strokeWidth={size > 100 ? 1.5 : 1.1}
        strokeOpacity={0.7}
      />
      {/* Inner ellipse */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx * 0.6}
        ry={ry * 0.6}
        stroke="oklch(0.62 0.26 265)"
        strokeWidth={size > 100 ? 1.0 : 0.8}
        strokeOpacity={0.45}
      />
      {/* Vertical ring arc */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={ry}
        ry={rx}
        stroke="oklch(0.68 0.2 265)"
        strokeWidth={size > 100 ? 0.9 : 0.7}
        strokeOpacity={0.35}
        strokeDasharray="3 4"
      />
    </svg>
  );
}

type ShapeConfig = (typeof shapes)[number];

// Maps shape index to pre-computed motion values (must be called at top level)
interface ShapeMotion {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotX: MotionValue<number>;
  rotY: MotionValue<number>;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const shapeY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Build depth params per shape (fallback depthRot = 0 for orbs)
  const deps = shapes.map((s) => ({
    dX: "depthX" in s ? (s.depthX as number) : 30,
    dY: "depthY" in s ? (s.depthY as number) : 18,
    dR: "depthRot" in s ? (s.depthRot as number) : 0,
  }));

  // 7 shapes — declare all transform hooks at top-level (Rules of Hooks)
  const sx0 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[0].dX, deps[0].dX] as [number, number],
  );
  const sy0 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [-deps[0].dY, deps[0].dY] as [number, number],
  );
  const srx0 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [deps[0].dR, -deps[0].dR] as [number, number],
  );
  const sry0 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[0].dR, deps[0].dR] as [number, number],
  );

  const sx1 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[1].dX, deps[1].dX] as [number, number],
  );
  const sy1 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [-deps[1].dY, deps[1].dY] as [number, number],
  );
  const srx1 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [deps[1].dR, -deps[1].dR] as [number, number],
  );
  const sry1 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[1].dR, deps[1].dR] as [number, number],
  );

  const sx2 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[2].dX, deps[2].dX] as [number, number],
  );
  const sy2 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [-deps[2].dY, deps[2].dY] as [number, number],
  );
  const srx2 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [deps[2].dR, -deps[2].dR] as [number, number],
  );
  const sry2 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[2].dR, deps[2].dR] as [number, number],
  );

  const sx3 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[3].dX, deps[3].dX] as [number, number],
  );
  const sy3 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [-deps[3].dY, deps[3].dY] as [number, number],
  );
  const srx3 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [deps[3].dR, -deps[3].dR] as [number, number],
  );
  const sry3 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[3].dR, deps[3].dR] as [number, number],
  );

  const sx4 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[4].dX, deps[4].dX] as [number, number],
  );
  const sy4 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [-deps[4].dY, deps[4].dY] as [number, number],
  );
  const srx4 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [deps[4].dR, -deps[4].dR] as [number, number],
  );
  const sry4 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[4].dR, deps[4].dR] as [number, number],
  );

  const sx5 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[5].dX, deps[5].dX] as [number, number],
  );
  const sy5 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [-deps[5].dY, deps[5].dY] as [number, number],
  );
  const srx5 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [deps[5].dR, -deps[5].dR] as [number, number],
  );
  const sry5 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[5].dR, deps[5].dR] as [number, number],
  );

  const sx6 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[6].dX, deps[6].dX] as [number, number],
  );
  const sy6 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [-deps[6].dY, deps[6].dY] as [number, number],
  );
  const srx6 = useTransform(
    springY,
    [-1, 1] as [number, number],
    [deps[6].dR, -deps[6].dR] as [number, number],
  );
  const sry6 = useTransform(
    springX,
    [-1, 1] as [number, number],
    [-deps[6].dR, deps[6].dR] as [number, number],
  );

  const shapeMotion: ShapeMotion[] = [
    { x: sx0, y: sy0, rotX: srx0, rotY: sry0 },
    { x: sx1, y: sy1, rotX: srx1, rotY: sry1 },
    { x: sx2, y: sy2, rotX: srx2, rotY: sry2 },
    { x: sx3, y: sy3, rotX: srx3, rotY: sry3 },
    { x: sx4, y: sy4, rotX: srx4, rotY: sry4 },
    { x: sx5, y: sy5, rotX: srx5, rotY: sry5 },
    { x: sx6, y: sy6, rotX: srx6, rotY: sry6 },
  ];

  function scrollToServices() {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToContact() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  function renderShape(s: ShapeConfig) {
    if (s.type === "cube") {
      return <WireframeCube size={s.size} opacity={s.opacity} />;
    }
    if (s.type === "ring") {
      return <RingShape size={s.size} opacity={s.opacity} />;
    }
    // orb
    return null;
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* === Layer 1: Deep gradient bg (parallax slow) === */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse 120% 90% at 70% 50%, oklch(0.13 0.07 265) 0%, oklch(0.07 0.02 265) 55%, oklch(0.05 0.01 265) 100%)",
        }}
        aria-hidden="true"
      />

      {/* === Layer 2: Animated mesh of radial glows === */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 65% 45% at 72% 38%, oklch(0.58 0.24 265 / 0.25) 0%, transparent 65%)",
            "radial-gradient(ellipse 45% 35% at 20% 70%, oklch(0.45 0.18 280 / 0.14) 0%, transparent 65%)",
            "radial-gradient(ellipse 30% 25% at 50% 15%, oklch(0.55 0.2 265 / 0.1) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* === Layer 3: Animated dot/grid overlay (parallax mid) === */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: gridY }}
        aria-hidden="true"
      >
        {/* Fine dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.72 0.18 265) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Large grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.62 0.22 265 / 0.8) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.22 265 / 0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* === Layer 4: 3D Floating Geometric Shapes (parallax fast) === */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: shapeY }}
        aria-hidden="true"
      >
        {shapes.map((s, i) => {
          const mv = shapeMotion[i];
          const isOrb = s.type === "orb";
          return (
            <motion.div
              key={s.id}
              className={`absolute ${s.cls}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: s.opacity, scale: 1 }}
              transition={{
                delay: s.initDelay,
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: s.size,
                height: s.size,
                left: s.x,
                top: s.y,
                filter: s.blur
                  ? `blur(${s.blur}px)`
                  : isOrb
                    ? "blur(0px)"
                    : "blur(0px)",
                ...(isOrb
                  ? {
                      borderRadius: "50%",
                      background: `radial-gradient(circle at 35% 35%, ${"color" in s ? s.color : "oklch(0.62 0.24 265 / 0.5)"}, oklch(0.4 0.16 265 / 0.05))`,
                      boxShadow: "inset 0 0 60px oklch(0.6 0.23 265 / 0.12)",
                      border: "1px solid oklch(0.62 0.22 265 / 0.15)",
                    }
                  : {}),
                x: mv.x,
                y: mv.y,
                rotateX: mv.rotX,
                rotateY: mv.rotY,
              }}
            >
              {!isOrb && renderShape(s)}
            </motion.div>
          );
        })}
      </motion.div>

      {/* === Layer 5: Edge vignette === */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, oklch(0.05 0.01 265 / 0.7) 100%)",
        }}
      />

      {/* === Main Content === */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-7"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-body text-muted-foreground border border-primary/20"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            style={{ boxShadow: "0 0 8px oklch(0.58 0.22 265 / 0.9)" }}
          />
          Digital Agency for Local Businesses
          <span className="opacity-40">•</span>
          <span className="text-primary font-semibold">India 🇮🇳</span>
        </motion.div>

        {/* Staggered word headline */}
        <h1
          className="font-display font-extrabold leading-[1.07] tracking-tight text-balance-hero"
          style={{ fontSize: "clamp(2.6rem, 7.5vw, 5.6rem)" }}
          data-ocid="hero.headline"
          aria-label="Websites that turn visitors into customers"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={`${word.text}-${i}`}
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.22 + i * 0.09,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.2em]"
              style={word.highlight ? gradientTextStyle : {}}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88, duration: 0.65, ease: "easeOut" }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          data-ocid="hero.subheading"
        >
          We help local businesses across India grow with fast, modern and
          high-converting websites — built to bring more clients through your
          door.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.02, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              size="lg"
              onClick={scrollToContact}
              data-ocid="hero.get_demo_button"
              className="glow-btn font-display font-bold text-base px-9 py-5 h-auto rounded-xl transition-smooth gradient-primary text-foreground"
              style={{
                boxShadow:
                  "0 0 36px oklch(0.58 0.24 265 / 0.5), 0 4px 20px oklch(0.58 0.24 265 / 0.3)",
              }}
            >
              Get Free Demo
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a
              href="https://wa.me/919330138050?text=Hi%20Siteset%20Studio!"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.whatsapp_button"
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="font-display font-bold text-base px-9 py-5 h-auto rounded-xl transition-smooth border bg-transparent text-foreground flex items-center gap-2"
                style={{ borderColor: "oklch(0.55 0.2 155 / 0.4)" }}
              >
                <MessageCircle
                  className="w-5 h-5"
                  style={{ color: "#25D366" }}
                  aria-hidden="true"
                />
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-6 mt-1"
          data-ocid="hero.trust_indicators"
        >
          {trustItems.map(({ icon: Icon, label, desc }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25 + idx * 0.12, duration: 0.5 }}
              className="flex items-center gap-2.5 text-sm text-muted-foreground group"
              data-ocid={`hero.trust_item.${idx + 1}`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth"
                style={{
                  background: "oklch(0.58 0.22 265 / 0.12)",
                  border: "1px solid oklch(0.58 0.22 265 / 0.25)",
                  boxShadow: "0 0 12px oklch(0.58 0.22 265 / 0.1)",
                }}
              >
                <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-body font-semibold text-foreground/80 text-xs leading-tight">
                  {label}
                </span>
                <span className="font-display font-bold text-primary text-sm leading-tight">
                  {desc}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-2"
        onClick={scrollToServices}
        aria-label="Scroll to services"
      >
        <span className="text-xs text-muted-foreground font-body tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="relative w-5 h-9 rounded-full border border-border/30 flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.8,
              ease: "easeInOut",
            }}
            style={{ boxShadow: "0 0 6px oklch(0.58 0.22 265 / 0.8)" }}
          />
        </div>
      </motion.button>
    </section>
  );
}
