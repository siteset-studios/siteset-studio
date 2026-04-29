import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* ─── BEFORE PANEL — Intentionally awful 2000s website ──────────── */

function BeforePanel() {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: "#c0c0c0", fontFamily: "Arial, sans-serif" }}
    >
      {/* Ugly yellow nav bar */}
      <div
        style={{
          background: "#ffff00",
          borderBottom: "3px solid #ff0000",
          borderTop: "3px solid #0000ff",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "Impact, sans-serif",
            fontSize: "11px",
            color: "#800080",
            textShadow: "1px 1px 0 #ff00ff",
            letterSpacing: "1px",
          }}
        >
          ★ RAJU SALON ★
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {["HOME", "ABOUT", "GALERY", "CONTECT"].map((l) => (
            <span
              key={l}
              style={{
                fontSize: "7px",
                fontFamily: "Comic Sans MS, cursive",
                color: "#0000ff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee bar */}
      <div
        style={{
          background: "#ff0000",
          padding: "2px 6px",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "Comic Sans MS, cursive",
            fontSize: "7px",
            color: "#ffff00",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          🌟 BEST SALON IN TOWN!!! CALL NOW!!! 9999-XXXXXX 🌟 OPEN ALL DAYS!!!
          NEW OFFER!!! 🌟
        </span>
      </div>

      {/* Hero — cluttered lime green chaos */}
      <div
        style={{
          background: "#00ff00",
          border: "4px dashed #ff00ff",
          padding: "6px",
          flexShrink: 0,
          display: "flex",
          gap: "6px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "Impact, sans-serif",
              fontSize: "13px",
              color: "#ff0000",
              textShadow: "2px 2px 0 #000",
              margin: "0 0 3px 0",
              lineHeight: 1.1,
            }}
          >
            RAJU HAIR SALON &amp; BEAUTY PARLOR
          </p>
          <p
            style={{
              fontFamily: "Comic Sans MS, cursive",
              fontSize: "7px",
              color: "#000080",
              margin: "0 0 4px 0",
            }}
          >
            Best haircut in whole area!! Discount 50% today!!!
          </p>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            <span
              style={{
                background: "#ff6600",
                color: "#ffffff",
                fontFamily: "Impact",
                fontSize: "7px",
                padding: "2px 5px",
                border: "2px solid #000",
              }}
            >
              CALL NOW!!
            </span>
            <span
              style={{
                background: "#0000ff",
                color: "#ffff00",
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "7px",
                padding: "2px 5px",
                border: "2px solid #ff0000",
              }}
            >
              FREE DEMO
            </span>
          </div>
        </div>
        {/* Under construction badge */}
        <div
          style={{
            width: "52px",
            background: "#ffff00",
            border: "3px solid #ff0000",
            padding: "3px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: "14px" }}>🚧</div>
          <p
            style={{
              fontFamily: "Comic Sans MS, cursive",
              fontSize: "5px",
              color: "#ff0000",
              fontWeight: "bold",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            UNDER
            <br />
            CONSTRUCTION
          </p>
        </div>
      </div>

      {/* Hot pink blink text */}
      <div
        style={{
          background: "#ff00ff",
          padding: "2px 6px",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "Comic Sans MS, cursive",
            fontSize: "7px",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          ✨ LIMITED OFFER!!! DONT MISS!!! ONLY 3 SLOTS LEFT!!! ✨
        </span>
      </div>

      {/* Body — table-like two columns */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "4px",
          padding: "6px",
          background: "#c0c0c0",
          overflow: "hidden",
        }}
      >
        {/* Left column */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div
            style={{
              background: "#ffffcc",
              border: "2px solid #cc0000",
              padding: "4px",
            }}
          >
            <p
              style={{
                fontFamily: "Impact",
                fontSize: "7px",
                color: "#cc0000",
                margin: "0 0 3px 0",
                textTransform: "uppercase",
              }}
            >
              Our Serviecs:
            </p>
            {["Hair Cut", "Colour", "Facial", "Bridal", "Massage"].map((s) => (
              <p
                key={s}
                style={{
                  fontFamily: "Comic Sans MS, cursive",
                  fontSize: "6px",
                  color: "#000080",
                  margin: "1px 0",
                }}
              >
                &gt;&gt; {s}
              </p>
            ))}
          </div>
          <div
            style={{
              background: "#ff9900",
              border: "3px dashed #000",
              padding: "3px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Impact",
                fontSize: "7px",
                color: "#ffffff",
                margin: 0,
                textShadow: "1px 1px 0 #000",
              }}
            >
              CLICK HERE WIN PRIZE!!!
            </p>
          </div>
        </div>

        {/* Right column */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div
            style={{
              background: "#e0e0ff",
              border: "2px solid #0000cc",
              padding: "4px",
            }}
          >
            <p
              style={{
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "7px",
                color: "#000080",
                fontWeight: "bold",
                margin: "0 0 3px 0",
              }}
            >
              Contact Us
            </p>
            <p
              style={{
                fontFamily: "Arial",
                fontSize: "6px",
                color: "#333",
                margin: "1px 0",
              }}
            >
              📞 9999-XXXXXX
            </p>
            <p
              style={{
                fontFamily: "Arial",
                fontSize: "6px",
                color: "#333",
                margin: "1px 0",
              }}
            >
              📧 rajusalon@gmail.com
            </p>
            <p
              style={{
                fontFamily: "Arial",
                fontSize: "6px",
                color: "#333",
                margin: "1px 0",
              }}
            >
              📍 Near Bus Stand
            </p>
          </div>
          <div
            style={{
              background: "#00ffff",
              border: "2px solid #ff00ff",
              padding: "3px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "6px",
                color: "#ff0000",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              VISITOR COUNT:
              <br />
              <span style={{ fontSize: "10px", fontFamily: "Impact" }}>
                00000247
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#808080",
          borderTop: "2px solid #000",
          padding: "2px 6px",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: "Comic Sans MS, cursive",
            fontSize: "5px",
            color: "#ffff00",
            textAlign: "center",
            margin: 0,
          }}
        >
          © 2003 Raju Salon | Best Viewed in Internet Explorer 6.0 | 800x600
        </p>
      </div>
    </div>
  );
}

/* ─── AFTER PANEL — Luxury Dark Gold aesthetic ────────────────────── */
/* Same business: Raju Hair Salon & Beauty Parlor — redesigned luxuriously */

function AfterPanel() {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0f0e09 0%, #1a180d 50%, #0d0c08 100%)",
        color: "#e8d5a0",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Gold shimmer top bar */}
      <div
        style={{
          background: "linear-gradient(90deg, #c9a84c, #f0d060, #c9a84c)",
          height: "2px",
          flexShrink: 0,
        }}
      />

      {/* Browser chrome dots */}
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          padding: "5px 10px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ff5f57",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#febc2e",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#28c840",
            display: "inline-block",
          }}
        />
        <div
          style={{
            flex: 1,
            marginLeft: 8,
            height: 13,
            borderRadius: 20,
            background: "rgba(212,168,23,0.12)",
            border: "1px solid rgba(212,168,23,0.2)",
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
          }}
        >
          <span
            style={{
              fontSize: 6.5,
              color: "rgba(212,168,23,0.55)",
              letterSpacing: "0.3px",
            }}
          >
            🔒 rajusalon.in
          </span>
        </div>
      </div>

      {/* Elegant navbar */}
      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(212,168,23,0.18)",
          padding: "6px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Gold monogram */}
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c9a84c, #f0d060)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 8px rgba(212,168,23,0.5)",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: "#0f0e09",
                fontFamily: "Georgia, serif",
              }}
            >
              R
            </span>
          </div>
          <div>
            <p
              style={{
                fontSize: 7.5,
                fontWeight: 700,
                color: "#e8d5a0",
                margin: 0,
                letterSpacing: "0.8px",
                fontFamily: "Georgia, serif",
              }}
            >
              RAJU SALON
            </p>
            <p
              style={{
                fontSize: 5,
                color: "rgba(212,168,23,0.6)",
                margin: 0,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              & Beauty Parlor
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {["Services", "Gallery", "About"].map((l) => (
            <span
              key={l}
              style={{
                fontSize: 6.5,
                color: "rgba(232,213,160,0.5)",
                letterSpacing: "0.3px",
              }}
            >
              {l}
            </span>
          ))}
          <div
            style={{
              background: "linear-gradient(135deg, #c9a84c, #f0d060)",
              borderRadius: 4,
              padding: "3px 8px",
              boxShadow: "0 0 10px rgba(212,168,23,0.4)",
            }}
          >
            <span
              style={{
                fontSize: 6.5,
                fontWeight: 700,
                color: "#0f0e09",
                fontFamily: "Georgia, serif",
              }}
            >
              Book Now →
            </span>
          </div>
        </div>
      </div>

      {/* Hero area */}
      <div
        style={{
          padding: "14px 16px 10px",
          background:
            "linear-gradient(160deg, rgba(212,168,23,0.07) 0%, transparent 60%)",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gold circle blur */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,168,23,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Gold accent line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              height: 1,
              width: 18,
              background: "linear-gradient(90deg, transparent, #c9a84c)",
            }}
          />
          <p
            style={{
              fontSize: 6,
              color: "#c9a84c",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              margin: 0,
              fontFamily: "Georgia, serif",
            }}
          >
            Est. 2005 · Excellence Redefined
          </p>
          <div
            style={{
              height: 1,
              width: 18,
              background: "linear-gradient(90deg, #c9a84c, transparent)",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#f0e8c8",
            lineHeight: 1.2,
            margin: "0 0 4px 0",
            letterSpacing: "-0.2px",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          Where Every Visit
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #c9a84c, #f0d060, #c9a84c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "normal",
              fontWeight: 800,
            }}
          >
            Becomes an Experience
          </span>
        </h2>

        <p
          style={{
            fontSize: 6.5,
            color: "rgba(232,213,160,0.55)",
            lineHeight: 1.6,
            margin: "0 0 8px 0",
            maxWidth: "70%",
            fontFamily: "Georgia, serif",
          }}
        >
          Expert stylists. Personalized care. Premium products. Serving Mumbai
          with distinction since 2005.
        </p>

        <div style={{ display: "flex", gap: 6 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #c9a84c, #f0d060)",
              borderRadius: 4,
              padding: "4px 10px",
              boxShadow: "0 4px 14px rgba(212,168,23,0.35)",
            }}
          >
            <span
              style={{
                fontSize: 7,
                fontWeight: 700,
                color: "#0f0e09",
                fontFamily: "Georgia, serif",
              }}
            >
              Book Appointment
            </span>
          </div>
          <div
            style={{
              borderRadius: 4,
              padding: "4px 10px",
              border: "1px solid rgba(212,168,23,0.3)",
              background: "rgba(212,168,23,0.06)",
            }}
          >
            <span
              style={{
                fontSize: 7,
                color: "rgba(232,213,160,0.65)",
                fontFamily: "Georgia, serif",
              }}
            >
              View Gallery
            </span>
          </div>
        </div>
      </div>

      {/* Gold divider with ornament */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "4px 16px",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(212,168,23,0.3))",
          }}
        />
        <span style={{ fontSize: 8, color: "rgba(212,168,23,0.5)" }}>✦</span>
        <div
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(212,168,23,0.3), transparent)",
          }}
        />
      </div>

      {/* Services strip */}
      <div
        style={{
          display: "flex",
          gap: 0,
          padding: "4px 14px 6px",
          justifyContent: "space-around",
          flexShrink: 0,
        }}
      >
        {[
          { icon: "✂️", label: "Hair Cut", price: "₹499+" },
          { icon: "💆", label: "Facial", price: "₹999+" },
          { icon: "💅", label: "Nail Art", price: "₹799+" },
          { icon: "👰", label: "Bridal", price: "Custom" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              padding: "5px 6px",
              borderRadius: 6,
              background: "rgba(212,168,23,0.06)",
              border: "1px solid rgba(212,168,23,0.14)",
              minWidth: 38,
            }}
          >
            <div style={{ fontSize: 10, marginBottom: 2 }}>{s.icon}</div>
            <p
              style={{
                fontSize: 5.5,
                fontWeight: 600,
                color: "#e8d5a0",
                margin: 0,
                fontFamily: "Georgia, serif",
              }}
            >
              {s.label}
            </p>
            <p style={{ fontSize: 5, color: "#c9a84c", margin: 0 }}>
              {s.price}
            </p>
          </div>
        ))}
      </div>

      {/* Trust strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "4px 14px",
          borderTop: "1px solid rgba(212,168,23,0.1)",
          background: "rgba(0,0,0,0.3)",
          flexShrink: 0,
        }}
      >
        {["⭐ 4.9 Rating", "2000+ Clients", "📍 Mumbai"].map((b) => (
          <span
            key={b}
            style={{
              fontSize: 5.5,
              color: "rgba(232,213,160,0.45)",
              fontWeight: 500,
            }}
          >
            {b}
          </span>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div
        style={{
          padding: "5px 14px",
          background:
            "linear-gradient(90deg, rgba(212,168,23,0.1), rgba(212,168,23,0.04))",
          borderTop: "1px solid rgba(212,168,23,0.18)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: 6.5,
            color: "rgba(232,213,160,0.5)",
            margin: 0,
            fontFamily: "Georgia, serif",
          }}
        >
          📍 Bandra West, Mumbai
        </p>
        <div
          style={{
            background: "rgba(212,168,23,0.15)",
            border: "1px solid rgba(212,168,23,0.35)",
            borderRadius: 20,
            padding: "2px 8px",
          }}
        >
          <span style={{ fontSize: 6, color: "#c9a84c", fontWeight: 600 }}>
            Open Now ◆
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Slider Component ──────────────────────────────────────── */

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(35);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.15,
  });

  const getNewPos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const x = clientX - rect.left;
    return Math.min(Math.max((x / rect.width) * 100, 5), 95);
  }, []);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) setSliderPos(getNewPos(e.clientX));
    },
    [isDragging, getNewPos],
  );

  const handleTouchStart = useCallback(() => setIsDragging(true), []);
  const handleTouchEnd = useCallback(() => setIsDragging(false), []);
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) setSliderPos(getNewPos(e.touches[0].clientX));
    },
    [isDragging, getNewPos],
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchMove, handleTouchEnd]);

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) setSliderPos(getNewPos(e.clientX));
    },
    [isDragging, getNewPos],
  );

  return (
    <section
      ref={sectionRef}
      id="before-after"
      className="relative py-24 lg:py-32 section-dark overflow-hidden"
      data-ocid="before_after.section"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
          data-ocid="before_after.heading"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-10 bg-primary/60" />
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase font-body">
              Transformation
            </span>
            <span className="h-px w-10 bg-primary/60" />
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5 leading-tight tracking-tight">
            See The{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #60a5fa 0%, #2563eb 50%, #1d4ed8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Difference
            </span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed font-body">
            Drag the divider to reveal the transformation — from an outdated,
            forgettable page to a premium, high-converting website.
          </p>
        </motion.div>

        {/* Panel labels above slider */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-between items-end mb-3 max-w-3xl mx-auto px-1"
        >
          {/* Before label */}
          <div className="flex flex-col items-start">
            <span
              className="text-xs font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(239,68,68,0.12)",
                color: "#f87171",
                border: "1px solid rgba(239,68,68,0.25)",
                letterSpacing: "0.12em",
              }}
              data-ocid="before_after.before_label"
            >
              BEFORE ❌
            </span>
            <span
              className="text-[10px] mt-1 font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Your Old Website
            </span>
          </div>

          {/* After label — gold themed */}
          <div className="flex flex-col items-end">
            <span
              className="text-xs font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(212,168,23,0.15)",
                color: "#f0d060",
                border: "1px solid rgba(212,168,23,0.35)",
                boxShadow: "0 0 14px rgba(212,168,23,0.2)",
                letterSpacing: "0.12em",
              }}
              data-ocid="before_after.after_label"
            >
              AFTER ✨
            </span>
            <span
              className="text-[10px] mt-1 font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Your New Website
            </span>
          </div>
        </motion.div>

        {/* Slider container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.97 }
          }
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl"
          data-ocid="before_after.slider"
          style={{ perspective: "1200px" }}
        >
          {/* 3D perspective frame */}
          <div
            style={{
              borderRadius: "18px",
              padding: "3px",
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.5) 0%, rgba(37,99,235,0.1) 40%, rgba(212,168,23,0.15) 60%, rgba(212,168,23,0.4) 100%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05), 0 30px 80px rgba(0,0,0,0.55), 0 0 40px rgba(37,99,235,0.1)",
            }}
          >
            <div
              ref={containerRef}
              role="slider"
              aria-valuenow={Math.round(sliderPos)}
              aria-valuemin={5}
              aria-valuemax={95}
              aria-label="Before/After comparison slider"
              tabIndex={0}
              onClick={handleContainerClick}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft")
                  setSliderPos((p) => Math.max(5, p - 2));
                if (e.key === "ArrowRight")
                  setSliderPos((p) => Math.min(95, p + 2));
              }}
              className="relative w-full overflow-hidden"
              style={{
                height: "clamp(340px, 46vw, 500px)",
                cursor: isDragging ? "grabbing" : "col-resize",
                userSelect: "none",
                borderRadius: "16px",
              }}
            >
              {/* AFTER panel (full background) */}
              <div className="absolute inset-0">
                <AfterPanel />
              </div>

              {/* BEFORE panel (clipped left) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <div className="absolute inset-0">
                  <BeforePanel />
                </div>
              </div>

              {/* Divider line with dual glow (red on left, gold on right) */}
              <div
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{
                  left: `${sliderPos}%`,
                  transform: "translateX(-50%)",
                  width: "2px",
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0.9) 90%, transparent 100%)",
                  boxShadow:
                    "0 0 14px 3px rgba(255,255,255,0.35), -4px 0 12px rgba(239,68,68,0.2), 4px 0 12px rgba(212,168,23,0.2)",
                }}
              />

              {/* Drag handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                style={{ left: `${sliderPos}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #fff 0%, #f5f0e0 100%)",
                    border: "3px solid transparent",
                    backgroundClip: "padding-box",
                    boxShadow: isDragging
                      ? "0 0 0 3px rgba(212,168,23,0.4), -2px 0 8px rgba(239,68,68,0.3), 2px 0 8px rgba(212,168,23,0.3), 0 4px 20px rgba(0,0,0,0.5)"
                      : "0 0 0 2px rgba(255,255,255,0.3), -2px 0 6px rgba(239,68,68,0.2), 2px 0 6px rgba(212,168,23,0.2), 0 4px 14px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: isDragging ? "grabbing" : "grab",
                    transform: isDragging ? "scale(1.12)" : "scale(1)",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    flexShrink: 0,
                  }}
                  data-ocid="before_after.drag_handle"
                >
                  {/* Chevron arrows */}
                  <div
                    style={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 1L1 6L6 11"
                        stroke="#555"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 1L7 6L2 11"
                        stroke="#555"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center text-muted-foreground text-xs mt-5 font-body select-none flex items-center justify-center gap-2"
          >
            <span style={{ color: "#f87171" }}>← Before</span>
            <span className="opacity-40">|</span>
            <span className="opacity-50">Drag to compare</span>
            <span className="opacity-40">|</span>
            <span style={{ color: "#f0d060" }}>After →</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
