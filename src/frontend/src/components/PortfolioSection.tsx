import {
  CheckCircle2,
  MapPin,
  MessageCircle,
  Palette,
  RefreshCw,
  Rocket,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    icon: MessageCircle,
    title: "You Share Your Vision",
    description:
      "Tell us about your business, goals, and what you need. Quick 15-min call or WhatsApp.",
    color: "oklch(0.62 0.26 265)",
    glow: "oklch(0.62 0.26 265 / 0.35)",
  },
  {
    number: "02",
    icon: Palette,
    title: "We Design & Build",
    description:
      "Our team creates your custom website with premium animations and mobile-first design.",
    color: "oklch(0.72 0.2 30)",
    glow: "oklch(0.72 0.2 30 / 0.35)",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "You Review & Approve",
    description:
      "Preview your site, request any changes. Unlimited revisions until you love it.",
    color: "oklch(0.78 0.14 142)",
    glow: "oklch(0.78 0.14 142 / 0.35)",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Go Live!",
    description:
      "We deploy your website and hand over full access. You're live within 2–7 days.",
    color: "oklch(0.68 0.16 192)",
    glow: "oklch(0.68 0.16 192 / 0.35)",
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center">
      {/* Connector line (desktop only, between steps) */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] right-0 h-px z-0"
          style={{
            background: `linear-gradient(90deg, ${step.color}, transparent)`,
            opacity: 0.35,
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative flex flex-col items-center text-center px-4 z-10"
      >
        {/* Number + Icon circle */}
        <div className="relative mb-5">
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-60"
            style={{ background: step.glow }}
          />
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center border"
            style={{
              background: `linear-gradient(135deg, ${step.color}22, ${step.color}08)`,
              borderColor: `${step.color}50`,
              boxShadow: `0 0 30px ${step.glow}`,
            }}
          >
            <Icon className="w-8 h-8" style={{ color: step.color }} />
          </div>
          {/* Step number badge */}
          <div
            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
            style={{
              background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
              boxShadow: `0 2px 8px ${step.glow}`,
            }}
          >
            {index + 1}
          </div>
        </div>

        <h3 className="font-display font-extrabold text-base lg:text-lg text-foreground mb-2 leading-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-[180px]">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

function TrustBadge({
  badge,
  index,
}: {
  badge: (typeof TRUST_BADGES)[number];
  index: number;
}) {
  const Icon = badge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      data-ocid={`our-work.trust_badge.${index + 1}`}
      className="relative glass rounded-2xl p-5 flex flex-col items-center text-center group overflow-hidden"
      style={{
        border: `1px solid ${badge.color}25`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${badge.color}12, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `${badge.color}18`,
          border: `1px solid ${badge.color}35`,
          boxShadow: `0 0 20px ${badge.color}25`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: badge.color }} />
      </div>

      {/* Metric */}
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

function ResultCard({
  result,
  index,
}: {
  result: (typeof RESULTS)[number];
  index: number;
}) {
  const Icon = result.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      data-ocid={`our-work.result_card.${index + 1}`}
      className="relative rounded-2xl p-6 flex flex-col group overflow-hidden"
      style={{
        background: "oklch(0.1 0.02 265)",
        border: `1px solid ${result.borderColor}`,
        boxShadow: `0 0 40px ${result.glow}, 0 12px 40px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Gradient top edge */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
        style={{ background: result.gradient }}
      />

      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${result.glow}, transparent 65%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative"
        style={{
          background: result.gradient,
          boxShadow: `0 4px 20px ${result.borderColor}`,
        }}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Metric */}
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
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="section-card py-20 lg:py-28 relative overflow-hidden"
      data-ocid="our-work.section"
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.62 0.26 265) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-0 w-60 h-60 opacity-[0.05] pointer-events-none rounded-full blur-3xl"
        style={{ background: "oklch(0.72 0.2 30)" }}
      />
      <div
        className="absolute top-1/2 -left-20 w-48 h-48 opacity-[0.04] pointer-events-none rounded-full blur-3xl"
        style={{ background: "oklch(0.78 0.14 142)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ─── PART 1: How We Work ─── */}
        <div className="mb-20">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
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
              From Idea to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Live Website
              </span>{" "}
              in Days
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              A clear, smooth process — so you always know what's happening
              next.
            </p>
          </motion.div>

          {/* Steps grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
            data-ocid="our-work.process.list"
          >
            {STEPS.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ─── Divider ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div
            className="w-2.5 h-2.5 rotate-45 shrink-0"
            style={{ background: "oklch(0.62 0.26 265)" }}
          />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* ─── PART 2: Trust Badges ─── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-extrabold text-2xl lg:text-4xl text-foreground mb-2 leading-tight">
              Why Businesses{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Trust Us
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
              <TrustBadge key={badge.label} badge={badge} index={index} />
            ))}
          </div>
        </div>

        {/* ─── Divider ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div
            className="w-2.5 h-2.5 rotate-45 shrink-0"
            style={{ background: "oklch(0.72 0.2 30)" }}
          />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* ─── PART 3: Results Focus ─── */}
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
              What Our Clients{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.72 0.2 30), oklch(0.78 0.14 142))",
                }}
              >
                Actually Achieve
              </span>
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
