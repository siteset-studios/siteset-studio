import { Button } from "@/components/ui/button";
import { Check, MessageCircle, Shield, Star, Zap } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent, useRef } from "react";

const WHATSAPP_URL = "https://wa.me/919330138050?text=Hi%20Siteset%20Studio!";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  savePct: string;
  emoji: string;
  badge: string;
  badgeStyle: "starter" | "popular" | "limited";
  extraBadge?: string;
  features: string[];
  popular: boolean;
  ctaLabel: string;
  glowColor: string;
  borderGrad: string;
  accentColor: string;
}

const plans: PricingPlan[] = [
  {
    id: "classic",
    name: "Classic",
    price: "₹3,999",
    originalPrice: "₹7,499",
    savePct: "Save 47%",
    emoji: "🚀",
    badge: "Best for Starters",
    badgeStyle: "starter",
    popular: false,
    ctaLabel: "Get Started",
    glowColor: "oklch(0.6 0.15 220 / 0.35)",
    borderGrad:
      "linear-gradient(135deg, oklch(0.5 0.08 220 / 0.6), oklch(0.4 0.06 220 / 0.2))",
    accentColor: "oklch(0.72 0.15 220)",
    features: [
      "5-page website",
      "Mobile responsive design",
      "Basic SEO setup",
      "WhatsApp button integration",
      "2–7 day delivery",
      "1 revision round",
    ],
  },
  {
    id: "royal",
    name: "Royal",
    price: "₹5,999",
    originalPrice: "₹11,999",
    savePct: "Save 50%",
    emoji: "👑",
    badge: "⭐ Most Popular",
    badgeStyle: "popular",
    extraBadge: "Best Value",
    popular: true,
    ctaLabel: "Get Started",
    glowColor: "oklch(0.62 0.26 265 / 0.5)",
    borderGrad:
      "linear-gradient(135deg, oklch(0.62 0.26 265 / 0.9), oklch(0.5 0.22 285 / 0.6))",
    accentColor: "oklch(0.72 0.26 265)",
    features: [
      "10-page website",
      "Premium design & animations",
      "Full SEO optimization",
      "Google Business setup",
      "WhatsApp + inquiry form",
      "2–5 day delivery",
      "3 revision rounds",
      "1 month free support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹8,999",
    originalPrice: "₹17,999",
    savePct: "Save 50%",
    emoji: "💎",
    badge: "🔥 Limited Time",
    badgeStyle: "limited",
    popular: false,
    ctaLabel: "Get Started",
    glowColor: "oklch(0.72 0.22 60 / 0.35)",
    borderGrad:
      "linear-gradient(135deg, oklch(0.72 0.22 60 / 0.6), oklch(0.62 0.18 285 / 0.4))",
    accentColor: "oklch(0.78 0.2 60)",
    features: [
      "Unlimited pages",
      "Custom animations & 3D effects",
      "Full SEO + Google Ads setup",
      "Video integration",
      "Priority support",
      "3–5 day delivery",
      "Unlimited revisions",
      "3 months support",
    ],
  },
];

const ALL_INCLUDED = [
  "Free domain consultation",
  "SSL certificate setup",
  "Fast hosting guide",
  "Google Analytics",
  "WhatsApp integration",
  "Mobile responsive",
];

function TiltCard3D({ plan, index }: { plan: PricingPlan; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawRotX = useTransform(mouseY, [-120, 120], [10, -10]);
  const rawRotY = useTransform(mouseX, [-120, 120], [-10, 10]);
  const rotateX = useSpring(rawRotX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotY, { stiffness: 200, damping: 20 });

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

  const isPopular = plan.popular;

  return (
    <motion.div
      data-ocid={`pricing.item.${index + 1}`}
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-default ${isPopular ? "z-10" : ""}`}
    >
      {/* Outer glow halo */}
      <div
        className="absolute -inset-3 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${plan.glowColor}, transparent 70%)`,
          filter: "blur(16px)",
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: isPopular ? 1.04 : 1.02, y: isPopular ? -10 : -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative flex flex-col rounded-3xl overflow-hidden h-full"
      >
        {/* Gradient border wrapper */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            padding: "1.5px",
            background: plan.borderGrad,
          }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-3xl"
            style={{ background: "oklch(0.1 0.02 265)" }}
          />
        </div>

        {/* Popular glow overlay */}
        {isPopular && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 100% 60% at 50% 0%, oklch(0.62 0.26 265 / 0.15) 0%, transparent 70%)",
              boxShadow: `0 0 60px ${plan.glowColor}, 0 0 120px oklch(0.62 0.26 265 / 0.1)`,
            }}
          />
        )}

        {/* Animated floating glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: isPopular
              ? [
                  `0 0 30px ${plan.glowColor}`,
                  `0 0 60px ${plan.glowColor}`,
                  `0 0 30px ${plan.glowColor}`,
                ]
              : [],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        <div
          className={`relative z-10 flex flex-col flex-1 p-7 ${isPopular ? "pt-12" : "pt-12"}`}
        >
          {/* Badge row */}
          <div className="absolute top-0 left-0 right-0 flex justify-center pt-0">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wide px-4 py-1.5 rounded-b-xl ${
                plan.badgeStyle === "popular"
                  ? "bg-violet-500/20 border border-violet-500/40 text-violet-300"
                  : plan.badgeStyle === "limited"
                    ? "bg-orange-500/15 border border-orange-500/30 text-orange-400"
                    : "bg-blue-500/15 border border-blue-500/30 text-blue-400"
              }`}
            >
              {plan.emoji} {plan.badge}
            </span>
          </div>

          {/* Plan name + extra badge */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <h3 className="font-display text-2xl font-bold text-foreground">
              {plan.name}
            </h3>
            {plan.extraBadge && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300">
                {plan.extraBadge}
              </span>
            )}
          </div>

          {/* Limited slots urgency */}
          <span className="inline-flex items-center gap-1.5 text-orange-400 text-xs font-semibold uppercase tracking-wider bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-0.5 mb-4 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            ⚡ Limited Slots
          </span>

          {/* Price */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-muted-foreground text-sm line-through">
                {plan.originalPrice}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                {plan.savePct}
              </span>
            </div>
            <span
              className="font-display text-5xl font-black leading-none"
              style={{
                background: plan.borderGrad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {plan.price}
            </span>
          </div>

          <p className="text-muted-foreground text-xs mb-5 -mt-3">
            One-time payment · No hidden fees
          </p>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: `linear-gradient(90deg, transparent, ${plan.accentColor}50, transparent)`,
            }}
          />

          {/* Features */}
          <ul className="flex-1 space-y-2.5 mb-7">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: `${plan.accentColor}25` }}
                >
                  <Check
                    className="w-2.5 h-2.5"
                    style={{ color: plan.accentColor }}
                  />
                </span>
                <span className="text-foreground/85 text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            type="button"
            data-ocid={`pricing.get_started_button.${index + 1}`}
            className={`w-full font-semibold transition-smooth flex items-center justify-center gap-2 ${
              isPopular
                ? "gradient-primary text-primary-foreground glow-btn border-0 hover:opacity-90"
                : "bg-secondary text-foreground hover:bg-primary/20 border border-border/40"
            }`}
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
          >
            <MessageCircle className="w-4 h-4" />
            {plan.ctaLabel} on WhatsApp
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.07 0.02 265) 0%, oklch(0.1 0.035 265) 50%, oklch(0.07 0.015 265) 100%)",
      }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.6 0.23 265 / 0.1) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 40% at 20% 80%, oklch(0.72 0.2 60 / 0.05) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Subtle 3D grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.62 0.22 265 / 0.8) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.22 265 / 0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* 3D floating price tag decoration */}
      <motion.div
        className="absolute top-20 right-[8%] pointer-events-none hidden lg:block"
        animate={{ y: [0, -18, 0], rotate: [8, 12, 8] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.22 60 / 0.2), oklch(0.62 0.26 265 / 0.1))",
            border: "1px solid oklch(0.72 0.22 60 / 0.3)",
            boxShadow: "0 8px 32px oklch(0.72 0.22 60 / 0.15)",
          }}
        >
          <span className="text-2xl">🏷️</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Apni Website ka{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Price Dekho
            </span>
          </h2>
          {/* Animated underline accent */}
          <motion.div
            className="mx-auto mb-4 h-1 rounded-full"
            style={{ background: "var(--gradient-primary)", maxWidth: "180px" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-muted-foreground text-base max-w-xl mx-auto mb-5">
            One-time Indian Rupee pricing. No monthly charges. No surprises.
            Just results.
          </p>

          {/* Urgency pill */}
          <motion.div
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-2"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-bold">
              🔥 Limited Time Offer — Only 3 slots left this month!
            </span>
          </motion.div>
        </motion.div>

        {/* 3 Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center mb-14">
          {plans.map((plan, index) => (
            <TiltCard3D key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* All plans include */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <div
            className="rounded-2xl p-6"
            style={{
              background: "oklch(0.1 0.02 265)",
              border: "1px solid oklch(0.62 0.26 265 / 0.15)",
              boxShadow: "0 0 40px oklch(0.62 0.26 265 / 0.05)",
            }}
          >
            <p className="font-display font-bold text-foreground text-sm text-center mb-4">
              ✅ Sab mein shamil hai: (All plans include)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_INCLUDED.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Secure payment</span>
          </div>
          <span className="hidden sm:block text-border">·</span>
          <div className="flex items-center gap-2">
            <span>🚫</span>
            <span>No hidden charges</span>
          </div>
          <span className="hidden sm:block text-border">·</span>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>100% satisfaction guaranteed</span>
          </div>
          <span className="hidden sm:block text-border">·</span>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Trusted by 50+ Indian businesses</span>
          </div>
        </motion.div>

        {/* Urgency banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p
            className="text-sm font-bold inline-block px-6 py-2 rounded-full"
            style={{
              background: "oklch(0.72 0.22 60 / 0.1)",
              border: "1px solid oklch(0.72 0.22 60 / 0.25)",
              color: "oklch(0.78 0.2 60)",
            }}
          >
            ⏰ Offer sirf limited time ke liye! Aaj hi WhatsApp karo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
