import { Button } from "@/components/ui/button";
import { Check, MessageCircle, Shield, Zap } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
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
}

const plans: PricingPlan[] = [
  {
    id: "classic",
    name: "Classic",
    price: "₹6,999",
    originalPrice: "₹12,999",
    savePct: "Save 46%",
    emoji: "🚀",
    badge: "Starter Pick",
    badgeStyle: "starter",
    popular: false,
    ctaLabel: "Get Started",
    features: [
      "Up to 5 Pages",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form",
      "1 Month Free Support",
      "Live in 2–7 Days",
    ],
  },
  {
    id: "royal",
    name: "Royal",
    price: "₹8,999",
    originalPrice: "₹17,999",
    savePct: "Save 50%",
    emoji: "👑",
    badge: "Most Popular",
    badgeStyle: "popular",
    extraBadge: "Best Value",
    popular: true,
    ctaLabel: "Get Started",
    features: [
      "Up to 10 Pages",
      "Premium UI/UX Design",
      "Advanced SEO + Local SEO",
      "WhatsApp Integration",
      "Google Analytics Setup",
      "3 Months Free Support",
      "Live in 2–5 Days",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹12,999",
    originalPrice: "₹24,999",
    savePct: "Save 52%",
    emoji: "💎",
    badge: "Limited Time Offer",
    badgeStyle: "limited",
    popular: false,
    ctaLabel: "Get Started",
    features: [
      "Unlimited Pages",
      "Custom Animations & 3D Effects",
      "Full SEO + GMB Optimization",
      "Payment Gateway Integration",
      "Priority Support (6 Months)",
      "Live in 2–3 Days",
    ],
  },
];

const badgeClasses: Record<string, string> = {
  starter: "bg-blue-500/15 border border-blue-500/30 text-blue-400",
  popular: "bg-violet-500/20 border border-violet-500/40 text-violet-300",
  limited: "bg-orange-500/15 border border-orange-500/30 text-orange-400",
};

function TiltCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

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
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.13, ease: "easeOut" }}
      whileHover={isPopular ? { scale: 1.04, y: -8 } : { scale: 1.02, y: -5 }}
      style={
        isPopular
          ? {
              rotateX,
              rotateY,
              transformPerspective: 1000,
              border: "2px solid oklch(0.62 0.26 265 / 0.8)",
              boxShadow:
                "0 0 50px oklch(0.62 0.26 265 / 0.4), 0 0 100px oklch(0.62 0.26 265 / 0.2)",
            }
          : { rotateX, rotateY, transformPerspective: 1000 }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col rounded-2xl overflow-hidden cursor-default ${
        isPopular
          ? "bg-card scale-[1.05] z-10"
          : "glass border border-border/30"
      }`}
    >
      {/* Glow overlay for popular card */}
      {isPopular && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 0%, oklch(0.62 0.26 265 / 0.12) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Top badge row */}
      <div className="absolute top-0 left-0 right-0 flex justify-center z-20 pt-0">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wide px-4 py-1.5 rounded-b-xl ${
            badgeClasses[plan.badgeStyle]
          }`}
        >
          {plan.emoji} {plan.badge}
        </span>
      </div>

      <div
        className={`p-7 flex flex-col flex-1 relative z-10 ${isPopular ? "pt-11" : "pt-11"}`}
      >
        {/* Plan header */}
        <div className="mb-3">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <h3 className="font-display text-2xl font-bold text-foreground">
              {plan.name}
            </h3>
            {plan.extraBadge && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300">
                {plan.extraBadge}
              </span>
            )}
          </div>
          {/* Urgency tag */}
          <span className="inline-flex items-center gap-1.5 text-orange-400 text-xs font-semibold uppercase tracking-wider bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            ⚡ Limited Slots
          </span>
        </div>

        {/* Price block */}
        <div className="mb-5 flex items-end gap-3 flex-wrap">
          <div>
            {/* Strikethrough original price */}
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-muted-foreground text-sm line-through">
                {plan.originalPrice}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                {plan.savePct}
              </span>
            </div>
            {/* Discounted price */}
            <span
              className="font-display text-5xl font-black leading-none"
              style={{
                background: isPopular
                  ? "linear-gradient(135deg, oklch(0.75 0.18 265), oklch(0.65 0.24 295))"
                  : "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {plan.price}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-xs mb-4 -mt-3">
          One-time payment · No hidden fees
        </p>

        {/* Divider */}
        <div
          className="h-px mb-5"
          style={{
            background: isPopular
              ? "linear-gradient(90deg, transparent, oklch(0.62 0.26 265 / 0.5), transparent)"
              : "oklch(var(--border) / 0.3)",
          }}
        />

        {/* Features */}
        <ul className="flex-1 space-y-2.5 mb-7">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                  isPopular ? "bg-primary/20" : "bg-primary/10"
                }`}
              >
                <Check className="w-2.5 h-2.5 text-primary" />
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
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 overflow-hidden section-dark"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.6 0.23 265 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Invest Once.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Grow Forever.
            </span>
          </h2>
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

        {/* Cards — popular card elevated via scale and z-index */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
          {plans.map((plan, index) => (
            <TiltCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Trust line */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 text-muted-foreground text-sm"
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
            <span>🏆</span>
            <span>Trusted by 50+ Indian businesses</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
