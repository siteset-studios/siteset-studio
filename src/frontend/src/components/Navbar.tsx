import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useScrollAnimation";
import type { NavLink } from "../types";

const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["services", "portfolio", "pricing", "contact"];

// Use import.meta.env.BASE_URL so it works in both dev and production builds
const logoSrc = `${import.meta.env.BASE_URL}assets/siteset-logo-user.png`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGetDemo = () => {
    setIsOpen(false);
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled ? "glass-navbar shadow-elevated" : "bg-transparent"
      }`}
      data-ocid="navbar"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo + Brand Name */}
          <button
            type="button"
            className="flex items-center gap-3 bg-transparent border-0 p-0 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-ocid="navbar.logo.link"
            aria-label="Siteset Studios — back to top"
          >
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logoSrc}
                alt="Siteset Studios logo"
                className="h-9 w-auto object-contain flex-shrink-0"
                style={{ maxWidth: "44px" }}
                onError={(e) => {
                  // fallback: hide broken image
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-[17px] sm:text-[19px] font-bold text-foreground tracking-tight leading-none">
                Siteset Studios
              </span>
            </motion.div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-smooth rounded-lg group ${
                  activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                data-ocid={`navbar.${link.label.toLowerCase()}.link`}
              >
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, oklch(0.58 0.22 265 / 0.12) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <span className="relative group-hover:text-foreground transition-colors duration-200">
                  {link.label}
                </span>
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 6px oklch(0.58 0.22 265 / 0.8)" }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                onClick={handleGetDemo}
                className="font-semibold px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground glow-btn transition-smooth"
                data-ocid="navbar.get_demo.primary_button"
              >
                Get Free Demo
              </Button>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-foreground hover:bg-muted/30 transition-smooth active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            data-ocid="navbar.menu.toggle"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden glass-navbar border-t border-border/20 overflow-hidden"
            data-ocid="navbar.mobile_menu"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-smooth"
                  data-ocid={`navbar.mobile.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 pb-1">
                <Button
                  type="button"
                  onClick={handleGetDemo}
                  className="w-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground glow-btn transition-smooth"
                  data-ocid="navbar.mobile.get_demo.primary_button"
                >
                  Get Free Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
