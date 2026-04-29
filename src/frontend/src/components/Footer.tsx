import { Mail, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "sitesetstudios.com",
  )}`;

  return (
    <footer
      className="relative border-t border-border/20 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.08 0.025 265) 0%, oklch(0.05 0.01 265) 60%, oklch(0.07 0.015 265) 100%)",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.62 0.26 265 / 0.5) 40%, oklch(0.62 0.26 265 / 0.5) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.62 0.26 265 / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 py-12">
        {/* 3-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center">
          {/* LEFT — Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2.5 group"
              aria-label="Siteset Studios — scroll to top"
            >
              <img
                src="/assets/generated/siteset-studio-logo-transparent.dim_200x200.png"
                alt="Siteset Studios logo"
                className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <span className="font-display text-lg font-bold text-foreground tracking-tight">
                Siteset Studios
              </span>
            </button>
            <p className="text-muted-foreground text-sm text-center md:text-left leading-snug max-w-[220px]">
              Building India's Best Local Business Websites
            </p>
          </div>

          {/* CENTER — Contact details */}
          <div className="flex flex-col items-center gap-4">
            <a
              href="mailto:sitesetstudios@gmail.com"
              data-ocid="footer.email_link"
              className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border border-border/30 group-hover:border-primary/40 transition-colors duration-200"
                style={{ background: "oklch(0.14 0.025 265)" }}
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
              </span>
              sitesetstudios@gmail.com
            </a>

            <a
              href="tel:+919330138050"
              data-ocid="footer.phone_link"
              className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border border-border/30 group-hover:border-primary/40 transition-colors duration-200"
                style={{ background: "oklch(0.14 0.025 265)" }}
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
              </span>
              +91 93301 38050
            </a>

            <a
              href="https://wa.me/919330138050?text=Hi%20Siteset%20Studio!"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.whatsapp_button"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300"
              style={{
                background: "oklch(0.35 0.12 145 / 0.12)",
                borderColor: "oklch(0.55 0.18 145 / 0.30)",
                color: "oklch(0.75 0.2 145)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "oklch(0.35 0.12 145 / 0.25)";
                el.style.boxShadow = "0 0 18px oklch(0.55 0.18 145 / 0.25)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "oklch(0.35 0.12 145 / 0.12)";
                el.style.boxShadow = "none";
              }}
            >
              <SiWhatsapp className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* RIGHT — Legal */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-muted-foreground text-xs">
              © {year} Siteset Studios. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs">
              Built with love using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
