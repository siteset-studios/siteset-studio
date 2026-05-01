import { Award, Star, TrendingUp, Users } from "lucide-react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { type MouseEvent, useEffect, useRef, useState } from "react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  sublabel: string;
  color: string;
  glow: string;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: 50,
    suffix: "+",
    prefix: "",
    label: "Happy Clients",
    sublabel: "Across India",
    color: "oklch(0.62 0.26 265)",
    glow: "oklch(0.62 0.26 265 / 0.4)",
  },
  {
    icon: TrendingUp,
    value: 50,
    suffix: "L+",
    prefix: "₹",
    label: "Revenue Generated",
    sublabel: "For Our Clients",
    color: "oklch(0.72 0.18 145)",
    glow: "oklch(0.72 0.18 145 / 0.4)",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "★",
    prefix: "",
    label: "Average Rating",
    sublabel: "From Verified Reviews",
    color: "oklch(0.78 0.22 75)",
    glow: "oklch(0.78 0.22 75 / 0.4)",
  },
  {
    icon: Award,
    value: 100,
    suffix: "%",
    prefix: "",
    label: "Client Satisfaction",
    sublabel: "Guaranteed",
    color: "oklch(0.68 0.22 340)",
    glow: "oklch(0.68 0.22 340 / 0.4)",
  },
];

function CountUp({
  value,
  prefix,
  suffix,
  color,
  glow,
}: {
  value: number;
  prefix: string;
  suffix: string;
  color: string;
  glow: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          const display =
            value % 1 !== 0 ? latest.toFixed(1) : Math.round(latest).toString();
          ref.current.textContent = `${prefix}${display}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [isInView, value, prefix, suffix, motionVal]);

  return (
    <span
      ref={ref}
      className="font-display font-black tabular-nums"
      style={{
        fontSize: "clamp(2.8rem, 6vw, 5rem)",
        lineHeight: 1,
        color,
        textShadow: `0 0 40px ${glow}, 0 0 80px ${glow}`,
      }}
    >
      {prefix}0{suffix}
    </span>
  );
}

function StatCard3D({ stat, index }: { stat: StatItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawRotX = useTransform(mouseY, [-60, 60], [8, -8]);
  const rawRotY = useTransform(mouseX, [-60, 60], [-8, 8]);
  const rotateX = useSpring(rawRotX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotY, { stiffness: 200, damping: 20 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  const statColor = stat.color.replace(")", " / 0.2)");
  const borderColor = stat.color.replace(")", " / 0.25)");

  return (
    <motion.div
      ref={cardRef}
      data-ocid={`stats.item.${index + 1}`}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      className="relative group cursor-default"
    >
      {/* Outer depth glow */}
      <div
        className="absolute -inset-2 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${stat.glow.replace("0.4)", "0.25)")}, transparent 70%)`,
          filter: "blur(12px)",
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? `0 20px 50px -10px ${stat.glow}, 0 0 0 1px ${borderColor}`
            : `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${borderColor}`,
          background: "oklch(0.12 0.04 265 / 0.6)",
          border: `1px solid ${borderColor}`,
          backdropFilter: "blur(20px)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden"
        whileHover={{ scale: 1.06, y: -6 }}
      >
        {/* Card glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${statColor} 0%, transparent 70%)`,
          }}
        />

        {/* Floating number particles background */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            aria-hidden="true"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: static decorative
                key={i}
                className="absolute font-display font-black text-xs select-none"
                style={{
                  color: stat.color,
                  opacity: 0.15,
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                animate={{ y: [-10, -30], opacity: [0.15, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.4,
                }}
              >
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </motion.div>
            ))}
          </div>
        )}

        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
          style={{
            background: statColor,
            border: `1px solid ${borderColor}`,
            transform: "translateZ(20px)",
          }}
          animate={{
            boxShadow: [
              `0 0 0px ${stat.glow}`,
              `0 0 20px ${stat.glow}`,
              `0 0 0px ${stat.glow}`,
            ],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2.5 + index * 0.3,
            ease: "easeInOut",
          }}
        >
          <stat.icon
            className="w-6 h-6"
            style={{ color: stat.color }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Number */}
        <div
          className="relative z-10 mb-2"
          style={{ transform: "translateZ(30px)" }}
        >
          <CountUp
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            color={stat.color}
            glow={stat.glow}
          />
        </div>

        {/* Labels */}
        <div
          className="relative z-10"
          style={{ transform: "translateZ(10px)" }}
        >
          <p className="font-display font-bold text-foreground text-sm leading-tight">
            {stat.label}
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">
            {stat.sublabel}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section
      id="stats"
      data-ocid="stats.section"
      className="relative py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.08 0.04 265) 0%, oklch(0.05 0.02 265) 40%, oklch(0.1 0.06 265) 100%)",
      }}
    >
      {/* Background glow orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, oklch(0.62 0.26 265 / 0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 50%, oklch(0.68 0.22 340 / 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.6 0.23 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.6 0.23 265) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span
            className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ boxShadow: "0 0 8px oklch(0.58 0.22 265 / 0.8)" }}
            />
            Our Numbers
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Trusted by{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              50+ Businesses
            </span>
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Real results. Real clients. Real growth across India.
          </p>
        </motion.div>

        {/* Stats Grid — 3D cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard3D key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom badge */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm"
            style={{
              background: "oklch(0.62 0.26 265 / 0.1)",
              border: "1px solid oklch(0.62 0.26 265 / 0.2)",
            }}
          >
            <span className="text-foreground/70">🇮🇳</span>
            <span className="text-muted-foreground font-medium">
              Serving local businesses all across India
            </span>
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
              style={{ boxShadow: "0 0 8px oklch(0.72 0.18 145 / 0.8)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
