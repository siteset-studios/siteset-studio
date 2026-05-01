import {
  CheckCircle,
  Layers,
  MapPin,
  MessageCircle,
  RefreshCw,
  Rocket,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent, useEffect, useRef, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Aap Batao",
    subtitle: "You Tell Us",
    description:
      "Apna business aur goals share karo — free consultation mein, koi charge nahi.",
    color: "oklch(0.62 0.26 265)",
    glow: "oklch(0.62 0.26 265 / 0.5)",
    gradFrom: "oklch(0.62 0.26 265 / 0.18)",
    gradTo: "oklch(0.62 0.26 265 / 0.04)",
    border: "oklch(0.62 0.26 265 / 0.35)",
    hue: "265",
    delay: 0,
  },
  {
    number: "02",
    icon: Layers,
    title: "Design & Build",
    subtitle: "Premium Creation",
    description:
      "2–7 din mein premium website design + development — mobile-first, fast, beautiful.",
    color: "oklch(0.72 0.2 285)",
    glow: "oklch(0.72 0.2 285 / 0.5)",
    gradFrom: "oklch(0.72 0.2 285 / 0.18)",
    gradTo: "oklch(0.72 0.2 285 / 0.04)",
    border: "oklch(0.72 0.2 285 / 0.35)",
    hue: "285",
    delay: 0.12,
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Review & Approve",
    subtitle: "Your Feedback",
    description:
      "Aap dekho, feedback do — unlimited revisions jab tak aap 100% khush na ho.",
    color: "oklch(0.72 0.18 195)",
    glow: "oklch(0.72 0.18 195 / 0.5)",
    gradFrom: "oklch(0.72 0.18 195 / 0.18)",
    gradTo: "oklch(0.72 0.18 195 / 0.04)",
    border: "oklch(0.72 0.18 195 / 0.35)",
    hue: "195",
    delay: 0.24,
  },
  {
    number: "04",
    icon: Rocket,
    title: "Go Live! 🚀",
    subtitle: "Launch Day",
    description:
      "Website launch + Google pe setup — aap ready to get customers from day one!",
    color: "oklch(0.75 0.18 145)",
    glow: "oklch(0.75 0.18 145 / 0.5)",
    gradFrom: "oklch(0.75 0.18 145 / 0.18)",
    gradTo: "oklch(0.75 0.18 145 / 0.04)",
    border: "oklch(0.75 0.18 145 / 0.35)",
    hue: "145",
    delay: 0.36,
  },
];

const TRUST_BADGES = [
  {
    icon: Star,
    metric: "50+",
    label: "Businesses Launched",
    description: "Local brands now live and growing online",
    color: "oklch(0.78 0.18 60)",
  },
  {
    icon: ThumbsUp,
    metric: "100%",
    label: "Client Satisfaction",
    description: "Every client approved their site with pride",
    color: "oklch(0.72 0.2 142)",
  },
  {
    icon: Zap,
    metric: "2–7",
    label: "Day Delivery",
    description: "From first call to fully live website",
    color: "oklch(0.72 0.2 30)",
  },
  {
    icon: RefreshCw,
    metric: "∞",
    label: "Unlimited Revisions",
    description: "Change requests until you're 100% happy",
    color: "oklch(0.62 0.26 265)",
  },
];

const RESULTS = [
  {
    icon: Users,
    metric: "3x",
    headline: "More Customers",
    description:
      "Businesses with modern websites get 3x more inquiries online.",
    gradient:
      "linear-gradient(135deg, oklch(0.62 0.26 265), oklch(0.48 0.22 265))",
    borderColor: "oklch(0.62 0.26 265 / 0.4)",
    glow: "oklch(0.62 0.26 265 / 0.15)",
  },
  {
    icon: TrendingUp,
    metric: "₹50L+",
    headline: "Revenue Generated",
    description:
      "Our clients have collectively earned over ₹50 lakhs through their websites.",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.2 30), oklch(0.58 0.18 30))",
    borderColor: "oklch(0.72 0.2 30 / 0.4)",
    glow: "oklch(0.72 0.2 30 / 0.15)",
  },
  {
    icon: MapPin,
    metric: "Top 3",
    headline: "on Google Maps",
    description:
      "With our SEO + GMB optimization, most clients rank in top 3 local results.",
    gradient:
      "linear-gradient(135deg, oklch(0.78 0.14 142), oklch(0.6 0.12 142))",
    borderColor: "oklch(0.78 0.14 142 / 0.4)",
    glow: "oklch(0.78 0.14 142 / 0.15)",
  },
];

// ─── 3D Tilt Step Card ─────────────────────────────────────────────────────────

function StepCard3D({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-80, 80], [8, -8]);
  const rotateY = useTransform(mouseX, [-80, 80], [-8, 8]);
  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: step.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-ocid={`our-work.step.${index + 1}`}
      className="relative group cursor-default"
    >
      <motion.div
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-3xl p-7 overflow-hidden h-full"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Card glass background */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${step.gradFrom} 0%, ${step.gradTo} 100%)`,
            border: `1px solid ${step.border}`,
            backdropFilter: "blur(20px)",
          }}
        />

        {/* Animated glow halo behind card */}
        <motion.div
          className="absolute -inset-2 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${step.glow}, transparent 70%)`,
            filter: "blur(20px)",
            zIndex: -1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Step number large background text */}
        <div
          className="absolute top-3 right-5 font-display font-black select-none pointer-events-none"
          style={{
            fontSize: "5rem",
            lineHeight: 1,
            color: `oklch(0.62 0.22 ${step.hue} / 0.08)`,
          }}
          aria-hidden="true"
        >
          {step.number}
        </div>

        {/* Content (preserve-3d translateZ so it floats above bg) */}
        <div
          className="relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Step badge */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${step.gradFrom}, ${step.gradTo})`,
                border: `1.5px solid ${step.border}`,
                boxShadow: `0 0 24px ${step.glow}`,
              }}
            >
              <Icon
                className="w-6 h-6"
                style={{ color: step.color }}
                strokeWidth={1.8}
              />
            </div>

            {/* Glowing step number pill */}
            <span
              className="font-display font-black text-2xl bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${step.color}, ${step.color}bb)`,
              }}
            >
              {step.number}
            </span>
          </div>

          <h3 className="font-display font-extrabold text-xl text-foreground mb-1 leading-tight">
            {step.title}
          </h3>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: step.color }}
          >
            {step.subtitle}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Pulsing border glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: `inset 0 0 30px ${step.glow}` }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Trust Badge 3D ───────────────────────────────────────────────────────────

function TrustBadge3D({
  badge,
  index,
}: { badge: (typeof TRUST_BADGES)[number]; index: number }) {
  const Icon = badge.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        y: -8,
        rotateY: 8,
        scale: 1.04,
        transition: { duration: 0.25 },
      }}
      style={{ transformPerspective: 800, transformStyle: "preserve-3d" }}
      data-ocid={`our-work.trust_badge.${index + 1}`}
      className="relative glass rounded-2xl p-5 flex flex-col items-center text-center group overflow-hidden cursor-default"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${badge.color}20, transparent 70%)`,
        }}
      />
      {/* 3D depth shadow effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `0 20px 40px -10px ${badge.color}30` }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${badge.color}18`,
          border: `1px solid ${badge.color}35`,
          boxShadow: `0 0 20px ${badge.color}25`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: badge.color }} />
      </div>

      <div
        className="font-display font-black text-3xl leading-none mb-1"
        style={{ color: badge.color }}
      >
        {badge.metric}
      </div>
      <div className="font-semibold text-foreground text-sm mb-1">
        {badge.label}
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        {badge.description}
      </p>
    </motion.div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
  result,
  index,
}: { result: (typeof RESULTS)[number]; index: number }) {
  const Icon = result.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      style={{ transformPerspective: 900 }}
      data-ocid={`our-work.result_card.${index + 1}`}
      className="relative rounded-2xl p-6 flex flex-col group overflow-hidden"
    >
      {/* BG + border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "oklch(0.1 0.02 265)",
          border: `1px solid ${result.borderColor}`,
          boxShadow: `0 0 40px ${result.glow}, 0 12px 40px rgba(0,0,0,0.4)`,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
        style={{ background: result.gradient }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${result.glow}, transparent 65%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0"
          style={{
            background: result.gradient,
            boxShadow: `0 4px 20px ${result.borderColor}`,
          }}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div
          className="font-display font-black text-4xl lg:text-5xl leading-none mb-1 bg-clip-text text-transparent"
          style={{ backgroundImage: result.gradient }}
        >
          {result.metric}
        </div>
        <h3 className="font-display font-extrabold text-lg text-foreground mb-2">
          {result.headline}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {result.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative py-20 lg:py-28 overflow-hidden"
      data-ocid="our-work.section"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.025 265) 0%, oklch(0.07 0.015 265) 100%)",
        perspective: "1500px",
      }}
    >
      {/* Deep background glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.62 0.26 265 / 0.05) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full"
          style={{
            background: "oklch(0.72 0.2 285 / 0.05)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/2 -left-20 w-56 h-56 rounded-full"
          style={{
            background: "oklch(0.75 0.18 145 / 0.04)",
            filter: "blur(60px)",
          }}
        />
        {/* Subtle 3D grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.62 0.22 265 / 0.8) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.22 265 / 0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ─── PART 1: How We Work — Cinematic 3D Cards ─── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border"
              style={{
                background: "oklch(0.62 0.26 265 / 0.12)",
                borderColor: "oklch(0.62 0.26 265 / 0.3)",
                color: "oklch(0.72 0.26 265)",
              }}
            >
              Our Process
            </span>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl text-foreground mb-4 leading-tight">
              Idea se{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Live Website
              </span>{" "}
              tak — Sirf Days Mein
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              Ek clear, smooth process — aap hamesha jaante ho aage kya hoga.
            </p>
          </motion.div>

          {/* Steps: 4 column grid, each card 3D tilt */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="our-work.process.list"
          >
            {STEPS.map((step, index) => (
              <StepCard3D key={step.number} step={step} index={index} />
            ))}
          </div>

          {/* Connecting flow line (desktop) */}
          <div
            className="hidden lg:flex items-center justify-between max-w-5xl mx-auto mt-6 px-12"
            aria-hidden="true"
          >
            {STEPS.slice(0, -1).map((step, i) => (
              <div key={step.number} className="flex-1 flex items-center gap-1">
                <motion.div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${step.color}50, ${STEPS[i + 1].color}50)`,
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                />
                {/* Flowing dot */}
                <motion.div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: step.color,
                    boxShadow: `0 0 8px ${step.glow}`,
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── Divider ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-24"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div
            className="w-2.5 h-2.5 rotate-45 shrink-0"
            style={{ background: "oklch(0.62 0.26 265)" }}
          />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* ─── PART 2: Trust Badges 3D ─── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-extrabold text-2xl lg:text-4xl text-foreground mb-2 leading-tight">
              Businesses Kyun{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Trust Karte Hain
              </span>
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base max-w-md mx-auto">
              Numbers that speak louder than words.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            data-ocid="our-work.trust_badges.list"
          >
            {TRUST_BADGES.map((badge, index) => (
              <TrustBadge3D key={badge.label} badge={badge} index={index} />
            ))}
          </div>
        </div>

        {/* ─── Divider ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-24"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div
            className="w-2.5 h-2.5 rotate-45 shrink-0"
            style={{ background: "oklch(0.72 0.2 30)" }}
          />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* ─── PART 3: Real Results ─── */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center mb-10"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border"
              style={{
                background: "oklch(0.72 0.2 30 / 0.12)",
                borderColor: "oklch(0.72 0.2 30 / 0.3)",
                color: "oklch(0.78 0.2 30)",
              }}
            >
              Real Results
            </span>
            <h2 className="font-display font-extrabold text-2xl lg:text-4xl text-foreground mb-2 leading-tight">
              Clients Kya{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.72 0.2 30), oklch(0.78 0.14 142))",
                }}
              >
                Actually Achieve
              </span>{" "}
              Karte Hain
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base max-w-md mx-auto">
              A website isn't a cost — it's your highest-ROI investment.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-ocid="our-work.results.list"
          >
            {RESULTS.map((result, index) => (
              <ResultCard key={result.metric} result={result} index={index} />
            ))}
          </div>
        </div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl"
            style={{
              background: "oklch(0.12 0.025 265)",
              border: "1px solid oklch(0.62 0.26 265 / 0.2)",
              boxShadow: "0 0 40px oklch(0.62 0.26 265 / 0.08)",
            }}
          >
            <div className="text-center sm:text-left">
              <p className="font-display font-extrabold text-foreground text-base">
                Ready to grow your business? 🚀
              </p>
              <p className="text-muted-foreground text-sm">
                Join 50+ Indian businesses who chose us.
              </p>
            </div>
            <a
              href="https://wa.me/919330138050?text=Hi%20Siteset%20Studio!%20I%27d%20like%20to%20get%20a%20free%20demo."
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="our-work.cta_link"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 glow-btn whitespace-nowrap shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.26 265), oklch(0.48 0.22 265))",
              }}
            >
              Get Free Demo →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
