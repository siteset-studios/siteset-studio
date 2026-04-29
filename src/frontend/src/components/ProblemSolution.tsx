import {
  AlertTriangle,
  CheckCircle2,
  Globe,
  MapPin,
  Rocket,
  SearchX,
  Shield,
  Smartphone,
  TrendingDown,
  TrendingUp,
  UserX,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const PROBLEMS = [
  {
    icon: SearchX,
    emoji: "😤",
    title: "No online presence",
    desc: "Customers search Google and can't find you — they go to a competitor instead.",
  },
  {
    icon: TrendingDown,
    emoji: "😩",
    title: "Losing customers daily",
    desc: "Without a website, every day you're bleeding customers to rivals who showed up online.",
  },
  {
    icon: UserX,
    emoji: "😫",
    title: "Looking unprofessional",
    desc: "No website = no trust. First impressions happen online — yours doesn't exist.",
  },
  {
    icon: Globe,
    emoji: "🤦",
    title: "Invisible on Google",
    desc: "Missing Google search traffic means missing out on hundreds of potential buyers monthly.",
  },
];

const SOLUTIONS = [
  {
    icon: Zap,
    badge: "2–7 Days Delivery",
    title: "Professional website — live fast",
    desc: "Beautiful, conversion-focused site launched in 2–7 days. Starting from ₹3,999.",
  },
  {
    icon: TrendingUp,
    badge: "Revenue Ready",
    title: "Beat competitors instantly",
    desc: "A high-converting site positions you above rivals and turns visitors into customers.",
  },
  {
    icon: Shield,
    badge: "Instant Trust",
    title: "Build credibility online",
    desc: "Professional design signals authority. Customers feel confident choosing you.",
  },
  {
    icon: MapPin,
    badge: "Get Found Locally",
    title: "Rank on Google locally",
    desc: "Local SEO + Google Business setup so nearby customers find you first, every time.",
  },
];

const CYCLE_DURATION = 4000; // ms per side

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({
  isRunning,
  duration,
  onComplete,
}: {
  isRunning: boolean;
  duration: number;
  onComplete: () => void;
}) {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (!isRunning) return;
    progress.set(0);
    const start = performance.now();
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      progress.set(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isRunning, duration, onComplete, progress]);

  return (
    <div
      className="h-0.5 w-full overflow-hidden rounded-full"
      style={{ background: "oklch(0.25 0.04 265)" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          width,
          background:
            "linear-gradient(90deg, oklch(0.55 0.22 25), oklch(0.62 0.26 265))",
        }}
      />
    </div>
  );
}

// ── Problem Panel ─────────────────────────────────────────────────────────────
function ProblemPanel() {
  return (
    <div
      className="flex flex-col w-full"
      data-ocid="problem_solution.problems_panel"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="flex flex-wrap items-center gap-2 mb-4"
      >
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "oklch(0.55 0.22 25 / 0.2)",
            border: "1px solid oklch(0.55 0.22 25 / 0.4)",
          }}
        >
          <AlertTriangle
            className="w-4 h-4"
            style={{ color: "oklch(0.75 0.18 25)" }}
          />
        </div>
        <div className="min-w-0">
          <p
            className="font-display font-bold text-sm leading-tight"
            style={{ color: "oklch(0.75 0.18 25)" }}
          >
            The Harsh Reality
          </p>
          <p className="font-body text-xs text-muted-foreground leading-tight">
            Without a website…
          </p>
        </div>
        <div
          className="ml-auto flex-shrink-0 text-xs font-body font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "oklch(0.55 0.22 25 / 0.15)",
            border: "1px solid oklch(0.55 0.22 25 / 0.3)",
            color: "oklch(0.75 0.18 25)",
          }}
        >
          😩 Problem
        </div>
      </motion.div>

      {/* Cards */}
      <div
        className="flex flex-col gap-2.5"
        data-ocid="problem_solution.problems_list"
      >
        {PROBLEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.1 + i * 0.09,
                ease: "easeOut",
              }}
              data-ocid={`problem_solution.problem_item.${i + 1}`}
              className="group flex items-start gap-3 p-3 sm:p-4 rounded-xl relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.16 0.04 25 / 0.5) 0%, oklch(0.11 0.02 25 / 0.25) 100%)",
                border: "1px solid oklch(0.55 0.22 25 / 0.22)",
              }}
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{
                  background: "oklch(0.55 0.22 25 / 0.18)",
                  border: "1px solid oklch(0.55 0.22 25 / 0.3)",
                }}
              >
                {item.emoji}
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Icon
                    className="w-3 h-3 flex-shrink-0"
                    style={{ color: "oklch(0.72 0.16 25)" }}
                  />
                  <p
                    className="font-display font-bold text-xs leading-snug break-words"
                    style={{ color: "oklch(0.88 0.06 25)" }}
                  >
                    {item.title}
                  </p>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed break-words">
                  {item.desc}
                </p>
              </div>
              {/* ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at 20% 50%, oklch(0.55 0.22 25 / 0.08) 0%, transparent 60%)",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Solution Panel ────────────────────────────────────────────────────────────
function SolutionPanel() {
  return (
    <div
      className="flex flex-col w-full"
      data-ocid="problem_solution.solutions_panel"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="flex flex-wrap items-center gap-2 mb-4"
      >
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "oklch(0.58 0.24 265 / 0.2)",
            border: "1px solid oklch(0.58 0.24 265 / 0.4)",
          }}
        >
          <Rocket className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-sm text-primary leading-tight">
            Siteset Studio Fixes This
          </p>
          <p className="font-body text-xs text-muted-foreground leading-tight">
            With our solution…
          </p>
        </div>
        <div
          className="ml-auto flex-shrink-0 text-xs font-body font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "oklch(0.58 0.24 265 / 0.15)",
            border: "1px solid oklch(0.58 0.24 265 / 0.3)",
            color: "oklch(0.8 0.15 265)",
          }}
        >
          🚀 Solution
        </div>
      </motion.div>

      {/* Cards */}
      <div
        className="flex flex-col gap-2.5"
        data-ocid="problem_solution.solutions_list"
      >
        {SOLUTIONS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.1 + i * 0.09,
                ease: "easeOut",
              }}
              data-ocid={`problem_solution.solution_item.${i + 1}`}
              className="group flex items-start gap-3 p-3 sm:p-4 rounded-xl relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.14 0.06 265 / 0.7) 0%, oklch(0.11 0.03 265 / 0.35) 100%)",
                border: "1px solid oklch(0.58 0.24 265 / 0.25)",
              }}
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.58 0.24 265 / 0.3) 0%, oklch(0.58 0.24 265 / 0.12) 100%)",
                  border: "1px solid oklch(0.58 0.24 265 / 0.4)",
                }}
              >
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1 overflow-hidden pr-5">
                <div className="flex flex-wrap items-start gap-1.5 mb-0.5">
                  <p className="font-display font-bold text-xs text-foreground leading-snug break-words">
                    {item.title}
                  </p>
                  <span
                    className="flex-shrink-0 text-[9px] font-body font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap"
                    style={{
                      background: "oklch(0.58 0.24 265 / 0.2)",
                      border: "1px solid oklch(0.58 0.24 265 / 0.4)",
                      color: "oklch(0.8 0.15 265)",
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed break-words">
                  {item.desc}
                </p>
              </div>
              {/* Check icon */}
              <CheckCircle2 className="absolute top-3 right-3 w-3 h-3 text-primary opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
              {/* Hover glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at 80% 50%, oklch(0.58 0.24 265 / 0.1) 0%, transparent 60%)",
                }}
              />
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary/70 to-primary/10 transition-all duration-500 rounded-b-xl" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-100px" });

  const [side, setSide] = useState<"problem" | "solution">("problem");
  const [cycling, setCycling] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // Start cycling when section enters view
  useEffect(() => {
    if (inView) {
      setCycling(true);
    } else {
      setCycling(false);
      setSide("problem");
    }
  }, [inView]);

  const handleTransition = () => {
    setSide((prev) => (prev === "problem" ? "solution" : "problem"));
    setProgressKey((k) => k + 1);
  };

  const handleDotClick = (target: "problem" | "solution") => {
    if (target !== side) {
      setSide(target);
      setProgressKey((k) => k + 1);
    }
  };

  return (
    <section
      id="problem-solution"
      ref={sectionRef}
      data-ocid="problem_solution.section"
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: "oklch(0.08 0.02 265)" }}
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            side === "problem"
              ? "radial-gradient(ellipse 50% 60% at 20% 50%, oklch(0.55 0.22 25 / 0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 50%, oklch(0.58 0.24 265 / 0.04) 0%, transparent 70%)"
              : "radial-gradient(ellipse 50% 60% at 80% 50%, oklch(0.58 0.24 265 / 0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 50%, oklch(0.55 0.22 25 / 0.03) 0%, transparent 70%)",
          transition: "background 1.2s ease",
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.9 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
          data-ocid="problem_solution.heading"
        >
          <div
            className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full"
            style={{
              background: "oklch(0.55 0.22 25 / 0.1)",
              border: "1px solid oklch(0.55 0.22 25 / 0.25)",
            }}
          >
            <Smartphone
              className="w-3.5 h-3.5"
              style={{ color: "oklch(0.75 0.18 25)" }}
            />
            <span
              className="font-body text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.75 0.18 25)" }}
            >
              Reality Check
            </span>
          </div>
          <h2
            className="font-display font-extrabold leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Your business deserves to{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 25), oklch(0.62 0.26 265))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              grow online
            </span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Watch how businesses go from struggling to thriving with a
            professional website.
          </p>
        </motion.div>

        {/* ── Video-like Panel ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.10 0.025 265)",
            border: "1px solid oklch(0.22 0.04 265 / 0.6)",
            boxShadow:
              "0 24px 80px oklch(0.06 0.02 265 / 0.8), 0 0 0 1px oklch(0.22 0.04 265 / 0.2)",
          }}
        >
          {/* "Video" top bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ borderBottom: "1px solid oklch(0.18 0.03 265)" }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "oklch(0.65 0.19 22)" }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "oklch(0.72 0.18 85)" }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "oklch(0.72 0.18 142)" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={side}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-xs text-muted-foreground"
                >
                  {side === "problem"
                    ? "😩 Without a website"
                    : "🚀 With Siteset Studio"}
                </motion.span>
              </AnimatePresence>
            </div>
            <div
              className="text-xs font-body px-2 py-0.5 rounded font-semibold"
              style={{
                background:
                  side === "problem"
                    ? "oklch(0.55 0.22 25 / 0.15)"
                    : "oklch(0.58 0.24 265 / 0.15)",
                color:
                  side === "problem"
                    ? "oklch(0.75 0.18 25)"
                    : "oklch(0.78 0.16 265)",
                border: `1px solid ${side === "problem" ? "oklch(0.55 0.22 25 / 0.3)" : "oklch(0.58 0.24 265 / 0.3)"}`,
              }}
            >
              {side === "problem" ? "PROBLEM" : "SOLUTION"}
            </div>
          </div>

          {/* Main animated content area */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              {side === "problem" ? (
                <motion.div
                  key="problem"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  className="relative w-full px-4 py-5 sm:px-6 sm:py-6"
                >
                  {/* Dramatic red ambient for problem */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.55 0.22 25 / 0.08) 0%, transparent 70%)",
                    }}
                  />
                  <ProblemPanel />
                </motion.div>
              ) : (
                <motion.div
                  key="solution"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  className="relative w-full px-4 py-5 sm:px-6 sm:py-6"
                >
                  {/* Hopeful blue ambient for solution */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.58 0.24 265 / 0.1) 0%, transparent 70%)",
                    }}
                  />
                  <SolutionPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom controls bar */}
          <div
            className="px-4 pb-4 pt-3 flex flex-col gap-3"
            style={{ borderTop: "1px solid oklch(0.18 0.03 265)" }}
          >
            {/* Progress bar */}
            <ProgressBar
              key={`${progressKey}-${side}`}
              isRunning={cycling}
              duration={CYCLE_DURATION}
              onComplete={handleTransition}
            />

            {/* Dots + label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDotClick("problem")}
                  data-ocid="problem_solution.problem_tab"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all duration-300"
                  style={{
                    background:
                      side === "problem"
                        ? "oklch(0.55 0.22 25 / 0.2)"
                        : "transparent",
                    border: `1px solid ${side === "problem" ? "oklch(0.55 0.22 25 / 0.4)" : "oklch(0.22 0.03 265)"}`,
                    color:
                      side === "problem"
                        ? "oklch(0.75 0.18 25)"
                        : "oklch(0.5 0.02 265)",
                  }}
                  aria-label="Show problem side"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        side === "problem"
                          ? "oklch(0.65 0.2 25)"
                          : "oklch(0.35 0.04 265)",
                    }}
                  />
                  Problem
                </button>
                <button
                  type="button"
                  onClick={() => handleDotClick("solution")}
                  data-ocid="problem_solution.solution_tab"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all duration-300"
                  style={{
                    background:
                      side === "solution"
                        ? "oklch(0.58 0.24 265 / 0.2)"
                        : "transparent",
                    border: `1px solid ${side === "solution" ? "oklch(0.58 0.24 265 / 0.4)" : "oklch(0.22 0.03 265)"}`,
                    color:
                      side === "solution"
                        ? "oklch(0.8 0.15 265)"
                        : "oklch(0.5 0.02 265)",
                  }}
                  aria-label="Show solution side"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        side === "solution"
                          ? "oklch(0.62 0.26 265)"
                          : "oklch(0.35 0.04 265)",
                    }}
                  />
                  Solution
                </button>
              </div>

              <p className="font-body text-xs text-muted-foreground">
                {side === "problem"
                  ? "⏳ Solution arriving soon…"
                  : "✅ This is what we deliver"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay: 0.6 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl"
            style={{
              background: "oklch(0.58 0.24 265 / 0.07)",
              border: "1px solid oklch(0.58 0.24 265 / 0.15)",
            }}
          >
            <Zap className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="font-body text-sm text-muted-foreground">
              Over{" "}
              <span className="text-foreground font-semibold">
                50+ local businesses
              </span>{" "}
              already growing with Siteset Studio
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
