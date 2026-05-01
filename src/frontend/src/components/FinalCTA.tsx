import { Button } from "@/components/ui/button";
import {
  Clock,
  IndianRupee,
  MessageCircle,
  Rocket,
  Shield,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/919330138050?text=Hi%20Siteset%20Studio!";

const trustItems = [
  { icon: Clock, text: "Live in 2–7 Days" },
  { icon: Shield, text: "100% Satisfaction" },
  { icon: IndianRupee, text: "No Hidden Fees" },
  { icon: Star, text: "50+ Happy Clients" },
];

// 3D floating shape for background
const BG_SHAPES = [
  {
    id: "s1",
    type: "orb",
    size: 400,
    x: "65%",
    y: "10%",
    color: "oklch(0.62 0.26 265 / 0.35)",
    blur: 80,
    cls: "float-3d-alt",
  },
  {
    id: "s2",
    type: "orb",
    size: 280,
    x: "-5%",
    y: "40%",
    color: "oklch(0.55 0.2 265 / 0.25)",
    blur: 60,
    cls: "float-3d",
  },
  {
    id: "s3",
    type: "orb",
    size: 180,
    x: "40%",
    y: "70%",
    color: "oklch(0.72 0.2 285 / 0.2)",
    blur: 50,
    cls: "floating-shape-slow",
  },
];

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.06 0.025 265) 0%, oklch(0.09 0.035 265) 40%, oklch(0.07 0.02 265) 100%)",
        perspective: "1500px",
      }}
    >
      {/* 3D Floating background shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {BG_SHAPES.map((s) => (
          <div
            key={s.id}
            className={`absolute rounded-full ${s.cls}`}
            style={{
              width: s.size,
              height: s.size,
              left: s.x,
              top: s.y,
              background: `radial-gradient(circle at 35% 35%, ${s.color}, transparent 70%)`,
              filter: `blur(${s.blur}px)`,
            }}
          />
        ))}
      </div>

      {/* Central large pulsing orb */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.6 0.23 265 / 0.35) 0%, oklch(0.42 0.18 265 / 0.15) 50%, transparent 75%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.9 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0 0 / 0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Pill label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-primary text-sm font-bold tracking-wide">
            Your Website Live in 2–7 Days
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-foreground leading-tight mb-6 text-balance-hero"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Get Your Business{" "}
          <span
            className="relative inline-block"
            style={{
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Online Today
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-muted-foreground text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Start getting more customers today. No technical knowledge needed — we
          build it, you grow. Starting at just ₹3,999.
        </motion.p>

        {/* CTA Buttons with pulsing glow */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px oklch(0.62 0.26 265 / 0.4)",
                "0 0 50px oklch(0.62 0.26 265 / 0.7)",
                "0 0 20px oklch(0.62 0.26 265 / 0.4)",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="rounded-xl"
          >
            <Button
              type="button"
              data-ocid="cta.get_free_demo_button"
              size="lg"
              className="gradient-primary text-primary-foreground glow-btn border-0 font-bold text-base px-8 py-6 rounded-xl hover:opacity-90 transition-smooth group min-w-[200px]"
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-0.5 transition-transform" />
              Get Free Demo
            </Button>
          </motion.div>

          <Button
            type="button"
            data-ocid="cta.whatsapp_button"
            size="lg"
            variant="outline"
            className="border-emerald-500/40 text-foreground hover:bg-emerald-500/10 hover:border-emerald-500/60 font-semibold text-base px-8 py-6 rounded-xl transition-smooth min-w-[200px]"
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
          >
            <MessageCircle className="w-5 h-5 mr-2 text-emerald-400" />
            Chat on WhatsApp
          </Button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {trustItems.map(({ icon: Icon, text }) => (
            <motion.div
              key={text}
              className="flex items-center gap-2 rounded-full px-4 py-2"
              whileHover={{ scale: 1.05, y: -2 }}
              style={{
                background: "oklch(0.12 0.03 265 / 0.6)",
                border: "1px solid oklch(0.62 0.26 265 / 0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground text-sm font-medium">
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* India flag note */}
        <motion.p
          className="text-muted-foreground/50 text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          🇮🇳 Proudly serving local businesses across India
        </motion.p>
      </div>
    </section>
  );
}
