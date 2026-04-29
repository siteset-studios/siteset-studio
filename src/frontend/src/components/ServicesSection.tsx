import {
  CheckCircle2,
  ChevronDown,
  Globe,
  MapPin,
  RefreshCw,
  Search,
  Smartphone,
  ThumbsUp,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";

/* ─── Types ─────────────────────────────────────────────── */

interface ExpandItem {
  text: string;
}

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  accentHue: string;
  expandItems: ExpandItem[];
}

interface TrustItem {
  icon: React.ElementType;
  iconHue: string;
  label: string;
  desc: string;
}

/* ─── Data ───────────────────────────────────────────────── */

const SERVICES: Service[] = [
  {
    id: "web-design",
    icon: Globe,
    title: "Website Design",
    tagline: "From zero to live",
    description:
      "Custom-crafted websites built to convert visitors into paying customers. Every pixel is intentional — from layout to load speed.",
    gradientFrom: "oklch(0.58 0.24 265 / 0.25)",
    gradientTo: "oklch(0.45 0.2 265 / 0.06)",
    glowColor: "oklch(0.58 0.24 265 / 0.45)",
    accentHue: "265",
    expandItems: [
      { text: "Custom design tailored to your business" },
      { text: "Mobile-first & lightning fast performance" },
      { text: "Ready in 2–7 days, fully handcrafted" },
    ],
  },
  {
    id: "web-redesign",
    icon: RefreshCw,
    title: "Website Redesign",
    tagline: "Glow-up your old site",
    description:
      "Transform your outdated site into a high-performing digital asset. We preserve your brand while dramatically boosting speed and conversions.",
    gradientFrom: "oklch(0.58 0.24 285 / 0.2)",
    gradientTo: "oklch(0.45 0.2 285 / 0.06)",
    glowColor: "oklch(0.6 0.22 285 / 0.4)",
    accentHue: "285",
    expandItems: [
      { text: "Transform your outdated site completely" },
      { text: "Keep your content, upgrade the look" },
      { text: "Live in 48–72 hours guaranteed" },
    ],
  },
  {
    id: "local-seo",
    icon: Search,
    title: "Local SEO",
    tagline: "Rank #1 in your city",
    description:
      "Rank at the top when nearby customers search for your services. Keyword strategy, on-page optimization, citations, and backlinks.",
    gradientFrom: "oklch(0.68 0.18 200 / 0.2)",
    gradientTo: "oklch(0.55 0.15 200 / 0.06)",
    glowColor: "oklch(0.68 0.18 200 / 0.4)",
    accentHue: "200",
    expandItems: [
      { text: "Rank on Google for local searches" },
      { text: "Monthly keyword tracking & reporting" },
      { text: "Measurable results within 30 days" },
    ],
  },
  {
    id: "google-business",
    icon: MapPin,
    title: "Google Business Profile",
    tagline: "Get found on Maps",
    description:
      "Claim, optimize and manage your Google Business profile. Show up exactly where customers are looking — Maps, Search, and the local pack.",
    gradientFrom: "oklch(0.7 0.17 142 / 0.2)",
    gradientTo: "oklch(0.58 0.14 142 / 0.06)",
    glowColor: "oklch(0.7 0.17 142 / 0.4)",
    accentHue: "142",
    expandItems: [
      { text: "Complete GMB setup & optimization" },
      { text: "Photo uploads & review management" },
      { text: "Appear in Google Maps searches instantly" },
    ],
  },
];

const GBP_FEATURES = [
  "Profile setup & verification",
  "Photo & post optimization",
  "Review management system",
  "Local keyword targeting",
  "Maps ranking improvement",
  "Monthly performance report",
];

const TRUST_ITEMS: TrustItem[] = [
  { icon: Zap, iconHue: "60", label: "Fast Delivery", desc: "2–7 Days" },
  {
    icon: Smartphone,
    iconHue: "200",
    label: "Mobile Optimized",
    desc: "All Devices",
  },
  {
    icon: TrendingUp,
    iconHue: "142",
    label: "SEO Ready",
    desc: "Built-in Ranking",
  },
  {
    icon: ThumbsUp,
    iconHue: "285",
    label: "100% Satisfaction",
    desc: "Or We Fix It",
  },
];

/* ─── Sub-components ─────────────────────────────────────── */

function CheckFeatureItem({
  text,
  index,
  hovered,
}: {
  text: string;
  index: number;
  hovered: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      whileHover={{ scale: 1.03, x: 4 }}
      className="flex items-center gap-2.5 group/item cursor-default"
    >
      <div className="relative shrink-0">
        <motion.div
          animate={
            hovered
              ? {
                  boxShadow: [
                    "0 0 0px oklch(0.7 0.17 142 / 0)",
                    "0 0 10px oklch(0.7 0.17 142 / 0.6)",
                    "0 0 5px oklch(0.7 0.17 142 / 0.3)",
                  ],
                }
              : { boxShadow: "0 0 0px oklch(0.7 0.17 142 / 0)" }
          }
          transition={{
            duration: 0.8,
            delay: index * 0.06,
            repeat: hovered ? Number.POSITIVE_INFINITY : 0,
          }}
          className="rounded-full"
        >
          <CheckCircle2
            className="w-4 h-4 transition-transform duration-200 group-hover/item:scale-110"
            style={{ color: "oklch(0.75 0.18 142)" }}
            strokeWidth={2.5}
          />
        </motion.div>
      </div>
      <motion.span
        animate={
          hovered
            ? {
                background: [
                  "oklch(0.7 0.17 142 / 0.08)",
                  "oklch(0.7 0.17 142 / 0.14)",
                  "oklch(0.7 0.17 142 / 0.08)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          delay: index * 0.08,
          repeat: hovered ? Number.POSITIVE_INFINITY : 0,
        }}
        className="text-[11px] font-semibold rounded-full px-2.5 py-0.5 leading-snug border transition-all duration-200 group-hover/item:border-opacity-60"
        style={{
          color: "oklch(0.88 0.1 142)",
          background: "oklch(0.7 0.17 142 / 0.09)",
          border: "1px solid oklch(0.7 0.17 142 / 0.25)",
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

function ExpandedContent({
  items,
  accentHue,
}: {
  items: ExpandItem[];
  accentHue: string;
}) {
  return (
    <motion.div
      key="expanded"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div
        className="mt-4 rounded-2xl px-4 py-4 space-y-2.5"
        style={{
          background: `oklch(0.58 0.24 ${accentHue} / 0.07)`,
          border: `1px solid oklch(0.58 0.24 ${accentHue} / 0.2)`,
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-3"
          style={{ color: `oklch(0.75 0.15 ${accentHue} / 0.8)` }}
        >
          What You Get
        </p>
        {items.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 + i * 0.07 }}
            className="flex items-start gap-2.5"
          >
            <div
              className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
              style={{
                background: `oklch(0.58 0.24 ${accentHue} / 0.2)`,
                border: `1px solid oklch(0.58 0.24 ${accentHue} / 0.4)`,
              }}
            >
              <CheckCircle2
                className="w-2.5 h-2.5"
                style={{ color: `oklch(0.8 0.18 ${accentHue})` }}
                strokeWidth={2.5}
              />
            </div>
            <span
              className="text-sm leading-snug font-body"
              style={{ color: `oklch(0.88 0.06 ${accentHue})` }}
            >
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: Service;
  index: number;
  inView: boolean;
}) {
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isGBP = service.id === "google-business";

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  }

  function handleMouseLeave() {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }

  const enterX = index % 2 === 0 ? -30 : 30;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, x: enterX }}
      animate={
        inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 40, x: enterX }
      }
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      style={{
        perspective: 800,
        marginTop: index % 2 !== 0 ? "1.5rem" : "0",
      }}
      data-ocid={`services.item.${index + 1}`}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: expanded ? 0 : tilt.x,
          rotateY: expanded ? 0 : tilt.y,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative rounded-3xl p-7 overflow-hidden cursor-default h-full"
        style={{
          background: `linear-gradient(135deg, ${service.gradientFrom} 0%, ${service.gradientTo} 100%)`,
          border: `1px solid oklch(0.58 0.24 ${service.accentHue} / 0.2)`,
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? `0 20px 60px -10px ${service.glowColor}, 0 0 0 1px oklch(0.58 0.24 ${service.accentHue} / 0.3)`
            : "0 4px 24px oklch(0 0 0 / 0.3)",
          transition: "box-shadow 0.35s ease",
        }}
      >
        {/* Hover shimmer overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 60% 30%, oklch(0.58 0.24 ${service.accentHue} / 0.12) 0%, transparent 65%)`,
          }}
          aria-hidden="true"
        />

        {/* Floating number badge */}
        <div
          className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-xs opacity-40"
          style={{
            background: `oklch(0.58 0.24 ${service.accentHue} / 0.2)`,
            border: `1px solid oklch(0.58 0.24 ${service.accentHue} / 0.3)`,
            color: `oklch(0.8 0.15 ${service.accentHue})`,
          }}
          aria-hidden="true"
        >
          0{index + 1}
        </div>

        {/* Icon */}
        <div
          className="relative mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, oklch(0.58 0.24 ${service.accentHue} / 0.3) 0%, oklch(0.58 0.24 ${service.accentHue} / 0.1) 100%)`,
            border: `1.5px solid oklch(0.58 0.24 ${service.accentHue} / 0.4)`,
            boxShadow: `0 0 20px oklch(0.58 0.24 ${service.accentHue} / 0.2)`,
          }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: `oklch(0.8 0.18 ${service.accentHue})` }}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative">
          <p
            className="font-body text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: `oklch(0.75 0.15 ${service.accentHue})` }}
          >
            {service.tagline}
          </p>

          <h3 className="font-display font-extrabold text-xl text-foreground mb-3 tracking-tight leading-tight">
            {service.title}
          </h3>

          <motion.p
            className="font-body text-sm leading-relaxed text-muted-foreground"
            animate={{ opacity: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.25 }}
          >
            {service.description}
          </motion.p>
        </div>

        {/* GBP Feature Grid — only on last card */}
        {isGBP && (
          <motion.div
            className="relative mt-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div
              className="mb-4 h-px w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.7 0.17 142 / 0.3), transparent)",
              }}
              aria-hidden="true"
            />
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.7 0.17 142 / 0.7)" }}
            >
              What&apos;s Included
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {GBP_FEATURES.map((feat, i) => (
                <CheckFeatureItem
                  key={feat}
                  text={feat}
                  index={i}
                  hovered={hovered}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <ExpandedContent
              items={service.expandItems}
              accentHue={service.accentHue}
            />
          )}
        </AnimatePresence>

        {/* Learn More / Show Less button */}
        <div className="relative mt-5">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            data-ocid={`services.learn_more.${index + 1}`}
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold font-body transition-all duration-300"
            style={{
              background: `oklch(0.58 0.24 ${service.accentHue} / ${hovered ? "0.18" : "0.1"})`,
              border: `1px solid oklch(0.58 0.24 ${service.accentHue} / 0.3)`,
              color: `oklch(0.82 0.16 ${service.accentHue})`,
            }}
          >
            <span>{expanded ? "Show Less" : "Learn More"}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
            </motion.span>
          </motion.button>
        </div>

        {/* Bottom glow bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-b-3xl"
          style={{
            background: `linear-gradient(to right, oklch(0.65 0.22 ${service.accentHue} / 0.9), transparent)`,
          }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}

function TrustStrip({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.85 }}
      className="mt-14 max-w-4xl mx-auto"
      data-ocid="services.trust_strip"
    >
      {/* Divider line */}
      <div
        className="mb-8 h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.58 0.24 265 / 0.25), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {TRUST_ITEMS.map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: 0.9 + i * 0.07 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="group/trust relative flex flex-col items-center text-center rounded-2xl px-4 py-5 cursor-default"
              style={{
                background: `oklch(0.58 0.24 ${item.iconHue} / 0.06)`,
                border: `1px solid oklch(0.58 0.24 ${item.iconHue} / 0.18)`,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
            >
              {/* Hover glow bg */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover/trust:opacity-100 transition-opacity duration-400"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, oklch(0.58 0.24 ${item.iconHue} / 0.12) 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              {/* Icon bubble */}
              <div
                className="relative mb-3 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover/trust:scale-110"
                style={{
                  background: `linear-gradient(135deg, oklch(0.58 0.24 ${item.iconHue} / 0.25) 0%, oklch(0.58 0.24 ${item.iconHue} / 0.1) 100%)`,
                  border: `1.5px solid oklch(0.58 0.24 ${item.iconHue} / 0.35)`,
                  boxShadow: `0 0 16px oklch(0.58 0.24 ${item.iconHue} / 0.2)`,
                }}
              >
                <ItemIcon
                  className="w-5 h-5"
                  style={{ color: `oklch(0.82 0.18 ${item.iconHue})` }}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              {/* Label */}
              <p className="font-display font-bold text-sm leading-tight text-foreground mb-0.5">
                {item.label}
              </p>

              {/* Desc */}
              <p
                className="font-body text-xs leading-snug"
                style={{ color: `oklch(0.75 0.1 ${item.iconHue})` }}
              >
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      data-ocid="services.section"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.02 265) 0%, oklch(0.07 0.015 265) 100%)",
      }}
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.58 0.24 265 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.8 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(0.8 0 0 / 0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
          data-ocid="services.heading"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-10 bg-primary/60" aria-hidden="true" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase font-body">
              What We Do
            </span>
            <span className="h-px w-10 bg-primary/60" aria-hidden="true" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5 leading-tight tracking-tight">
            Our{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.22 265), oklch(0.58 0.24 265))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </span>
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-body">
            Everything a local business needs to get found online, look
            professional, and convert visitors into loyal customers — all under
            one roof.
          </p>
        </motion.div>

        {/* 2×2 organic grid with stagger */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7 max-w-4xl mx-auto"
          data-ocid="services.list"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Trust strip */}
        <TrustStrip inView={inView} />
      </div>
    </section>
  );
}
