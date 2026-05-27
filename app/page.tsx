"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/* ── Scroll-aware Navbar ─────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Categories", href: "#collection", num: "01" },
    { label: "Services",   href: "#expertise",  num: "02" },
    { label: "Projects",   href: "#projects",   num: "03" },
    { label: "Contact",    href: "#contact",    num: "04" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 lg:px-20 py-6 transition-all duration-700"
        style={{
          background: scrolled ? "rgba(10, 10, 10, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.04)"
            : "1px solid transparent",
        }}
      >
        <a href="#" className="shrink-0 relative z-[60]">
          <Image
            src="/logo.png"
            alt="CFS"
            width={120}
            height={48}
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[10px] tracking-[0.28em] text-[#A8A8A8] uppercase hover:text-[#F5F1EB] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        <motion.a
          href="https://wa.me/8618688246482"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ backgroundColor: "#BFA37A", borderColor: "#BFA37A", color: "#0E0E0E" }}
          transition={{ duration: 0.3, ease: EASE }}
          className="hidden md:inline-flex items-center border border-[#BFA37A] px-6 py-2.5 text-[9px] tracking-[0.4em] text-[#BFA37A] uppercase font-light cursor-pointer shrink-0"
          style={{ transition: "background-color 0.3s, color 0.3s, border-color 0.3s" }}
        >
          Request Catalogue
        </motion.a>

        {/* Mobile hamburger — above overlay (z-[60]) */}
        <button
          className="md:hidden relative z-[60] flex flex-col justify-center items-center w-10 h-10 gap-[5px] cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-px bg-[#F5F1EB] origin-center"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          />
          <motion.span
            className="block w-5 h-px bg-[#F5F1EB]"
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.22, ease: EASE }}
          />
          <motion.span
            className="block w-5 h-px bg-[#F5F1EB] origin-center"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          />
        </button>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.34, ease: EASE }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: "#0A0A0A" }}
          >
            {/* Subtle warm glow at top */}
            <div
              className="absolute top-0 inset-x-0 pointer-events-none"
              style={{
                height: "40%",
                background:
                  "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(191,163,122,0.04) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 flex flex-col flex-1 px-8 pt-[88px] pb-10 overflow-y-auto">

              {/* Section label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.06, ease: EASE }}
                className="text-[7px] tracking-[0.55em] text-[#40403C] uppercase mb-5"
              >
                Menu
              </motion.p>

              {/* Nav links — indexed, compact */}
              <nav className="flex flex-col border-t border-white/[0.05]">
                {navLinks.map(({ label, href, num }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.36, delay: 0.1 + i * 0.055, ease: EASE }}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between py-[14px] border-b border-white/[0.05]"
                    style={{ textDecoration: "none" }}
                  >
                    {/* Index + label */}
                    <div className="flex items-baseline gap-3.5">
                      <span
                        style={{
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "7px",
                          letterSpacing: "0.35em",
                          color: "#404040",
                        }}
                      >
                        {num}
                      </span>
                      <span
                        className="text-[#D8D2C8] group-hover:text-[#BFA37A] transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontWeight: 300,
                          fontSize: "clamp(1.2rem, 4.8vw, 1.5rem)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Arrow — fades in on hover */}
                    <svg
                      width="13"
                      height="6"
                      viewBox="0 0 13 6"
                      fill="none"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <path
                        d="M0 3H12M12 3L9 1M12 3L9 5"
                        stroke="#BFA37A"
                        strokeWidth="0.65"
                      />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              {/* CTA — sits directly below nav items */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: 0.36, ease: EASE }}
                className="mt-5"
              >
                <a
                  href="https://wa.me/8618688246482"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center border border-[#BFA37A]/50 py-3.5 text-[8px] tracking-[0.45em] text-[#BFA37A] uppercase font-light hover:border-[#BFA37A] transition-colors duration-300"
                >
                  Request Catalogue
                </a>
              </motion.div>

              {/* Contact — pinned to bottom, quiet */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.48, ease: EASE }}
                className="mt-auto pt-8 flex flex-col gap-1.5"
              >
                <p className="text-[6.5px] tracking-[0.5em] text-[#363632] uppercase mb-1">
                  Direct Contact
                </p>
                <a
                  href="mailto:chinacfsourcing.info@gmail.com"
                  className="font-light hover:text-[#BFA37A] transition-colors duration-300"
                  style={{ fontSize: "10px", color: "#525250", letterSpacing: "0.02em" }}
                >
                  chinacfsourcing.info@gmail.com
                </a>
                <a
                  href="tel:+8618688246482"
                  className="font-light hover:text-[#BFA37A] transition-colors duration-300"
                  style={{ fontSize: "10px", color: "#525250", letterSpacing: "0.02em" }}
                >
                  +86 186 8824 6482
                </a>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Scroll-triggered FadeIn ─────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── CountUp number animation ───────────────────────────── */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Static data ─────────────────────────────────────────── */

const processSteps = [
  {
    num: "01",
    title: "Consultation & Briefing",
    desc: "We begin by understanding your project scope, design language, and sourcing expectations to create a tailored procurement roadmap.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=90",
  },
  {
    num: "02",
    title: "China Factory Coordination",
    desc: "Direct coordination with verified manufacturing partners across Foshan and key production hubs — warm introductions, not cold sourcing.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=90",
  },
  {
    num: "03",
    title: "Product Development & Selection",
    desc: "From custom furniture to curated catalogue selections — every material, finish, and form refined to your project's exact specification.",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=90",
  },
  {
    num: "04",
    title: "Quality Control & Logistics",
    desc: "Every order undergoes rigorous production monitoring, pre-shipment audit, secure packaging, and international freight coordination.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=90",
  },
  {
    num: "05",
    title: "Installation & After-Sales Support",
    desc: "End-to-end site coordination, white-glove delivery, and installation guidance — with dedicated after-sales support post-handover.",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=90",
  },
];

/* ── Collection Data ─────────────────────────────────────── */
type CollectionItem = { src: string; alt: string };
type Category = {
  id: string;
  label: string;
  heading: string;
  description: string;
  coverImage: string;
  images: CollectionItem[];
};

const CATEGORIES: Category[] = [
  {
    id: "living",
    label: "Living Systems",
    heading: "Living Systems",
    description:
      "Precision-crafted sofa systems, modular seating, and lounge configurations sourced directly from China's finest upholstery ateliers — built for luxury residential and hospitality settings.",
    coverImage: "/categories/Living%20Systems/living-systems-1.jpg",
    images: [
      { src: "/categories/Living%20Systems/living-systems-1.jpg",  alt: "Living system sofa" },
      { src: "/categories/Living%20Systems/living-systems-2.jpg",  alt: "Modular seating" },
      { src: "/categories/Living%20Systems/living-systems-3.jpg",  alt: "Lounge configuration" },
      { src: "/categories/Living%20Systems/living-systems-4.jpg",  alt: "Luxury sofa" },
      { src: "/categories/Living%20Systems/living-systems-5.jpg",  alt: "Contemporary seating" },
      { src: "/categories/Living%20Systems/living-systems-6.jpg",  alt: "Editorial living" },
      { src: "/categories/Living%20Systems/living-systems-7.jpg",  alt: "Upholstered system" },
      { src: "/categories/Living%20Systems/living-systems-8.jpg",  alt: "Living room" },
      { src: "/categories/Living%20Systems/living-systems-9.jpg",  alt: "Sofa detail" },
      { src: "/categories/Living%20Systems/living-systems-10.jpg", alt: "Lounge interior" },
    ],
  },
  {
    id: "dining-bedroom",
    label: "Dining & Bedrooms",
    heading: "Dining & Bedrooms",
    description:
      "Sculptural dining tables, upholstered seating, platform beds, and bedroom case goods that define the rhythm of daily luxury living.",
    coverImage: "/categories/dining-bedroom/dining-bedroom%20_%201.jpg",
    images: [
      { src: "/categories/dining-bedroom/dining-bedroom%20_%201.jpg",  alt: "Dining table" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%202.jpg",  alt: "Modern dining" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%203.jpg",  alt: "Dining interior" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%204.jpg",  alt: "Dining space" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%205.jpg",  alt: "Bedroom suite" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%206.jpg",  alt: "Luxury bed" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%207.jpg",  alt: "Bedroom interior" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%208.jpg",  alt: "Bedroom detail" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%209.jpg",  alt: "Calm bedroom" },
      { src: "/categories/dining-bedroom/dining-bedroom%20_%2010.jpg", alt: "Dining room" },
    ],
  },
  {
    id: "office",
    label: "Office Furniture",
    heading: "Office Furniture",
    description:
      "Executive desks, conference systems, and ergonomic task seating engineered for high-performance environments — where design authority meets daily function.",
    coverImage: "/categories/office-furniture/office-furniture%20-%201.jpg",
    images: [
      { src: "/categories/office-furniture/office-furniture%20-%201.jpg",  alt: "Executive desk" },
      { src: "/categories/office-furniture/office-furniture%20-%202.jpg",  alt: "Premium workspace" },
      { src: "/categories/office-furniture/office-furniture%20-%203.jpg",  alt: "Minimal study" },
      { src: "/categories/office-furniture/office-furniture%20-%204.jpg",  alt: "Studio workspace" },
      { src: "/categories/office-furniture/office-furniture%20-%205.jpg",  alt: "Office interior" },
      { src: "/categories/office-furniture/office-furniture%20-%206.jpg",  alt: "Office design" },
      { src: "/categories/office-furniture/office-furniture%20-%207.jpg",  alt: "Conference setup" },
      { src: "/categories/office-furniture/office-furniture%20-%208.jpg",  alt: "Work environment" },
      { src: "/categories/office-furniture/office-furniture%20-%209.jpg",  alt: "Executive office" },
      { src: "/categories/office-furniture/office-furniture%20-%2010.jpg", alt: "Modern office" },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality Furniture",
    heading: "Hospitality Furniture",
    description:
      "Contract-grade furniture for five-star hotels, luxury resorts, and private clubs — durable, bespoke, and finished to the standard the world's best properties expect.",
    coverImage: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%201.jpg",
    images: [
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%201.jpg",  alt: "Hotel room" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%202.jpg",  alt: "Resort interior" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%203.jpg",  alt: "Hotel lobby" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%204.jpg",  alt: "Hotel suite" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%205.jpg",  alt: "Hospitality design" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%206.jpg",  alt: "Luxury lounge" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%207.jpg",  alt: "Hotel entrance" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%208.jpg",  alt: "Resort suite" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%209.jpg",  alt: "Hotel dining" },
      { src: "/categories/Hospitality%20Furniture/Hospitality%20Furniture%20-%2010.jpg", alt: "Hospitality interior" },
    ],
  },
  {
    id: "outdoor",
    label: "Outdoor Furniture",
    heading: "Outdoor Furniture",
    description:
      "Weather-resistant teak, powder-coated aluminium, and rope weave systems for terraces, pool decks, and garden pavilions — built to the same standard as every indoor collection.",
    coverImage: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%201.jpg",
    images: [
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%201.jpg",  alt: "Terrace furniture" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%202.jpg",  alt: "Outdoor living" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%203.jpg",  alt: "Pool terrace" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%204.jpg",  alt: "Outdoor seating" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%205.jpg",  alt: "Garden space" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%206.jpg",  alt: "Garden dining" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%207.jpg",  alt: "Patio lounge" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%208.jpg",  alt: "Outdoor luxury" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%209.jpg",  alt: "Terrace design" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%2010.jpg", alt: "Outdoor pavilion" },
      { src: "/categories/Outdoor%20Furniture/Outdoor%20Furniture%20-%2011.jpg", alt: "Garden furniture" },
    ],
  },
  {
    id: "lighting",
    label: "Lighting Solutions",
    heading: "Lighting Solutions",
    description:
      "Statement pendants, architectural floor lamps, and custom lighting systems that define the atmosphere of a space — sourced from China's most specialised lighting manufacturers.",
    coverImage: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%201.jpg",
    images: [
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%201.jpg",  alt: "Pendant lighting" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%202.jpg",  alt: "Interior lighting" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%203.jpg",  alt: "Decorative light" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%204.jpg",  alt: "Lamp detail" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%205.jpg",  alt: "Lighting fixture" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%206.jpg",  alt: "Statement pendant" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%207.jpg",  alt: "Table lamp" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%208.jpg",  alt: "Architectural light" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%209.jpg",  alt: "Light installation" },
      { src: "/categories/Lighting%20Solutions/Lighting%20Solutions%20-%2010.jpg", alt: "Luxury lighting" },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen & Wardrobes",
    heading: "Kitchen & Wardrobes",
    description:
      "Precision-crafted modular kitchen systems and bespoke fitted wardrobes tailored for contemporary luxury interiors — manufactured to millimetre accuracy.",
    coverImage: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%201.jpg",
    images: [
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%201.jpg",  alt: "Luxury kitchen" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%202.jpg",  alt: "Modern kitchen" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%203.jpg",  alt: "Kitchen design" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%204.jpg",  alt: "Kitchen space" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%205.jpg",  alt: "Minimal kitchen" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%206.jpg",  alt: "Wardrobe interior" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%207.jpg",  alt: "Fitted wardrobe" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%208.jpg",  alt: "Kitchen cabinetry" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%209.jpg",  alt: "Kitchen detail" },
      { src: "/categories/Kitchen%20%26%20Wardrobes/Kitchen%20%26%20Wardrobes%20-%2010.jpg", alt: "Wardrobe system" },
    ],
  },
  {
    id: "decor",
    label: "Home Decor",
    heading: "Home Decor",
    description:
      "Curated decorative objects, vases, sculptures, mirrors, and accent pieces that complete the narrative of a considered luxury interior.",
    coverImage: "/categories/Home%20Decor/Home%20Decor%20-1.jpg",
    images: [
      { src: "/categories/Home%20Decor/Home%20Decor%20-1.jpg",  alt: "Styled shelves" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-2.jpg",  alt: "Decor interior" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-3.jpg",  alt: "Decor objects" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-4.jpg",  alt: "Interior styling" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-5.jpg",  alt: "Decor collection" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-6.jpg",  alt: "Accent pieces" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-7.jpg",  alt: "Decorative detail" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-8.jpg",  alt: "Styled interior" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-9.jpg",  alt: "Home accessories" },
      { src: "/categories/Home%20Decor/Home%20Decor%20-10.jpg", alt: "Luxury decor" },
    ],
  },
  {
    id: "rugs",
    label: "Rugs & Upholstery",
    heading: "Rugs & Upholstery",
    description:
      "Hand-knotted rugs, performance fabrics, and bespoke upholstery materials that bring warmth, texture, and depth to luxury residential and hospitality interiors.",
    coverImage: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%201.jpg",
    images: [
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%201.jpg",  alt: "Luxury rug" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%202.jpg",  alt: "Textile detail" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%203.jpg",  alt: "Rug pattern" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%204.jpg",  alt: "Upholstery fabric" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%205.jpg",  alt: "Fabric texture" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%206.jpg",  alt: "Upholstered seating" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%207.jpg",  alt: "Rug collection" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%208.jpg",  alt: "Textile interior" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%209.jpg",  alt: "Rug detail" },
      { src: "/categories/Rugs%20%26%20Upholstery/Rugs%20%26%20Upholstery%20-%2010.jpg", alt: "Upholstery system" },
    ],
  },
];

/* ── OurCollection ───────────────────────────────────────── */
function OurCollection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? (CATEGORIES.find((c) => c.id === selectedId) ?? null)
    : null;

  useEffect(() => {
    if (selectedId) {
      setTimeout(() => {
        document
          .getElementById("collection-detail")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 240);
    }
  }, [selectedId]);

  const handleSelect = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

  return (
    <section
      id="collection"
      className="relative bg-[#0E0E0E] pt-14 md:pt-[64px] pb-[100px] px-5 md:px-14 lg:px-20"
    >
      {/* Section header */}
      <FadeIn className="mb-8 md:mb-10 text-center">
        <p className="text-[8px] tracking-[0.55em] text-[#BFA37A] uppercase mb-3 md:mb-4">
          01 — Categories
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(1.45rem, 2.6vw, 2.2rem)",
            letterSpacing: "0.04em",
            color: "#F5F1EB",
            lineHeight: 1.15,
          }}
        >
          Categories We Cater
        </h2>
      </FadeIn>

      {/* 9-card category grid — 3 cols desktop, 2 cols mobile */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-[7px]">
        {CATEGORIES.map((cat, i) => {
          const isSelected = selectedId === cat.id;
          return (
            <FadeIn key={cat.id} delay={i * 0.05}>
              <motion.div
                className="relative overflow-hidden cursor-pointer group"
                style={{ aspectRatio: "3/4" }}
                onClick={() => handleSelect(cat.id)}
                whileTap={{ scale: 0.997 }}
              >
                {/* Image */}
                <motion.img
                  src={cat.coverImage}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.95, ease: EASE }}
                />

                {/* Permanent gradient — bottom up */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/8" />

                {/* Hover darkening */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-600" />

                {/* Selected gold border */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key="border"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 border border-[#BFA37A]/55 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Card text — bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-4 md:px-5 pb-4 md:pb-5">
                  <p className="text-[6.5px] tracking-[0.48em] text-[#BFA37A] uppercase mb-1.5 font-light">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 300,
                      fontSize: "clamp(0.88rem, 1.5vw, 1.25rem)",
                      letterSpacing: "0.04em",
                      color: "#F5F1EB",
                      lineHeight: 1.2,
                    }}
                  >
                    {cat.label}
                  </h3>
                  {/* Hover CTA — max-h reveal: never overlaps name above */}
                  <div className="mt-1.5 max-h-0 group-hover:max-h-7 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    <div className="pt-1.5 flex items-center gap-2">
                      <div className="w-3.5 h-px bg-[#BFA37A] shrink-0" />
                      <span className="text-[6.5px] tracking-[0.42em] text-[#BFA37A] uppercase whitespace-nowrap">
                        {isSelected ? "Close" : "Explore"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          );
        })}
      </div>

      {/* ── Detail panel — expands below the grid on click ── */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            id="collection-detail"
            key={selected.id + "_detail"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.58, ease: EASE }}
            className="max-w-[1400px] mx-auto mt-14 scroll-mt-28"
          >
            {/* Thin gold separator */}
            <div className="w-full h-px bg-[#BFA37A] opacity-18 mb-10" />

            {/* Header row */}
            <div className="flex items-start justify-between gap-8 mb-10">
              <div className="min-w-0">
                <p className="text-[8px] tracking-[0.55em] text-[#BFA37A] uppercase mb-4">
                  CFS — {selected.label}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                    letterSpacing: "0.02em",
                    color: "#F5F1EB",
                    lineHeight: 1.1,
                  }}
                >
                  {selected.heading}
                </h3>
                <p className="mt-5 text-[13px] text-[#A8A8A8] font-light leading-[2] max-w-[580px]">
                  {selected.description}
                </p>
              </div>

              {/* Close */}
              <button
                onClick={() => setSelectedId(null)}
                className="shrink-0 flex items-center gap-3 group/close cursor-pointer mt-1"
              >
                <span className="text-[8px] tracking-[0.4em] text-[#5A5350] group-hover/close:text-[#BFA37A] uppercase transition-colors duration-300">
                  Close
                </span>
                <div className="w-8 h-8 border border-white/10 group-hover/close:border-[#BFA37A]/40 flex items-center justify-center transition-colors duration-300">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="#5A5350"
                    strokeWidth="0.9"
                    className="group-hover/close:stroke-[#BFA37A] transition-[stroke] duration-300"
                  >
                    <line x1="1" y1="1" x2="9" y2="9" />
                    <line x1="9" y1="1" x2="1" y2="9" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Image grid — 4 cols desktop, 2 cols mobile, all 4:3 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[7px]">
              {selected.images.map((img, i) => (
                <motion.div
                  key={img.src + i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.055, ease: EASE }}
                  className="relative overflow-hidden group/img"
                  style={{ aspectRatio: "4/3" }}
                >
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.85, ease: EASE }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.08]" />
    </section>
  );
}

/* ── Expertise Data ─────────────────────────────────────── */
const SERVICES = [
  {
    id: "sourcing",
    num: "01",
    heading: "Factory Sourcing",
    tagline: "Direct access to our network of 90+ verified manufacturers.",
    description:
      "We maintain deep relationships with over 90 vetted factories across China's key manufacturing regions — from Foshan's furniture belt to Guangdong's upholstery specialists. Our introductions are warm, not cold: every factory we present has been visited, audited, and benchmarked against your specific brief.",
    subServices: [
      "Factory introductions & negotiations",
      "MOQ guidance",
      "Factory audits",
      "Sample coordination",
      "Price benchmarking",
    ],
  },
  {
    id: "quality",
    num: "02",
    heading: "Quality Control",
    tagline: "Rigorous inspections and material testing before shipment.",
    description:
      "Quality is not a checkbox — it is a standard built into every stage of production. Our on-the-ground QC team conducts material inspections, mid-production checks, and full pre-shipment audits to ensure every piece leaving the factory meets the specification your client expects.",
    subServices: [
      "Material & hardware inspection",
      "Mid-production checks",
      "Pre-shipment audit",
      "Finish & tolerance verification",
      "Third-party lab testing",
    ],
  },
  {
    id: "custom",
    num: "03",
    heading: "Custom Manufacturing",
    tagline: "Translate architectural drawings into bespoke furniture pieces.",
    description:
      "From concept to prototype to final production run — we manage the entire custom manufacturing process on your behalf. Whether you are working from an architectural elevation, a mood board, or a reference piece, our team translates your vision into factory-ready technical drawings and shepherds production from sample approval to delivery.",
    subServices: [
      "Technical drawing & specification",
      "Sample development",
      "Material & finish selection",
      "Production oversight",
      "Pre-delivery quality sign-off",
    ],
  },
  {
    id: "logistics",
    num: "04",
    heading: "Global Logistics",
    tagline: "End-to-end shipping management and customs clearance.",
    description:
      "We coordinate the full logistics chain — from factory floor to your client's door. Our team manages freight booking, export documentation, customs clearance, and last-mile delivery across the UK, Europe, UAE, and beyond. White-glove installation and assembly is available on request.",
    subServices: [
      "Freight booking & consolidation",
      "Export documentation",
      "Customs clearance",
      "Last-mile delivery",
      "White-glove installation",
    ],
  },
];

/* ── OurExpertise ────────────────────────────────────────── */
function OurExpertise() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="expertise"
      className="bg-[#0E0E0E] px-5 md:px-16 lg:px-24 pt-12 md:pt-[72px] pb-14 md:pb-[90px]"
    >
      {/* Header */}
      <FadeIn className="max-w-[1400px] mx-auto mb-6 md:mb-10">
        <p className="text-[9px] tracking-[0.5em] text-[#BFA37A] uppercase mb-4">
          02 — Services
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            letterSpacing: "0.06em",
            color: "#F5F1EB",
            lineHeight: 1.1,
          }}
        >
          Our Expertise
        </h2>
        <div className="mt-6 h-px bg-white/[0.08]" />
      </FadeIn>

      {/* Accordion */}
      <div className="max-w-[1400px] mx-auto">
        {SERVICES.map((svc) => {
          const isOpen = openId === svc.id;

          return (
            <div key={svc.id}>
              {/* Clickable row — hover for h3 animation; only + icon expands */}
              <motion.div
                className="py-4 md:py-5 group"
                whileHover="hovered"
              >
                {/* Main row: number + heading | tagline + button */}
                <div className="flex items-center justify-between gap-4 md:gap-8">
                  {/* Left */}
                  <div className="flex items-baseline gap-4 md:gap-7 min-w-0">
                    <span
                      className="shrink-0 text-[8px] md:text-[9px] tracking-[0.35em] md:tracking-[0.45em] text-[#BFA37A]"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      {svc.num}
                    </span>
                    <motion.h3
                      variants={{
                        hovered: { color: "#F5F1EB" },
                      }}
                      transition={{ duration: 0.4 }}
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontWeight: 300,
                        fontSize: "clamp(1.1rem, 3.2vw, 2.6rem)",
                        letterSpacing: "0.04em",
                        color: isOpen ? "#F5F1EB" : "#9A9690",
                        lineHeight: 1.15,
                        transition: "color 0.5s",
                      }}
                    >
                      {svc.heading}
                    </motion.h3>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-3 md:gap-6 shrink-0">
                    {/* Tagline — single line on xl, hidden below */}
                    <p className="hidden xl:block text-[10px] tracking-[0.05em] text-[#A8A8A8]/50 font-light whitespace-nowrap text-right">
                      {svc.tagline}
                    </p>

                    {/* Circle + button — ONLY this triggers open/close */}
                    <motion.div
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#A8A8A8]/15 flex items-center justify-center shrink-0 cursor-pointer"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      style={{ color: isOpen ? "#BFA37A" : "#A8A8A8" }}
                      onClick={() => toggle(svc.id)}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                      >
                        <line
                          x1="5.5"
                          y1="0"
                          x2="5.5"
                          y2="11"
                          stroke="currentColor"
                          strokeWidth="0.85"
                        />
                        <line
                          x1="0"
                          y1="5.5"
                          x2="11"
                          y2="5.5"
                          stroke="currentColor"
                          strokeWidth="0.85"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Expanding gold line */}
                <motion.div
                  className="mt-3 md:mt-4 h-px bg-[#BFA37A]"
                  animate={{ scaleX: isOpen ? 1 : 0, opacity: isOpen ? 0.5 : 0 }}
                  transition={{ duration: 0.75, ease: EASE }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={svc.id + "_body"}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.75, ease: EASE },
                      opacity: { duration: 0.35, delay: isOpen ? 0.18 : 0 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-7 md:pb-10 pt-1 grid md:grid-cols-2 gap-5 md:gap-14">
                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
                        className="text-[#A8A8A8] text-[12px] md:text-[13px] leading-[1.9] md:leading-[2] font-light"
                      >
                        {svc.description}
                      </motion.p>

                      {/* Sub-services */}
                      <ul className="flex flex-col gap-2.5 md:gap-3.5 pt-1">
                        {svc.subServices.map((sub, j) => (
                          <motion.li
                            key={sub}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: 0.28 + j * 0.07,
                              ease: EASE,
                            }}
                            className="flex items-center gap-3 md:gap-4 text-[10px] md:text-[11px] tracking-[0.16em] md:tracking-[0.18em] text-[#A8A8A8] font-light uppercase"
                          >
                            <span className="w-4 md:w-5 h-px bg-[#BFA37A] opacity-45 shrink-0" />
                            {sub}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Row divider */}
              <div className="h-px bg-white/[0.08]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Projects Data ──────────────────────────────────────── */
type Project = {
  id: string;
  name: string;
  location: string;
  type: string;
  year: string;
  itemsSourced: number;
  description: string;
  src: string;
};

const PROJECTS: Project[] = [
  {
    id: "dubai",
    name: "Al Barari Estate",
    location: "DUBAI, UAE",
    type: "Private Villa",
    year: "2024",
    itemsSourced: 312,
    description:
      "A landmark private estate in Dubai's most prestigious enclave — Al Barari. Six living volumes, master suite wings, and a private entertainment pavilion, all furnished end-to-end by CFS. Every piece specified to a singular material language: warm marble, natural stone, brushed brass, and custom contemporary upholstery — manufactured through our integrated Foshan production network and white-glove delivered to site.",
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85",
  },
  {
    id: "china",
    name: "Bund Residences",
    location: "SHANGHAI, CHINA",
    type: "Luxury Apartments",
    year: "2023",
    itemsSourced: 528,
    description:
      "A premium residential development along Shanghai's historic Bund waterfront — 38 fully furnished apartments across living, dining, and bedroom categories. Dark walnut casework, architectural joinery, and bespoke upholstery produced through CFS's Foshan facilities. A consistent material story from lobby to penthouse, delivered on a compressed construction timeline.",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=85",
  },
  {
    id: "india",
    name: "Lodha Altamount",
    location: "MUMBAI, INDIA",
    type: "Luxury Residence",
    year: "2024",
    itemsSourced: 174,
    description:
      "A full-floor private residence on Altamount Road — Mumbai's most coveted address. Warm ivory veneers, hand-selected natural textiles, and custom solid wood furniture sourced to the client's architect's exacting specification. A seamless material conversation across living spaces, private dining, and bedroom suites — all coordinated, manufactured, and installed by CFS.",
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=85",
  },
  {
    id: "usa",
    name: "Tribeca Penthouse",
    location: "NEW YORK, USA",
    type: "Luxury Penthouse",
    year: "2024",
    itemsSourced: 148,
    description:
      "A full-floor penthouse in Lower Manhattan — furnished with a curated selection of custom seating, bespoke case goods, and sculptural lighting sourced through CFS. A restrained editorial palette of pale oak, linen, and brushed nickel, precision-manufactured to the designer's drawings and white-glove delivered to the 42nd floor.",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
  },
];

/* ── FeaturedWork ────────────────────────────────────────── */
function FeaturedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 18 });
  const imgParallaxX = useTransform(springX, [0, 1], [-16, 16]);
  const imgParallaxY = useTransform(springY, [0, 1], [-10, 10]);

  useEffect(() => {
    if (!activeProject) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeProject]);

  const gridAreas = ["a", "b", "c", "d"] as const;

  return (
    <section
      id="projects"
      className="relative bg-[#0E0E0E] px-6 md:px-16 lg:px-24 pt-[72px] pb-[100px]"
    >
      {/* Header */}
      <FadeIn className="mb-14 max-w-[1400px] mx-auto">
        <p className="text-[9px] tracking-[0.55em] text-[#BFA37A] uppercase mb-5">
          03 — Projects
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            letterSpacing: "0.06em",
            color: "#F5F1EB",
            lineHeight: 1.1,
          }}
        >
          Featured Work
        </h2>
      </FadeIn>

      {/* Project grid — 4 editorial panels */}
      <div className="max-w-[1400px] mx-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "60vh 52vh",
            gridTemplateAreas: `"a a a b b" "c c d d d"`,
            gap: "6px",
          }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative overflow-hidden group cursor-pointer"
              style={{ gridArea: gridAreas[i] }}
              onClick={() => setActiveProject(project)}
              whileHover="hovered"
            >
              <motion.img
                src={project.src}
                alt={project.name}
                className="w-full h-full object-cover"
                variants={{ hovered: { scale: 1.03 } }}
                transition={{ duration: 0.75, ease: EASE }}
              />
              {/* Base overlay */}
              <div className="absolute inset-0 bg-black/25" />
              {/* Hover overlay delta */}
              <motion.div
                className="absolute inset-0"
                variants={{ hovered: { backgroundColor: "rgba(0,0,0,0.22)" } }}
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                transition={{ duration: 0.55 }}
              />
              {/* Project label */}
              <div className="absolute bottom-7 left-7">
                <p className="text-[8px] tracking-[0.45em] text-[#BFA37A] uppercase mb-2">
                  {project.location}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)",
                    color: "#F5F1EB",
                    letterSpacing: "0.03em",
                    lineHeight: 1.2,
                  }}
                >
                  {project.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
            className="fixed inset-0 z-[200] flex"
            onMouseMove={(e) => {
              mouseX.set(e.clientX / window.innerWidth);
              mouseY.set(e.clientY / window.innerHeight);
            }}
          >
            {/* LEFT — cinematic image with parallax (desktop only) */}
            <div
              className="hidden lg:block relative overflow-hidden cursor-pointer"
              style={{ width: "70%", flexShrink: 0 }}
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                className="absolute"
                style={{
                  top: "-5%",
                  left: "-5%",
                  width: "110%",
                  height: "110%",
                  x: imgParallaxX,
                  y: imgParallaxY,
                }}
              >
                <motion.img
                  key={activeProject.id}
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  src={activeProject.src}
                  alt={activeProject.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* RIGHT — info panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.62, ease: EASE }}
              className="relative bg-[#0E0E0E] flex flex-col overflow-y-auto"
              style={{ flex: "1 1 auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile image header */}
              <div className="lg:hidden relative h-[42vh] overflow-hidden shrink-0">
                <img
                  src={activeProject.src}
                  alt={activeProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Panel content */}
              <div className="flex flex-col justify-center flex-1 px-10 md:px-14 py-14 relative">
                {/* Close icon */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-8 right-8 text-[#A8A8A8] hover:text-[#F5F1EB] transition-colors duration-200 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <line x1="1.5" y1="1.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1" />
                    <line x1="14.5" y1="1.5" x2="1.5" y2="14.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
                >
                  <p className="text-[8px] tracking-[0.55em] text-[#BFA37A] uppercase mb-3">
                    {activeProject.location}
                  </p>
                  <h2
                    className="mb-10"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 300,
                      fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
                      color: "#F5F1EB",
                      letterSpacing: "0.04em",
                      lineHeight: 1.15,
                    }}
                  >
                    {activeProject.name}
                  </h2>

                  <p className="text-[8px] tracking-[0.45em] text-[#F5F1EB]/35 uppercase mb-5">
                    About This Project
                  </p>
                  <p className="text-[#A8A8A8] text-[12px] leading-[2.4] font-light mb-12">
                    {activeProject.description}
                  </p>

                  <div className="h-px bg-white/[0.07] mb-10" />

                  <div className="flex flex-col gap-6 mb-10">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[8px] tracking-[0.4em] text-[#A8A8A8]/45 uppercase">
                        Type
                      </span>
                      <span className="text-[10px] tracking-[0.15em] text-[#F5F1EB]/60 font-light">
                        {activeProject.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[8px] tracking-[0.4em] text-[#A8A8A8]/45 uppercase">
                        Year
                      </span>
                      <span className="text-[10px] tracking-[0.15em] text-[#F5F1EB]/60 font-light">
                        {activeProject.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline mb-14">
                    <span className="text-[8px] tracking-[0.4em] text-[#A8A8A8]/45 uppercase">
                      Items Sourced
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontWeight: 300,
                        fontSize: "2rem",
                        color: "#BFA37A",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {activeProject.itemsSourced}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveProject(null)}
                    className="text-[8px] tracking-[0.45em] text-[#A8A8A8] uppercase hover:text-[#F5F1EB] transition-colors duration-200 cursor-pointer text-left"
                  >
                    — Close Details
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.08]" />
    </section>
  );
}

/* ── Team Data ──────────────────────────────────────────── */
type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  detail: string;
  src: string;
};

const TEAM: TeamMember[] = [
  {
    id: "wei",
    name: "Wei Chen",
    role: "Lead Manufacturing Director",
    description:
      "Oversees production across our partner factories, ensuring precision, consistency, and adherence to international quality standards.",
    detail:
      "18 years embedded in Foshan's manufacturing belt — Wei personally leads factory audits and mid-production reviews for every major commission.",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=85",
  },
  {
    id: "liu",
    name: "Liu Xiaoyan",
    role: "Materials & Quality Specialist",
    description:
      "Expert in sourcing premium materials — from Italian leather to engineered hardwoods — ensuring durability and finish excellence.",
    detail:
      "Direct relationships with tanneries, timber mills, and hardware suppliers across Europe and Asia, bringing material-level expertise to every specification.",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85",
  },
  {
    id: "zhang",
    name: "Zhang Hao",
    role: "Design Translation Expert",
    description:
      "Transforms architectural drawings and design briefs into production-ready furniture, maintaining design integrity at every stage.",
    detail:
      "Bridging design intent and factory capability — working directly alongside architects and interior designers so nothing is lost in translation.",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85",
  },
  {
    id: "huang",
    name: "Huang Mei",
    role: "Global Logistics & Export Manager",
    description:
      "Manages global shipping, customs clearance, and delivery coordination across UK, European, and UAE projects with full accountability.",
    detail:
      "Coordinating across 12+ countries — every consignment is documented, scheduled, and delivered to site on time and in perfect condition.",
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=85",
  },
];

/* ── PeopleSection ───────────────────────────────────────── */
function PeopleSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="people"
      className="relative bg-[#0E0E0E] px-5 md:px-14 lg:px-20 pt-14 md:pt-[64px] pb-14 md:pb-[76px]"
    >
      {/* ── Editorial split header ── */}
      <FadeIn className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-20 pb-7 md:pb-9 border-b border-white/[0.07]">
          <div>
            <p className="text-[8px] tracking-[0.55em] text-[#BFA37A] uppercase mb-4">
              04 — Leadership
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(1.9rem, 3.6vw, 3rem)",
                letterSpacing: "0.05em",
                color: "#F5F1EB",
                lineHeight: 1.12,
              }}
            >
              The Experts
              <br />
              <em style={{ fontStyle: "italic", color: "#9A9690" }}>
                Behind Every Project
              </em>
            </h2>
          </div>
          <p
            className="font-light leading-[1.8] max-w-[280px] md:pb-0.5"
            style={{
              fontSize: "clamp(10px, 1.1vw, 12px)",
              color: "#6A6A6A",
              letterSpacing: "0.02em",
            }}
          >
            A focused team of sourcing specialists, quality experts, and
            logistics coordinators — each embedded in their domain for over a
            decade.
          </p>
        </div>
      </FadeIn>

      {/* ── Team grid — compact editorial portraits ──
          2-col from mobile, 4-col on lg.
          Portrait pinned to max-w-[220px] so images stay editorial-small
          regardless of column width on larger screens.               */}
      <div className="max-w-[1400px] mx-auto mt-9 md:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-7 lg:gap-x-7 lg:gap-y-9">
        {TEAM.map((member, i) => {
          const isActive = activeId === member.id;

          return (
            <FadeIn key={member.id} delay={i * 0.09}>
              <div
                className="group cursor-pointer flex flex-col items-center"
                onClick={() =>
                  setActiveId((prev) => (prev === member.id ? null : member.id))
                }
              >
                {/* ── Portrait — editorial size, face-safe ── */}
                <div
                  className="relative overflow-hidden aspect-[3/4] w-full"
                  style={{ maxWidth: "220px" }}
                >
                  <motion.img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter:
                        "grayscale(100%) contrast(0.9) brightness(0.94)",
                      objectPosition: "center 12%",
                    }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-700" />
                </div>

                {/* ── Info — same max-width as portrait ── */}
                <div
                  className="w-full pt-3 md:pt-3.5"
                  style={{ maxWidth: "220px" }}
                >
                  {/* Role */}
                  <p className="text-[5.5px] tracking-[0.5em] text-[#BFA37A] uppercase mb-1.5">
                    {member.role}
                  </p>

                  {/* Name */}
                  <h3
                    className="mb-1.5"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 300,
                      fontSize: "clamp(0.82rem, 1.15vw, 1.0rem)",
                      letterSpacing: "0.04em",
                      color: "#F5F1EB",
                      lineHeight: 1.2,
                    }}
                  >
                    {member.name}
                  </h3>

                  {/* Divider */}
                  <div className="w-3.5 h-px bg-[#BFA37A] opacity-[0.22] mb-2" />

                  {/* Description */}
                  <p
                    className="font-light"
                    style={{
                      fontSize: "9.5px",
                      color: "#686868",
                      lineHeight: 1.7,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {member.description}
                  </p>

                  {/* Expandable detail */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key={member.id + "_detail"}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.48, ease: EASE },
                          opacity: {
                            duration: 0.32,
                            delay: isActive ? 0.15 : 0,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2">
                          <div className="h-px bg-[#BFA37A] opacity-[0.12] mb-2" />
                          <p
                            style={{
                              fontFamily: "var(--font-cormorant)",
                              fontWeight: 300,
                              fontStyle: "italic",
                              fontSize: "0.78rem",
                              lineHeight: 1.8,
                              color: "#A8A8A8",
                              opacity: 0.65,
                            }}
                          >
                            {member.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Profile toggle */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <motion.span
                      className="block h-px bg-[#BFA37A]"
                      style={{ opacity: 0.3 }}
                      animate={{ width: isActive ? 16 : 8 }}
                      transition={{ duration: 0.38, ease: EASE }}
                    />
                    <span className="text-[5.5px] tracking-[0.42em] text-[#A8A8A8]/30 group-hover:text-[#A8A8A8]/55 uppercase transition-colors duration-400">
                      {isActive ? "Close" : "Profile"}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.08]" />
    </section>
  );
}

/* ── TestimonialsSection ─────────────────────────────────── */

type Testimonial = {
  id: string;
  quote: string;
  client: string;
  location: string;
  src: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "CFS delivered with a level of control and precision we rarely see in global sourcing. Every piece aligned perfectly with our design intent.",
    client: "Interior Designer",
    location: "London",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=60",
  },
  {
    id: "t2",
    quote:
      "The execution was seamless — from material selection to final delivery. It felt like working with a true manufacturing partner, not an intermediary.",
    client: "Hospitality Developer",
    location: "UAE",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=60",
  },
  {
    id: "t3",
    quote:
      "The quality exceeded expectations. The attention to detail and finishing was on par with top European brands.",
    client: "Private Client",
    location: "Europe",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=60",
  },
  {
    id: "t4",
    quote:
      "Working with CFS transformed how we approach high-end residential projects. Their sourcing capabilities and quality control are simply unmatched.",
    client: "Luxury Developer",
    location: "Singapore",
    src: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1400&q=60",
  },
];

function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [active, setActive] = useState(0);
  const [autoKey, setAutoKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [autoKey]);

  const prev = () => {
    setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setAutoKey((k) => k + 1);
  };

  const next = () => {
    setActive((p) => (p + 1) % TESTIMONIALS.length);
    setAutoKey((k) => k + 1);
  };

  const goTo = (i: number) => {
    setActive(i);
    setAutoKey((k) => k + 1);
  };

  const t = TESTIMONIALS[active];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 px-6 md:px-16 lg:px-24"
    >
      {TESTIMONIALS.map((item, i) => (
        <motion.div
          key={item.id}
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: i === active ? 0.06 : 0 }}
          transition={{ duration: 1.4, ease: EASE }}
          style={{
            backgroundImage: `url('${item.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[#0E0E0E]/70 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.45em] text-[#BFA37A] uppercase mb-6">
            06 — Client Voice
          </p>
          <h2
            className="text-[#F5F1EB] mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
            }}
          >
            What Our Clients Say
          </h2>
          <p className="text-[#A8A8A8] text-[12px] tracking-[0.08em] font-light max-w-sm mx-auto leading-[2]">
            Selected feedback from architects, developers, and private clients
            across global projects.
          </p>
          <div className="mt-12 h-px bg-white/[0.06] max-w-[200px] mx-auto" />
        </motion.div>

        <div className="mt-20 min-h-[280px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.58, ease: EASE }}
              className="flex flex-col items-center gap-8"
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "4.5rem",
                  lineHeight: 0.55,
                  color: "#BFA37A",
                  opacity: 0.3,
                  userSelect: "none",
                  display: "block",
                }}
              >
                &ldquo;
              </span>

              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.25rem, 2.4vw, 1.85rem)",
                  lineHeight: 1.75,
                  letterSpacing: "0.02em",
                  color: "#F5F1EB",
                  maxWidth: "760px",
                }}
              >
                {t.quote}
              </blockquote>

              <div className="flex flex-col items-center gap-3 mt-2">
                <div className="h-px w-8 bg-[#BFA37A] opacity-35" />
                <p className="text-[#F5F1EB] text-[10px] tracking-[0.38em] uppercase mt-2">
                  {t.client}
                </p>
                <p className="text-[#A8A8A8] text-[9px] tracking-[0.3em] uppercase">
                  {t.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="text-[#A8A8A8] hover:text-[#BFA37A] transition-colors duration-300 p-2"
          >
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
              <path
                d="M21 5H1M1 5L7 1M1 5L7 9"
                stroke="currentColor"
                strokeWidth="0.75"
              />
            </svg>
          </button>

          <div className="flex items-center gap-[10px]">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Testimonial ${i + 1}`}
                className="flex items-center justify-center h-4"
              >
                <motion.span
                  className="block rounded-full bg-[#BFA37A]"
                  style={{ height: "1.5px" }}
                  animate={{
                    width: i === active ? 22 : 6,
                    opacity: i === active ? 0.75 : 0.22,
                  }}
                  transition={{ duration: 0.38, ease: EASE }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="text-[#A8A8A8] hover:text-[#BFA37A] transition-colors duration-300 p-2"
          >
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
              <path
                d="M1 5H21M21 5L15 1M21 5L15 9"
                stroke="currentColor"
                strokeWidth="0.75"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.06]" />
    </section>
  );
}

/* ── CatalogueSection ────────────────────────────────────── */

const LUX_EASE = [0.22, 1, 0.36, 1] as const;

function CatalogueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-12% 0px" });
  const [focused, setFocused] = useState<string | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const FIELDS = [
    { id: "name",     label: "Full Name",        type: "text",  placeholder: "Your full name" },
    { id: "email",    label: "Email Address",    type: "email", placeholder: "your@studio.com" },
    { id: "company",  label: "Company / Studio", type: "text",  placeholder: "Studio or firm name" },
    { id: "location", label: "Project Location", type: "text",  placeholder: "City, Country" },
  ];

  return (
    <section
      ref={sectionRef}
      id="catalogue"
      className="relative overflow-hidden border-t border-white/[0.04]"
      style={{ background: "#0F0F0F" }}
    >
      {/* Ambient radial warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(191,163,122,0.04) 0%, transparent 58%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-14 lg:px-20 py-20 md:py-28 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* ── LEFT — editorial content ── */}
        <motion.div
          style={{ y: leftY }}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, ease: LUX_EASE }}
          className="flex flex-col gap-9 lg:sticky lg:top-28"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div
              className="shrink-0 h-px bg-[#BFA37A]"
              style={{ width: 18, opacity: 0.5 }}
            />
            <p className="text-[9px] tracking-[0.5em] text-[#BFA37A] uppercase">
              07 — Private Access
            </p>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(2.1rem, 3.8vw, 3.3rem)",
                letterSpacing: "0.03em",
                lineHeight: 1.16,
                color: "#F5F1EB",
              }}
            >
              Private Sourcing
              <br />
              <em style={{ color: "#C4A87A" }}>Consultation</em>
            </h2>
            <p
              className="font-light leading-[2]"
              style={{
                fontSize: "0.83rem",
                color: "#787878",
                letterSpacing: "0.02em",
                maxWidth: "340px",
              }}
            >
              Reserved for architects, interior designers, and luxury
              developers. Share your project scope and receive a tailored
              sourcing proposal within 48 hours.
            </p>
          </div>

          {/* Rule */}
          <div className="w-12 h-px bg-[#BFA37A] opacity-[0.16]" />

          {/* Trust signals */}
          <ul className="flex flex-col gap-6">
            {[
              {
                label: "Curated access to 1,000+ premium pieces",
                sub: "Factory-direct pricing available",
              },
              {
                label: "Dedicated sourcing specialist assigned",
                sub: "Response within 48 hours guaranteed",
              },
              {
                label: "Confidential project brief protection",
                sub: "NDA available on request",
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: LUX_EASE, delay: 0.3 + i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div
                  className="shrink-0 h-px bg-[#BFA37A]"
                  style={{ width: 14, opacity: 0.4, marginTop: 9 }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#C8C2BA",
                      fontWeight: 300,
                      letterSpacing: "0.02em",
                      lineHeight: 1.45,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.67rem",
                      color: "#585858",
                      letterSpacing: "0.04em",
                      marginTop: 3,
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── RIGHT — premium form card ── */}
        <motion.div
          style={{ y: rightY }}
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, ease: LUX_EASE, delay: 0.15 }}
        >
          <div
            className="relative"
            style={{
              background: "#141414",
              border: "1px solid rgba(191,163,122,0.1)",
            }}
          >
            {/* Gold corner accents — top-left */}
            <div className="absolute top-0 left-0 pointer-events-none">
              <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 28, background: "#BFA37A", opacity: 0.42 }} />
              <div style={{ position: "absolute", top: 0, left: 0, height: 1, width: 28, background: "#BFA37A", opacity: 0.42 }} />
            </div>
            {/* Gold corner accents — bottom-right */}
            <div className="absolute bottom-0 right-0 pointer-events-none">
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 1, height: 28, background: "#BFA37A", opacity: 0.42 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, height: 1, width: 28, background: "#BFA37A", opacity: 0.42 }} />
            </div>

            {/* Form header strip */}
            <div className="px-8 md:px-10 pt-8 md:pt-10 pb-6 border-b border-white/[0.05]">
              <p className="text-[7.5px] tracking-[0.52em] text-[#BFA37A] uppercase mb-1.5">
                Consultation Request
              </p>
              <p style={{ fontSize: "10.5px", color: "#6E6A62", letterSpacing: "0.03em" }}>
                All information is held in strict confidence.
              </p>
            </div>

            {/* Fields */}
            <div className="px-8 md:px-10 py-8 md:py-10 flex flex-col gap-7">
              {FIELDS.map(({ id, label, type, placeholder }) => (
                <div
                  key={id}
                  style={{
                    background:
                      focused === id
                        ? "rgba(191,163,122,0.024)"
                        : "transparent",
                    margin: "0 -4px",
                    padding: "0 4px",
                    transition: "background 0.4s ease",
                  }}
                >
                  <label
                    htmlFor={id}
                    style={{
                      display: "block",
                      fontSize: "7.5px",
                      letterSpacing: "0.45em",
                      color: focused === id ? "#C4A87A" : "#8A8880",
                      textTransform: "uppercase",
                      marginBottom: 10,
                      transition: "color 0.32s ease",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent outline-none font-light pb-2.5 placeholder:text-[#686460]"
                    style={{
                      color: "#EDE8DF",
                      fontSize: "13px",
                      letterSpacing: "0.02em",
                      caretColor: "#BFA37A",
                    }}
                  />
                  <div
                    style={{
                      height: 1,
                      background:
                        focused === id
                          ? "rgba(191,163,122,0.7)"
                          : "rgba(255,255,255,0.13)",
                      transition: "background 0.32s ease",
                    }}
                  />
                </div>
              ))}

              {/* Project brief textarea */}
              <div
                style={{
                  background:
                    focused === "brief"
                      ? "rgba(191,163,122,0.024)"
                      : "transparent",
                  margin: "0 -4px",
                  padding: "0 4px",
                  transition: "background 0.4s ease",
                }}
              >
                <label
                  htmlFor="brief"
                  style={{
                    display: "block",
                    fontSize: "7.5px",
                    letterSpacing: "0.45em",
                    color: focused === "brief" ? "#C4A87A" : "#8A8880",
                    textTransform: "uppercase",
                    marginBottom: 10,
                    transition: "color 0.32s ease",
                  }}
                >
                  Project Brief
                </label>
                <textarea
                  id="brief"
                  rows={3}
                  placeholder="Describe your project scope, timeline, and furniture requirements…"
                  onFocus={() => setFocused("brief")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent outline-none font-light resize-none pb-2.5 placeholder:text-[#686460]"
                  style={{
                    color: "#EDE8DF",
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                    caretColor: "#BFA37A",
                  }}
                />
                <div
                  style={{
                    height: 1,
                    background:
                      focused === "brief"
                        ? "rgba(191,163,122,0.7)"
                        : "rgba(255,255,255,0.13)",
                    transition: "background 0.32s ease",
                  }}
                />
              </div>

              {/* CTA button — fill sweep on hover */}
              <div className="pt-3">
                <motion.button
                  type="submit"
                  onHoverStart={() => setBtnHovered(true)}
                  onHoverEnd={() => setBtnHovered(false)}
                  whileTap={{ scale: 0.985 }}
                  className="relative w-full overflow-hidden cursor-pointer"
                  style={{
                    padding: "18px 24px",
                    border: "1px solid rgba(191,163,122,0.48)",
                  }}
                >
                  {/* Gold fill sweep */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: "#BFA37A", transformOrigin: "left" }}
                    animate={{ scaleX: btnHovered ? 1 : 0 }}
                    transition={{ duration: 0.44, ease: LUX_EASE }}
                  />
                  {/* Label + arrow */}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <motion.span
                      animate={{ color: btnHovered ? "#0E0E0E" : "#C4A87A" }}
                      transition={{ duration: 0.26 }}
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.5em",
                        textTransform: "uppercase",
                        fontWeight: 300,
                      }}
                    >
                      Request Private Access
                    </motion.span>
                    <motion.svg
                      width="15"
                      height="7"
                      viewBox="0 0 15 7"
                      fill="none"
                      animate={{
                        x: btnHovered ? 4 : 0,
                        color: btnHovered ? "#0E0E0E" : "#C4A87A",
                      }}
                      transition={{ duration: 0.28 }}
                    >
                      <path
                        d="M0 3.5H14M14 3.5L10.5 1M14 3.5L10.5 6"
                        stroke="currentColor"
                        strokeWidth="0.7"
                      />
                    </motion.svg>
                  </span>
                </motion.button>

                {/* Privacy note */}
                <div className="mt-5 flex items-center justify-center gap-3">
                  <div className="shrink-0 h-px bg-[#BFA37A]" style={{ width: 16, opacity: 0.16 }} />
                  <p style={{ fontSize: "0.62rem", color: "#464646", letterSpacing: "0.16em" }}>
                    Strictly confidential. No obligation.
                  </p>
                  <div className="shrink-0 h-px bg-[#BFA37A]" style={{ width: 16, opacity: 0.16 }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ── ContactSection ──────────────────────────────────────── */

function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [emailHovered, setEmailHovered] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [boxHovered, setBoxHovered] = useState(false);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(191,163,122,0.03) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: LUX_EASE }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.45em] text-[#BFA37A] uppercase mb-6">
            08 — Contact
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
              letterSpacing: "0.05em",
              lineHeight: 1.12,
              color: "#F5F1EB",
            }}
          >
            Get in Touch
          </h2>
          <p
            className="text-[#A8A8A8] font-light leading-[2.2] max-w-[400px] mx-auto mt-7"
            style={{ fontSize: "0.82rem", letterSpacing: "0.025em" }}
          >
            Our specialists are available for private consultations regarding
            your project requirements.
          </p>
        </motion.div>

        {/* Contact box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: LUX_EASE, delay: 0.2 }}
          onHoverStart={() => setBoxHovered(true)}
          onHoverEnd={() => setBoxHovered(false)}
          style={{ border: "1px solid #1C1C1C" }}
        >
          <motion.div
            animate={{ backgroundColor: boxHovered ? "#121212" : "#0E0E0E" }}
            transition={{ duration: 0.55, ease: LUX_EASE }}
            className="relative grid md:grid-cols-2"
          >
            {/* LEFT — Email */}
            <div
              className="px-10 py-14 lg:px-14 lg:py-16 flex flex-col gap-6 items-center text-center"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
            >
              <p className="text-[9px] tracking-[0.48em] text-[#BFA37A] uppercase">
                Email Inquiries
              </p>
              <a
                href="mailto:chinacfsourcing.info@gmail.com"
                className="relative inline-block"
              >
                <motion.span
                  className="block font-light text-[#F5F1EB]"
                  animate={{ opacity: emailHovered ? 1 : 0.75 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(0.82rem, 1.4vw, 0.96rem)",
                    letterSpacing: "0.02em",
                  }}
                >
                  chinacfsourcing.info@gmail.com
                </motion.span>
                <motion.span
                  className="absolute left-0 bottom-[-3px] h-px bg-[#BFA37A] origin-left"
                  style={{ width: "100%" }}
                  animate={{ scaleX: emailHovered ? 1 : 0 }}
                  transition={{ duration: 0.42, ease: LUX_EASE }}
                />
              </a>
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-px pointer-events-none">
              <div className="absolute inset-0 bg-[#1C1C1C]" />
              <motion.div
                className="absolute inset-0 bg-[#BFA37A]"
                animate={{ opacity: boxHovered ? 0.2 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Horizontal divider (mobile) */}
            <div className="md:hidden mx-10 h-px bg-[#1C1C1C]" />

            {/* RIGHT — Phone */}
            <div
              className="px-10 py-14 lg:px-14 lg:py-16 flex flex-col gap-6 items-center text-center"
              onMouseEnter={() => setPhoneHovered(true)}
              onMouseLeave={() => setPhoneHovered(false)}
            >
              <p className="text-[9px] tracking-[0.48em] text-[#BFA37A] uppercase">
                Direct Contact
              </p>
              <div className="flex flex-col gap-3">
                <motion.a
                  href="tel:+8618688246482"
                  className="font-light"
                  animate={{
                    opacity: phoneHovered ? 1 : 0.75,
                    textShadow: phoneHovered
                      ? "0 0 28px rgba(191,163,122,0.28)"
                      : "0 0 0px rgba(191,163,122,0)",
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    color: "#F5F1EB",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(0.82rem, 1.4vw, 0.96rem)",
                    letterSpacing: "0.02em",
                  }}
                >
                  +86 186 8824 6482
                </motion.a>
                <p
                  className="text-[#A8A8A8]"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.38em" }}
                >
                  WHATSAPP / PHONE
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── FooterSection ───────────────────────────────────────── */

const FOOTER_NAV = [
  { label: "Our Categories",    href: "#collection" },
  { label: "Sourcing Services", href: "#expertise"  },
  { label: "Featured Projects", href: "#projects"   },
  { label: "Request Catalogue", href: "#catalogue"  },
  { label: "Contact",           href: "#contact"    },
];

function FooterSection() {
  return (
    <footer
      className="border-t border-[#1C1C1C]"
      style={{ background: "#0E0E0E" }}
    >
      {/* Main columns */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 lg:gap-20">

        {/* LEFT — Brand */}
        <div className="flex flex-col gap-5">
          <Image
            src="/logo.png"
            alt="CFS"
            width={72}
            height={28}
            className="h-7 w-auto object-contain self-start"
          />
          <p
            className="text-[#D8D2C8] uppercase font-light"
            style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}
          >
            China Furniture Sourcing
          </p>
          <p
            className="text-[#686862] font-light leading-[1.85]"
            style={{ fontSize: "0.74rem", letterSpacing: "0.02em", maxWidth: "240px" }}
          >
            Premium furniture sourcing and manufacturing from Guangzhou, China — built for architects, designers, and global developers.
          </p>
        </div>

        {/* CENTER — Navigation */}
        <div className="flex flex-col gap-5">
          <p
            className="text-[#484844] uppercase"
            style={{ fontSize: "0.6rem", letterSpacing: "0.42em" }}
          >
            Navigation
          </p>
          <nav className="flex flex-col gap-[11px]">
            {FOOTER_NAV.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-light transition-colors duration-300"
                style={{
                  fontSize: "0.73rem",
                  letterSpacing: "0.05em",
                  color: "#686862",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#BFA37A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#686862")}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* RIGHT — Contact */}
        <div className="flex flex-col gap-5">
          <p
            className="text-[#484844] uppercase"
            style={{ fontSize: "0.6rem", letterSpacing: "0.42em" }}
          >
            Get in Touch
          </p>
          <div className="flex flex-col gap-[11px]">
            <a
              href="mailto:chinacfsourcing.info@gmail.com"
              className="font-light transition-colors duration-300"
              style={{ fontSize: "0.73rem", letterSpacing: "0.02em", color: "#686862" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#BFA37A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#686862")}
            >
              chinacfsourcing.info@gmail.com
            </a>
            <a
              href="tel:+8618688246482"
              className="font-light transition-colors duration-300"
              style={{ fontSize: "0.73rem", letterSpacing: "0.02em", color: "#686862" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#BFA37A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#686862")}
            >
              +86 186 8824 6482
            </a>
            <p
              className="font-light"
              style={{ fontSize: "0.73rem", letterSpacing: "0.02em", color: "#484844" }}
            >
              Guangzhou, China
            </p>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#161616] max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p
          className="font-light"
          style={{ fontSize: "0.64rem", letterSpacing: "0.14em", color: "#404040" }}
        >
          © 2026 CFS. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {["Privacy Policy", "Terms"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-light transition-colors duration-300"
              style={{ fontSize: "0.64rem", letterSpacing: "0.14em", color: "#404040" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F1EB")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#404040")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="bg-[#0E0E0E] text-[#F5F1EB] overflow-x-hidden">

      <Navbar />

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section className="relative h-[115vh] min-h-[760px] overflow-hidden select-none">

        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=90')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 lg:px-28 pb-24 pt-28 max-w-[860px]">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.45, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(3.2rem, 6.4vw, 7rem)",
              lineHeight: 1.04,
              letterSpacing: "0.01em",
              color: "#F5F1EB",
            }}
          >
            Global Sourcing &amp;
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.62, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(3.2rem, 6.4vw, 7rem)",
              lineHeight: 1.04,
              letterSpacing: "0.01em",
              color: "#BFA37A",
            }}
          >
            Logistics Solutions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.95, ease: EASE }}
            className="mt-8 text-[8px] tracking-[0.45em] text-[#BFA37A] uppercase"
          >
            Complete Interior Solutions
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 1.05, ease: EASE }}
            className="mt-3 text-[13px] text-[#A8A8A8] font-light leading-[1.95] max-w-[420px]"
          >
            CFS is a global furniture sourcing company with in-house
            manufacturing capabilities, delivering quality, reliability,
            and design excellence worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 1.2, ease: EASE }}
            className="mt-10"
          >
            <motion.a
              href="https://wa.me/8618688246482"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ backgroundColor: "#BFA37A", borderColor: "#BFA37A", color: "#0E0E0E" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-4 border border-[#BFA37A] px-10 py-4 text-[9px] tracking-[0.5em] text-[#BFA37A] uppercase font-light cursor-pointer"
            >
              Schedule Appointment
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.0 }}
          className="absolute bottom-10 left-8 md:left-20 lg:left-28 flex items-center gap-4"
        >
          <motion.div
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
            className="w-12 h-px bg-[#BFA37A] opacity-55 origin-left"
          />
          <span className="text-[8px] tracking-[0.5em] text-[#A8A8A8] uppercase">
            Scroll
          </span>
        </motion.div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.08]" />
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="relative bg-[#0E0E0E] py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8">
          {[
            { to: 90,    suffix: "+", label: "Verified Manufacturers"  },
            { to: 6,     suffix: "+", label: "Countries Served"        },
            { to: 10000, suffix: "+", label: "Pieces Delivered"        },
            { to: 100,   suffix: "%", label: "Quality Assured"         },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.14} className="flex flex-col items-center text-center">
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  fontSize: "clamp(2.8rem, 5vw, 5rem)",
                  lineHeight: 1,
                  color: "#EDE8DF",
                  letterSpacing: "0.02em",
                  fontVariantNumeric: "lining-nums",
                  fontFeatureSettings: '"lnum" 1, "tnum" 1',
                }}
              >
                <CountUp to={stat.to} suffix={stat.suffix} />
              </p>
              <div className="mt-3 w-6 h-px bg-[#BFA37A] opacity-70" />
              <p className="mt-2.5 text-[8px] tracking-[0.22em] text-[#C4BFB7] uppercase leading-[1.6] font-semibold">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.08]" />
      </section>

      {/* ── 2. BRAND STATEMENT ────────────────────────────── */}
      <section className="px-6 md:px-20 py-20 max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.1rem, 4.2vw, 3.8rem)",
              lineHeight: 1.16,
              letterSpacing: "0.01em",
              color: "#F5F1EB",
            }}
          >
            The Architecture of<br className="hidden sm:block" /> Global Sourcing
          </h2>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="mx-auto mt-8 mb-8 w-8 h-px bg-[#BFA37A] opacity-50" />
        </FadeIn>

        <FadeIn delay={0.3}>
          <p
            className="text-[#A8A8A8] font-light"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
              lineHeight: 2.15,
              letterSpacing: "0.01em",
            }}
          >
            We are a global furniture sourcing company with in-house manufacturing
            and end-to-end logistics capabilities. Delivering bespoke furniture
            solutions with precision, quality, reliability, and seamless worldwide
            fulfillment for luxury residential, hospitality, retail, and commercial
            projects.
          </p>
        </FadeIn>
      </section>

      <FadeIn className="w-px h-20 bg-[#BFA37A] opacity-20 mx-auto" />

      {/* ── 01. CATEGORIES ───────────────────────────────── */}
      <OurCollection />

      {/* ── 02. SERVICES ─────────────────────────────────── */}
      <OurExpertise />

      {/* ── 03. PROJECTS ─────────────────────────────────── */}
      <FeaturedWork />

      {/* ── LEADERSHIP ───────────────────────────────────── */}
      <PeopleSection />

      {/* ── 04. PROCESS ───────────────────────────────────── */}
      <section id="process" className="bg-[#0E0E0E] border-t border-white/[0.05]">

        {/* ── Header ── */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-14 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-20 pt-14 md:pt-[68px] pb-8 md:pb-10 border-b border-white/[0.06]">
              <div>
                <p className="text-[8px] tracking-[0.55em] text-[#BFA37A] uppercase mb-4">
                  05 — Process
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
                    letterSpacing: "0.05em",
                    color: "#F5F1EB",
                    lineHeight: 1.12,
                  }}
                >
                  Five Steps.
                  <br />
                  <em style={{ color: "#9A9690" }}>Zero Loose Ends.</em>
                </h2>
              </div>
              <p
                className="font-light max-w-[280px] md:pb-0.5"
                style={{ fontSize: "11px", color: "#646464", lineHeight: "1.85", letterSpacing: "0.01em" }}
              >
                A precise, transparent sourcing journey — from first consultation to final installation — built around your project's highest expectations.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── Editorial step rows ── */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-14 lg:px-20 pb-14 md:pb-[80px]">
          {processSteps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="border-b border-white/[0.05] py-8 md:py-10">
                {/*
                  3-column desktop grid:
                    [60px number spine] [flex content] [auto image ~38%]
                  Mobile: image on top, then number+title+desc below
                */}
                <div className="flex flex-col md:grid md:gap-x-10 lg:gap-x-14 md:items-start"
                  style={{ gridTemplateColumns: "60px 1fr 38%" }}
                >
                  {/* ── Image — first on mobile, last on desktop ── */}
                  <div
                    className="relative overflow-hidden w-full mb-6 md:mb-0 md:order-last group/img"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <motion.img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 1.2, ease: EASE }}
                      style={{
                        filter: "brightness(0.84) contrast(1.04) saturate(0.82)",
                      }}
                    />
                    {/* Soft vignette overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 55%, rgba(14,14,14,0.28) 100%)",
                      }}
                    />
                  </div>

                  {/* ── Step number — spine ── */}
                  <div className="hidden md:flex flex-col pt-0.5">
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontWeight: 300,
                        fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                        color: "#BFA37A",
                        lineHeight: 1,
                        letterSpacing: "0.02em",
                        opacity: 0.6,
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* ── Content ── */}
                  <div className="flex flex-col min-w-0">
                    {/* Mobile: small inline number */}
                    <p
                      className="md:hidden text-[8px] tracking-[0.45em] text-[#BFA37A] uppercase mb-2"
                      style={{ opacity: 0.65 }}
                    >
                      {step.num}
                    </p>

                    {/* Title */}
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontWeight: 300,
                        fontSize: "clamp(1.1rem, 1.7vw, 1.55rem)",
                        letterSpacing: "0.04em",
                        color: "#D4CFC6",
                        lineHeight: 1.25,
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Gold hairline */}
                    <div
                      className="mb-3.5"
                      style={{ width: "1.5rem", height: "1px", background: "#BFA37A", opacity: 0.22 }}
                    />

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "11.5px",
                        color: "#7A7875",
                        fontWeight: 300,
                        lineHeight: 1.95,
                        letterSpacing: "0.01em",
                        maxWidth: "420px",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          <div className="border-b border-white/[0.04]" />
        </div>
      </section>

      {/* ── 05. CLIENT VOICE ──────────────────────────────── */}
      <TestimonialsSection />

      {/* ── 06. PRIVATE CATALOGUE ────────────────────────── */}
      <CatalogueSection />

      {/* ── 07. CONTACT ───────────────────────────────────── */}
      <ContactSection />

      {/* ── FOOTER ────────────────────────────────────────── */}
      <FooterSection />

    </main>
  );
}
