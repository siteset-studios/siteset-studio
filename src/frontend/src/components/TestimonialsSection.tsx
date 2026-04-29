import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Testimonial } from "@/types/index";
import { Quote, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface IndianTestimonial extends Testimonial {
  city: string;
  business: string;
  metric: string;
}

const testimonials: IndianTestimonial[] = [
  {
    id: "rajesh-sharma",
    name: "Rajesh Sharma",
    role: "Owner",
    company: "Glamour Hair Studio",
    business: "Hair Salon",
    city: "Mumbai",
    avatar: "RS",
    content:
      "Our bookings went up 3x in the first month! Earlier we relied only on word of mouth. Now customers find us on Google and book directly. Siteset Studio changed everything.",
    rating: 5,
    metric: "3x more bookings",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Founder",
    company: "FitLife Studio",
    business: "Fitness Studio",
    city: "Bangalore",
    avatar: "PN",
    content:
      "Finally our clients can find us on Google! We were invisible before. Now we rank on page one and get 20–30 new inquiries every week. Worth every rupee.",
    rating: 5,
    metric: "20+ leads/week",
  },
  {
    id: "ahmed-khan",
    name: "Ahmed Khan",
    role: "Manager",
    company: "Spice Garden Restaurant",
    business: "Restaurant",
    city: "Delhi",
    avatar: "AK",
    content:
      "We get daily inquiries through our website now. Table reservations are up and our weekend slots are always full. Best investment for the restaurant.",
    rating: 5,
    metric: "Full weekend bookings",
  },
  {
    id: "sunita-gupta",
    name: "Sunita Gupta",
    role: "Director",
    company: "Bright Future Coaching",
    business: "Coaching Centre",
    city: "Jaipur",
    avatar: "SG",
    content:
      "500+ leads generated in 3 months! Parents find us first now. Admissions this year doubled compared to last year. Superb results and fast delivery.",
    rating: 5,
    metric: "2x admissions",
  },
  {
    id: "amit-verma",
    name: "Amit Verma",
    role: "Owner",
    company: "FitZone Gym",
    business: "Gym",
    city: "Pune",
    avatar: "AV",
    content:
      "New memberships increased by 40% after launch! The website looks premium and our customers love it. Very professional team at Siteset Studio.",
    rating: 5,
    metric: "+40% memberships",
  },
  {
    id: "meera-joshi",
    name: "Meera Joshi",
    role: "Founder",
    company: "Meera Bridal Studio",
    business: "Bridal Studio",
    city: "Surat",
    avatar: "MJ",
    content:
      "We got booked 3 months in advance after our website launched. Brides from across Gujarat are finding us online. Absolutely worth the investment.",
    rating: 5,
    metric: "Booked 3 months ahead",
  },
];

// Row 1: indices 0,1,2 flow left→right. Row 2: indices 3,4,5 flow right→left.
const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

const avatarGradients = [
  "from-violet-500 to-blue-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-violet-600",
];

const socialProofStats = [
  { value: "50+", label: "Businesses Served", icon: Users },
  { value: "500+", label: "Leads Generated", icon: TrendingUp },
  { value: "4.9★", label: "Average Rating", icon: Star },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, k) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static stars
        <Star key={k} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  index,
}: {
  t: IndianTestimonial;
  index: number;
}) {
  const gradClass = avatarGradients[index % avatarGradients.length];

  return (
    <div
      data-ocid={`testimonials.item.${index + 1}`}
      className="group relative flex-shrink-0 w-72 flex flex-col p-5 rounded-2xl glass border border-white/[0.07] hover:border-primary/30 transition-smooth shadow-subtle hover:shadow-elevated overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.6 0.23 265 / 0.1) 0%, transparent 70%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

      {/* Top row */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20">
          <Quote className="w-3.5 h-3.5 text-primary" />
        </div>
        <StarRating count={t.rating} />
      </div>

      {/* Metric */}
      <div className="mb-3 relative z-10">
        <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5 tracking-wide uppercase">
          📈 {t.metric}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-foreground/85 text-xs leading-relaxed flex-1 relative z-10 mb-4">
        "{t.content}"
      </blockquote>

      <div className="h-px bg-border/50 mb-4 relative z-10" />

      {/* Author */}
      <div className="flex items-center gap-2.5 relative z-10">
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-white text-[10px] font-bold font-display shrink-0`}
        >
          {t.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-semibold text-foreground text-xs leading-none mb-0.5">
            {t.name}
          </p>
          <p className="text-muted-foreground text-[10px] truncate">
            {t.business} · {t.city}
          </p>
        </div>
        <span className="text-[9px] font-semibold text-primary/70 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-full shrink-0">
          Verified
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({
  cards,
  direction,
  startIndex,
}: {
  cards: IndianTestimonial[];
  direction: "left" | "right";
  startIndex: number;
}) {
  // Duplicate cards for seamless loop
  const doubled = [...cards, ...cards];
  const rowRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    // Pure CSS animation driven by a keyframe set in inline style
  }, []);

  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";
  const duration = `${cards.length * 14}s`;

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={rowRef}
        className="flex gap-4"
        style={{
          animation: `${animName} ${duration} linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard
            // biome-ignore lint/suspicious/noArrayIndexKey: marquee duplicate
            key={`${t.id}-${i}`}
            t={t}
            index={(startIndex + (i % cards.length)) % avatarGradients.length}
          />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.06,
  });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-dark py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Background decorations */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-[0.05] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.6 0.23 265) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4 font-body">
            — Real Results —
          </span>
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-foreground mb-4">
            What Our{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Clients Say
            </span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            50+ Indian businesses growing online. Real numbers, real growth,
            real stories.
          </p>
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-10"
        >
          {socialProofStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center py-3 px-2 rounded-xl glass border border-white/[0.06]"
              >
                <Icon className="w-3.5 h-3.5 text-primary mx-auto mb-1 opacity-70" />
                <div className="font-display font-extrabold text-xl text-primary">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-[10px] mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Row 1: left → right */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4"
          data-ocid="testimonials.list"
        >
          <MarqueeRow cards={row1} direction="left" startIndex={0} />
        </motion.div>

        {/* Row 2: right → left */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32 }}
        >
          <MarqueeRow cards={row2} direction="right" startIndex={3} />
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Join{" "}
            <span className="text-foreground font-semibold">
              50+ local businesses
            </span>{" "}
            across India already growing with Siteset Studio 🇮🇳
          </p>
        </motion.div>
      </div>
    </section>
  );
}
