"use client";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 lg:px-20 py-6 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.04)"
          : "1px solid transparent",
      }}
    >
      <a
        href="#"
        className="text-[11px] tracking-[0.45em] text-[#F5F1EB] uppercase shrink-0"
        style={{ fontFamily: "var(--font-playfair)", letterSpacing: "0.45em" }}
      >
        CFS
      </a>

      <div className="hidden md:flex items-center gap-10 lg:gap-12">
        {[
          { label: "Collections", href: "#collection" },
          { label: "Services", href: "#process" },
          { label: "Projects", href: "#" },
          { label: "Contact", href: "#cta" },
        ].map(({ label, href }) => (
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
        href="#cta"
        whileHover={{ backgroundColor: "#BFA37A", borderColor: "#BFA37A", color: "#0E0E0E" }}
        transition={{ duration: 0.3, ease: EASE }}
        className="hidden md:inline-flex items-center border border-[#BFA37A] px-6 py-2.5 text-[9px] tracking-[0.4em] text-[#BFA37A] uppercase font-light cursor-pointer shrink-0"
        style={{ transition: "background-color 0.3s, color 0.3s, border-color 0.3s" }}
      >
        Request Catalogue
      </motion.a>
    </nav>
  );
}

/* ── Scroll-triggered FadeIn ─────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
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
const capabilities = [
  {
    num: "01",
    title: "Living Systems",
    desc: "Sofas, lounge chairs, occasional pieces — curated for the architecture of living.",
  },
  {
    num: "02",
    title: "Dining & Bedrooms",
    desc: "Tables, beds, and case goods crafted for permanence and quiet presence.",
  },
  {
    num: "03",
    title: "Custom Execution",
    desc: "Bespoke manufacturing from concept to delivery — engineered to your specification.",
  },
];

const process = [
  {
    step: "Design Alignment",
    desc: "We begin by understanding the vision — your brief, your client, your space.",
  },
  {
    step: "Material Selection",
    desc: "Guided curation of materials, finishes, and hardware from our global network.",
  },
  {
    step: "Manufacturing Control",
    desc: "Direct oversight of production. No compromises on quality or timing.",
  },
  {
    step: "Global Delivery",
    desc: "White-glove logistics to any destination. Every piece arrives as intended.",
  },
];

/* ── Collection Data ─────────────────────────────────────── */
type CollectionItem = { src: string; alt: string };
type Category = {
  id: string;
  label: string;
  heading: string;
  description: string;
  keyPieces: string[];
  images: CollectionItem[];
};

const CATEGORIES: Category[] = [
  {
    id: "living",
    label: "Living Room",
    heading: "Living Room",
    description:
      "Curated lounge systems and statement pieces for the spaces where life unfolds — refined, generous, and quietly enduring.",
    keyPieces: [
      "Modular Sectional Sofas",
      "Lounge Armchairs",
      "Coffee & Side Tables",
      "TV Consoles & Media Units",
      "Decorative Shelving",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80", alt: "Modern living room sofa" },
      { src: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=900&q=80", alt: "Warm living interior" },
      { src: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=900&q=80", alt: "Minimal living space" },
      { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80", alt: "Editorial living room" },
      { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80", alt: "Luxury interior" },
    ],
  },
  {
    id: "dining",
    label: "Dining Room",
    heading: "Dining Room",
    description:
      "Dining tables and seating that transform the ritual of gathering — sculptural forms built for presence and permanence.",
    keyPieces: [
      "Solid Wood Dining Tables",
      "Upholstered Dining Chairs",
      "Sideboards & Buffets",
      "Bar & Counter Stools",
      "Display Cabinets",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1617104678098-de229db51175?w=900&q=80", alt: "Luxury dining table" },
      { src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80", alt: "Modern dining room" },
      { src: "https://images.unsplash.com/photo-1532372320978-9b5e26945c7e?w=900&q=80", alt: "Dining interior" },
      { src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&q=80", alt: "Editorial dining space" },
      { src: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=900&q=80", alt: "Dining chairs" },
    ],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    heading: "Bedroom",
    description:
      "Beds, wardrobes, and case goods conceived for rest — where material quality and spatial calm become one.",
    keyPieces: [
      "Platform & Upholstered Beds",
      "Freestanding Wardrobes",
      "Bedside Tables & Nightstands",
      "Dressing Tables",
      "Storage Ottomans",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80", alt: "Minimal bedroom" },
      { src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80", alt: "Luxury bed" },
      { src: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=80", alt: "Bedroom interior" },
      { src: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=900&q=80", alt: "Calm bedroom" },
      { src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80", alt: "Bedroom editorial" },
    ],
  },
  {
    id: "office",
    label: "Office & Study",
    heading: "Office & Study",
    description:
      "Workspaces designed with intention — desks, storage, and seating that bring discipline and elegance to focused living.",
    keyPieces: [
      "Executive & Writing Desks",
      "Task & Lounge Chairs",
      "Bookcases & Wall Systems",
      "Filing & Storage Units",
      "Meeting Tables",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80", alt: "Luxury office desk" },
      { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80", alt: "Studio workspace" },
      { src: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80", alt: "Minimal study" },
      { src: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=900&q=80", alt: "Editorial workspace" },
      { src: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&q=80", alt: "Office interior" },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality",
    heading: "Hospitality",
    description:
      "Contract-grade furniture engineered for luxury hotels, resorts, and private members clubs — durable, beautiful, bespoke.",
    keyPieces: [
      "Hotel Room Casegoods",
      "Lobby & Lounge Seating",
      "Restaurant & Bar Furniture",
      "Outdoor Terrace Sets",
      "Custom Headboards",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80", alt: "Luxury hotel room" },
      { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80", alt: "Resort interior" },
      { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80", alt: "Hotel lobby" },
      { src: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=900&q=80", alt: "Hospitality design" },
      { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80", alt: "Hotel suite" },
    ],
  },
  {
    id: "custom",
    label: "Custom Pieces",
    heading: "Custom Pieces",
    description:
      "From concept sketch to white-glove delivery — our bespoke manufacture service brings your most ambitious brief to life.",
    keyPieces: [
      "Bespoke Sofas & Sectionals",
      "Custom Dining Tables",
      "Made-to-Measure Storage",
      "Architectural Joinery",
      "Prototype & Single-Run Pieces",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900&q=80", alt: "Custom furniture" },
      { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80", alt: "Bespoke interior" },
      { src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80", alt: "Custom piece detail" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", alt: "Artisan furniture" },
      { src: "https://images.unsplash.com/photo-1600494448853-e4a3b75f0c74?w=900&q=80", alt: "Bespoke room" },
    ],
  },
  {
    id: "outdoor",
    label: "Outdoor & Terrace",
    heading: "Outdoor & Terrace",
    description:
      "Weather-resistant furniture for terraces, gardens, and pool decks — designed with the same standard as every indoor space.",
    keyPieces: [
      "Outdoor Sofa Systems",
      "Dining Sets & Terrace Tables",
      "Sun Loungers & Daybeds",
      "Planters & Screens",
      "Outdoor Lighting",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80", alt: "Terrace furniture" },
      { src: "https://images.unsplash.com/photo-1523192193543-6e7296d960e4?w=900&q=80", alt: "Outdoor living" },
      { src: "https://images.unsplash.com/photo-1481604445574-bba08b6d46b5?w=900&q=80", alt: "Pool terrace" },
      { src: "https://images.unsplash.com/photo-1561090268-f6b1de8a1f98?w=900&q=80", alt: "Garden space" },
      { src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&q=80", alt: "Outdoor seating" },
    ],
  },
  {
    id: "lighting",
    label: "Lighting & Decor",
    heading: "Lighting & Decor",
    description:
      "Pendants, floor lamps, and decorative objects that complete a space — each one selected for its quiet authority.",
    keyPieces: [
      "Statement Pendants",
      "Floor & Arc Lamps",
      "Table Lamps",
      "Mirrors & Wall Art",
      "Decorative Objects",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80", alt: "Pendant lighting" },
      { src: "https://images.unsplash.com/photo-1513506003901-1e6a35066c31?w=900&q=80", alt: "Interior lighting" },
      { src: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=900&q=80", alt: "Decorative light" },
      { src: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=900&q=80", alt: "Lamp detail" },
      { src: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=900&q=80", alt: "Decorative objects" },
    ],
  },
];

/* ── Grid area map for 5 images ─────────────────────────── */
const GRID_AREAS = ["a", "b", "c", "d", "e"] as const;

/* ── OurCollection ───────────────────────────────────────── */
function OurCollection() {
  const [activeId, setActiveId] = useState("living");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const gridParallaxY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const active = CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative bg-[#0E0E0E] pt-32 pb-44 px-6 md:px-16 lg:px-24"
    >
      {/* Section header */}
      <FadeIn className="mb-16 text-center">
        <p className="text-[9px] tracking-[0.55em] text-[#BFA37A] uppercase mb-5">
          Our Collection
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            letterSpacing: "0.12em",
            color: "#F5F1EB",
          }}
        >
          A World of Craftsmanship
        </h2>
      </FadeIn>

      {/* Category tabs */}
      <FadeIn delay={0.1} className="mb-20">
        <div className="flex flex-wrap gap-x-7 gap-y-4 justify-center max-w-[900px] mx-auto">
          {CATEGORIES.map((cat) => {
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="relative text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 cursor-pointer pb-1"
                style={{ color: isActive ? "#BFA37A" : "#A8A8A8" }}
              >
                {cat.label}
                {isActive && (
                  <motion.span
                    layoutId="category-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#BFA37A]"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Content: sticky left + image grid right */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* LEFT — sticky info panel */}
        <div className="lg:w-[28%] lg:sticky lg:top-28 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId + "_text"}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <p className="text-[8px] tracking-[0.55em] text-[#BFA37A] uppercase mb-6">
                CFS Collection
              </p>
              <h3
                className="text-[#F5F1EB] mb-7 leading-[1.2]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 400,
                  fontSize: "clamp(1.9rem, 3vw, 2.7rem)",
                  letterSpacing: "0.02em",
                }}
              >
                {active.heading}
              </h3>
              <p className="text-[#A8A8A8] text-[13px] leading-[2.15] font-light mb-10">
                {active.description}
              </p>

              <p className="text-[8px] tracking-[0.5em] text-[#F5F1EB]/70 uppercase mb-5">
                Key Pieces
              </p>
              <ul className="flex flex-col gap-3.5">
                {active.keyPieces.map((piece, i) => (
                  <motion.li
                    key={piece}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                    className="flex items-center gap-3.5 text-[11px] tracking-[0.15em] text-[#A8A8A8] font-light"
                  >
                    <span className="w-5 h-px bg-[#BFA37A] opacity-50 shrink-0" />
                    {piece}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — asymmetric image grid */}
        <div className="lg:w-[72%] min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId + "_grid"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ y: gridParallaxY }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gridTemplateRows: "320px 210px 250px",
                  gridTemplateAreas: `"a a b" "c d d" "c e e"`,
                  gap: "6px",
                }}
              >
                {active.images.map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: i * 0.09, ease: EASE }}
                    className="relative overflow-hidden group cursor-pointer"
                    style={{ gridArea: GRID_AREAS[i] }}
                    onClick={() =>
                      setLightboxSrc(img.src.replace("w=900", "w=1600"))
                    }
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.75, ease: EASE }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/28 transition-colors duration-500 flex items-center justify-center">
                      <span className="text-[8px] tracking-[0.55em] text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        View
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-6 cursor-pointer"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.38, ease: EASE }}
              src={lightboxSrc}
              alt="Collection detail"
              className="max-w-full max-h-[88vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-8 right-10 text-[9px] tracking-[0.4em] text-[#A8A8A8] uppercase hover:text-[#F5F1EB] transition-colors duration-200 cursor-pointer"
            >
              Close
            </button>
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
    tagline: "Direct access to our network of 500+ verified manufacturers.",
    description:
      "We maintain deep relationships with over 500 vetted factories across China's key manufacturing regions — from Foshan's furniture belt to Guangdong's upholstery specialists. Our introductions are warm, not cold: every factory we present has been visited, audited, and benchmarked against your specific brief.",
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
      className="bg-[#0E0E0E] px-6 md:px-16 lg:px-24 pt-36 pb-44"
    >
      {/* Header */}
      <FadeIn className="max-w-[1400px] mx-auto mb-24">
        <p className="text-[9px] tracking-[0.5em] text-[#BFA37A] uppercase mb-7">
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
        <div className="mt-10 h-px bg-white/[0.08]" />
      </FadeIn>

      {/* Accordion */}
      <div className="max-w-[1400px] mx-auto">
        {SERVICES.map((svc) => {
          const isOpen = openId === svc.id;

          return (
            <div key={svc.id}>
              {/* Clickable row */}
              <motion.div
                className="py-14 md:py-16 cursor-pointer group"
                onClick={() => toggle(svc.id)}
                whileHover="hovered"
              >
                {/* Main row: number + heading | tagline + button */}
                <div className="flex items-center justify-between gap-6 md:gap-12">
                  {/* Left */}
                  <div className="flex items-baseline gap-7 md:gap-10 min-w-0">
                    <span
                      className="shrink-0 text-[9px] tracking-[0.45em] text-[#BFA37A]"
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
                        fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
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
                  <div className="flex items-center gap-6 md:gap-10 shrink-0">
                    <p className="hidden lg:block text-[11px] tracking-[0.08em] text-[#A8A8A8]/60 font-light max-w-[280px] text-right leading-[1.7]">
                      {svc.tagline}
                    </p>

                    {/* Circle + button */}
                    <motion.div
                      className="w-11 h-11 rounded-full border border-[#A8A8A8]/20 flex items-center justify-center shrink-0"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      style={{ color: isOpen ? "#BFA37A" : "#A8A8A8" }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <line
                          x1="6.5"
                          y1="0"
                          x2="6.5"
                          y2="13"
                          stroke="currentColor"
                          strokeWidth="0.9"
                        />
                        <line
                          x1="0"
                          y1="6.5"
                          x2="13"
                          y2="6.5"
                          stroke="currentColor"
                          strokeWidth="0.9"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Expanding gold line */}
                <motion.div
                  className="mt-7 h-px bg-[#BFA37A]"
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
                    <div className="pb-16 pt-2 grid md:grid-cols-2 gap-12 md:gap-24">
                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
                        className="text-[#A8A8A8] text-[13px] md:text-sm leading-[2.3] font-light"
                      >
                        {svc.description}
                      </motion.p>

                      {/* Sub-services */}
                      <ul className="flex flex-col gap-5 pt-1">
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
                            className="flex items-center gap-4 text-[11px] tracking-[0.18em] text-[#A8A8A8] font-light uppercase"
                          >
                            <span className="w-5 h-px bg-[#BFA37A] opacity-45 shrink-0" />
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
    id: "peninsula",
    name: "The Peninsula Hotel",
    location: "HONG KONG",
    type: "5-Star Hotel",
    year: "2023",
    itemsSourced: 310,
    description:
      "A full FF&E package for one of Hong Kong's most iconic luxury hotels — spanning 280 guest rooms, suites, and lobby spaces. Every piece was custom-sourced to meet the Peninsula's exacting heritage aesthetic, blending classic forms with precision manufacturing.",
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=85",
  },
  {
    id: "villa",
    name: "Private Villa",
    location: "DUBAI, UAE",
    type: "Private Residence",
    year: "2024",
    itemsSourced: 127,
    description:
      "An ultra-private residential commission in Palm Jumeirah — a curated selection of bespoke furniture across 6 living spaces, 5 bedrooms, and a rooftop entertainment terrace. Designed alongside the client's interior architect for a seamless material language.",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
  },
  {
    id: "apartments",
    name: "Luxury Apartments",
    location: "LONDON, UK",
    type: "Residential Development",
    year: "2023",
    itemsSourced: 480,
    description:
      "A landmark residential development in Central London — 24 apartments fully furnished across living, dining, and bedroom categories. A tight delivery schedule met without compromise on specification.",
    src: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1600&q=85",
  },
  {
    id: "resort",
    name: "Boutique Resort",
    location: "BALI, INDONESIA",
    type: "Boutique Hotel",
    year: "2024",
    itemsSourced: 210,
    description:
      "A 32-villa boutique resort in Seminyak — all FF&E sourced to reflect the natural materiality of the site. Teak, rattan, and woven textiles combined with custom upholstery and bespoke case goods.",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=85",
  },
  {
    id: "offices",
    name: "Executive Offices",
    location: "SINGAPORE",
    type: "Commercial Interior",
    year: "2022",
    itemsSourced: 185,
    description:
      "A complete office transformation for a global financial institution — executive floors, boardrooms, and client-facing spaces. A restrained material palette of walnut, brass, and deep leather rendered in bespoke joinery and seating.",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=85",
  },
  {
    id: "residence",
    name: "Private Residence",
    location: "PARIS, FRANCE",
    type: "Private Residence",
    year: "2024",
    itemsSourced: 94,
    description:
      "A Haussmannian apartment in the 7th arrondissement — restored and refurnished with a curated collection of bespoke seating, dining furniture, and decorative pieces. An exercise in restraint and quiet luxury.",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
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

  const gridAreas = ["a", "b", "c", "d", "e", "f"] as const;

  return (
    <section
      id="projects"
      className="relative bg-[#0E0E0E] px-6 md:px-16 lg:px-24 pt-32 pb-44"
    >
      {/* Header */}
      <FadeIn className="mb-20 max-w-[1400px] mx-auto">
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

      {/* Project grid */}
      <div className="max-w-[1400px] mx-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "60vh 44vh 50vh",
            gridTemplateAreas: `"a a a b b b" "c c d d e e" "f f f f f f"`,
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
      className="relative bg-[#0E0E0E] px-6 md:px-16 lg:px-24 pt-36 pb-48"
    >
      {/* Header */}
      <FadeIn className="max-w-[1400px] mx-auto mb-28">
        <p className="text-[9px] tracking-[0.55em] text-[#BFA37A] uppercase mb-7">
          04 — People
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-32">
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
            People Behind
            <br />
            <em>the Process</em>
          </h2>
          <p className="text-[#A8A8A8] text-[13px] leading-[2.3] font-light max-w-[360px] lg:pb-1.5">
            Behind every project is a team of specialists ensuring precision,
            material integrity, and execution at global standards.
          </p>
        </div>
        <div className="mt-14 h-px bg-white/[0.06]" />
      </FadeIn>

      {/* Team grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-7">
        {TEAM.map((member, i) => {
          const isActive = activeId === member.id;

          return (
            <FadeIn key={member.id} delay={i * 0.13}>
              <div
                className="group cursor-pointer"
                onClick={() =>
                  setActiveId((prev) => (prev === member.id ? null : member.id))
                }
              >
                {/* Portrait */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "58vh" }}
                >
                  <motion.img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.85, ease: EASE }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/38 transition-colors duration-500" />
                </div>

                {/* Text */}
                <div className="pt-8">
                  <p className="text-[7.5px] tracking-[0.5em] text-[#BFA37A] uppercase mb-4">
                    {member.role}
                  </p>
                  <h3
                    className="mb-5"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 300,
                      fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)",
                      letterSpacing: "0.04em",
                      color: "#F5F1EB",
                      lineHeight: 1.2,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[#A8A8A8] text-[11.5px] leading-[2.25] font-light">
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
                          height: { duration: 0.52, ease: EASE },
                          opacity: {
                            duration: 0.38,
                            delay: isActive ? 0.18 : 0,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6">
                          <div className="h-px bg-[#BFA37A] opacity-[0.18] mb-5" />
                          <p
                            style={{
                              fontFamily: "var(--font-cormorant)",
                              fontWeight: 300,
                              fontStyle: "italic",
                              fontSize: "0.92rem",
                              lineHeight: 2.1,
                              color: "#A8A8A8",
                              opacity: 0.8,
                            }}
                          >
                            {member.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Toggle indicator */}
                  <div className="mt-7 flex items-center gap-3">
                    <motion.span
                      className="block h-px bg-[#BFA37A] opacity-35"
                      animate={{ width: isActive ? 24 : 14 }}
                      transition={{ duration: 0.42, ease: EASE }}
                    />
                    <span className="text-[7px] tracking-[0.42em] text-[#A8A8A8]/40 uppercase">
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
      className="relative overflow-hidden py-40 px-6 md:px-16 lg:px-24"
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
            05 — Client Voice
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

const CATALOGUE_CARD_VARIANTS = {
  rest: { scale: 1 },
  hover: { scale: 1.006 },
};

const CATALOGUE_GLOW_VARIANTS = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

function CatalogueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-12% 0px" });
  const [focused, setFocused] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const FIELDS = [
    { id: "name",     label: "Full Name",       type: "text"  },
    { id: "email",    label: "Email Address",   type: "email" },
    { id: "company",  label: "Company / Studio", type: "text" },
    { id: "location", label: "Project Location", type: "text" },
  ];

  return (
    <section
      ref={sectionRef}
      id="catalogue"
      className="relative py-44 px-6 md:px-16 lg:px-24 border-t border-[#1A1A1A] overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto grid lg:grid-cols-2 gap-24 lg:gap-40 items-start">

        {/* LEFT — content */}
        <motion.div
          style={{ y: leftY }}
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, ease: LUX_EASE }}
          className="flex flex-col gap-12 lg:sticky lg:top-28"
        >
          <div className="flex flex-col gap-6">
            <p className="text-[10px] tracking-[0.45em] text-[#BFA37A] uppercase">
              06 — Private Access
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                letterSpacing: "0.03em",
                lineHeight: 1.18,
                color: "#F5F1EB",
              }}
            >
              Request Private
              <br />
              <em>Catalogue</em>
            </h2>
            <p
              className="text-[#A8A8A8] font-light leading-[2.2] max-w-[380px]"
              style={{ fontSize: "0.85rem", letterSpacing: "0.02em" }}
            >
              Gain exclusive access to our curated collection of luxury
              furniture pieces. Reserved for architects, designers, and
              industry professionals.
            </p>
          </div>

          <div className="h-px bg-white/[0.06] max-w-[180px]" />

          <ul className="flex flex-col gap-7">
            {[
              "Over 1,000+ premium pieces",
              "Detailed specifications & pricing",
              "Direct factory sourcing quotes",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -18 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: LUX_EASE, delay: 0.32 + i * 0.12 }}
                className="flex items-center gap-5"
              >
                <motion.span
                  className="shrink-0 h-px bg-[#BFA37A]"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 18 } : {}}
                  transition={{ duration: 0.55, ease: LUX_EASE, delay: 0.5 + i * 0.12 }}
                  style={{ display: "block", opacity: 0.55 }}
                />
                <span
                  className="text-[#A8A8A8] font-light leading-[1.9]"
                  style={{ fontSize: "0.83rem", letterSpacing: "0.04em" }}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          style={{ y: rightY }}
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, ease: LUX_EASE, delay: 0.2 }}
        >
          <motion.div
            variants={CATALOGUE_CARD_VARIANTS}
            initial="rest"
            whileHover="hover"
            transition={{ duration: 0.65, ease: LUX_EASE }}
            className="relative p-10 lg:p-14"
            style={{ background: "#121212" }}
          >
            <motion.div
              variants={CATALOGUE_GLOW_VARIANTS}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 65% 25%, rgba(191,163,122,0.045) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10 flex flex-col gap-9">
              {FIELDS.map(({ id, label, type }) => (
                <div key={id} className="relative pb-3">
                  <label
                    htmlFor={id}
                    className="block text-[9px] tracking-[0.4em] text-[#A8A8A8] uppercase mb-3"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent text-[#F5F1EB] text-sm font-light outline-none placeholder:text-[#2E2E2E] pb-1"
                    style={{ letterSpacing: "0.03em" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#2A2A2A]" />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#BFA37A] origin-left"
                    animate={{ scaleX: focused === id ? 1 : 0 }}
                    transition={{ duration: 0.42, ease: LUX_EASE }}
                  />
                </div>
              ))}

              <div className="relative pb-3">
                <label
                  htmlFor="details"
                  className="block text-[9px] tracking-[0.4em] text-[#A8A8A8] uppercase mb-3"
                >
                  Project Details
                </label>
                <textarea
                  id="details"
                  rows={3}
                  onFocus={() => setFocused("details")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-[#F5F1EB] text-sm font-light outline-none placeholder:text-[#2E2E2E] resize-none pb-1"
                  style={{ letterSpacing: "0.03em" }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#2A2A2A]" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#BFA37A] origin-left"
                  animate={{ scaleX: focused === "details" ? 1 : 0 }}
                  transition={{ duration: 0.42, ease: LUX_EASE }}
                />
              </div>

              <div className="pt-6">
                <motion.button
                  type="submit"
                  whileHover={{ backgroundColor: "#BFA37A", color: "#0E0E0E" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.38, ease: LUX_EASE }}
                  className="w-full border border-[#BFA37A] py-[18px] text-[9px] tracking-[0.5em] text-[#F5F1EB] uppercase font-light cursor-pointer"
                  style={{ backgroundColor: "transparent" }}
                >
                  Request Access
                </motion.button>
                <p
                  className="mt-5 text-center text-[#A8A8A8]"
                  style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}
                >
                  Your details are kept strictly confidential.
                </p>
              </div>
            </div>
          </motion.div>
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
      className="relative py-[140px] px-6 md:px-16 lg:px-24 overflow-hidden"
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
            07 — Contact
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
              className="px-10 py-14 lg:px-14 lg:py-16 flex flex-col gap-6"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
            >
              <p className="text-[9px] tracking-[0.48em] text-[#BFA37A] uppercase">
                Email Inquiries
              </p>
              <a
                href="mailto:chinacfsourcing.info@gmail.com"
                className="relative inline-block self-start"
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
              className="px-10 py-14 lg:px-14 lg:py-16 flex flex-col gap-6"
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

function FooterSection() {
  return (
    <footer
      className="border-t border-[#1C1C1C]"
      style={{ background: "#0E0E0E" }}
    >
      {/* Main columns */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 py-20 md:py-28 grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-24">

        {/* LEFT — Brand */}
        <div className="flex flex-col gap-6">
          <div
            className="w-8 h-8 border flex items-center justify-center shrink-0"
            style={{ borderColor: "#BFA37A", borderWidth: "0.75px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "0.55rem",
                letterSpacing: "0.08em",
                color: "#BFA37A",
              }}
            >
              CFS
            </span>
          </div>
          <p
            className="text-[#F5F1EB] uppercase font-light"
            style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
          >
            China Furniture Sourcing
          </p>
          <p
            className="text-[#A8A8A8] font-light leading-[1.9]"
            style={{ fontSize: "0.78rem", letterSpacing: "0.02em", maxWidth: "260px" }}
          >
            Premium furniture sourcing and manufacturing from Guangzhou, China — built for architects, designers, and global developers.
          </p>
        </div>

        {/* CENTER — Navigation */}
        <div className="flex flex-col gap-6">
          <p
            className="text-[#A8A8A8] uppercase"
            style={{ fontSize: "0.65rem", letterSpacing: "0.38em" }}
          >
            Navigation
          </p>
          <nav className="flex flex-col gap-[14px]">
            {[
              { label: "Our Collections",   href: "#collection" },
              { label: "Sourcing Services", href: "#capabilities" },
              { label: "Featured Projects", href: "#" },
              { label: "Request Catalogue", href: "#catalogue" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[#A8A8A8] hover:text-[#BFA37A] transition-colors duration-300 font-light"
                style={{ fontSize: "0.78rem", letterSpacing: "0.06em" }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* RIGHT — Contact */}
        <div className="flex flex-col gap-6">
          <p
            className="text-[#A8A8A8] uppercase"
            style={{ fontSize: "0.65rem", letterSpacing: "0.38em" }}
          >
            Contact
          </p>
          <div className="flex flex-col gap-[14px]">
            <a
              href="mailto:chinacfsourcing.info@gmail.com"
              className="text-[#A8A8A8] hover:text-[#BFA37A] transition-colors duration-300 font-light"
              style={{ fontSize: "0.78rem", letterSpacing: "0.03em" }}
            >
              chinacfsourcing.info@gmail.com
            </a>
            <a
              href="tel:+8618688246482"
              className="text-[#A8A8A8] hover:text-[#BFA37A] transition-colors duration-300 font-light"
              style={{ fontSize: "0.78rem", letterSpacing: "0.03em" }}
            >
              +86 186 8824 6482
            </a>
            <p
              className="text-[#A8A8A8] font-light"
              style={{ fontSize: "0.78rem", letterSpacing: "0.03em" }}
            >
              Guangzhou, China
            </p>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1C1C1C] max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-[#A8A8A8] font-light"
          style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}
        >
          © 2026 CFS. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          {["Privacy Policy", "Terms"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#A8A8A8] hover:text-[#F5F1EB] transition-colors duration-300 font-light"
              style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}
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
      <section className="relative h-screen min-h-[640px] overflow-hidden select-none">

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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="text-[9px] tracking-[0.6em] text-[#BFA37A] uppercase mb-7"
          >
            Global Furniture Manufacturer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.55, ease: EASE }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 400,
              fontSize: "clamp(2.6rem, 5.2vw, 5.2rem)",
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              color: "#F5F1EB",
            }}
          >
            Luxury Furniture
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.72, ease: EASE }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2.6rem, 5.2vw, 5.2rem)",
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              color: "#BFA37A",
            }}
          >
            Sourcing from China
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.95, ease: EASE }}
            className="mt-7 text-[13px] text-[#A8A8A8] font-light leading-[1.95] max-w-[400px]"
          >
            Connecting global buyers with verified manufacturers — delivering
            precision-made furniture for architects, designers, and high-end
            residential projects worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 1.2, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ backgroundColor: "#BFA37A", borderColor: "#BFA37A", color: "#0E0E0E" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="border border-[#BFA37A] px-8 py-3.5 text-[9px] tracking-[0.45em] text-[#F5F1EB] uppercase font-light cursor-pointer whitespace-nowrap"
            >
              Request Private Catalogue
            </motion.button>

            <motion.button
              whileHover={{ backgroundColor: "rgba(245,241,235,0.07)", borderColor: "rgba(245,241,235,0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="border border-[#F5F1EB]/20 px-8 py-3.5 text-[9px] tracking-[0.45em] text-[#A8A8A8] uppercase font-light cursor-pointer whitespace-nowrap"
            >
              Explore Collection
            </motion.button>
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
      <section className="relative bg-[#0E0E0E] py-[120px] px-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          {[
            { to: 500,   suffix: "+", label: "Verified Manufacturers" },
            { to: 12,    suffix: "+", label: "Countries Served"       },
            { to: 10000, suffix: "+", label: "Pieces Delivered"       },
            { to: 100,   suffix: "%", label: "Quality Assured"        },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.14} className="flex flex-col items-center text-center">
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 400,
                  fontSize: "clamp(2.8rem, 5vw, 4.8rem)",
                  lineHeight: 1,
                  color: "#F5F1EB",
                  letterSpacing: "-0.01em",
                }}
              >
                <CountUp to={stat.to} suffix={stat.suffix} />
              </p>
              <div className="mt-5 w-7 h-px bg-[#BFA37A] opacity-80" />
              <p className="mt-4 text-[9px] tracking-[0.5em] text-[#A8A8A8] uppercase">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.08]" />
      </section>

      {/* ── 2. BRAND STATEMENT ────────────────────────────── */}
      <section className="px-6 md:px-20 py-40 max-w-3xl mx-auto text-center">
        <FadeIn>
          <p
            className="text-[#A8A8A8] leading-[2.4] font-light"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            }}
          >
            CFS is a design-led global furniture manufacturer delivering luxury
            furniture with precision, control, and consistency — built for
            architects, designers, and high-end clients worldwide.
          </p>
        </FadeIn>
      </section>

      <FadeIn className="w-px h-20 bg-[#BFA37A] opacity-20 mx-auto" />

      {/* ── 3. OUR COLLECTION ─────────────────────────────── */}
      <OurCollection />

      {/* ── 3b. OUR EXPERTISE ─────────────────────────────── */}
      <OurExpertise />

      {/* ── 3c. FEATURED WORK ─────────────────────────────── */}
      <FeaturedWork />

      {/* ── 3d. PEOPLE BEHIND THE PROCESS ────────────────── */}
      <PeopleSection />

      {/* ── 3e. CLIENT VOICE ──────────────────────────────── */}
      <TestimonialsSection />

      {/* ── 4. IMAGE + TEXT SPLIT ─────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-40 grid md:grid-cols-2 gap-16 lg:gap-28 items-center max-w-[1400px] mx-auto">
        <FadeIn delay={0.1}>
          <div className="overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1, ease: EASE }}
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85"
              alt="Luxury interior"
              className="w-full h-[55vh] md:h-[70vh] object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="flex flex-col gap-8">
          <p className="text-[10px] tracking-[0.45em] text-[#BFA37A] uppercase">
            Materials &amp; Craft
          </p>
          <h2
            className="text-[#F5F1EB] leading-[1.25]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "0.04em",
            }}
          >
            Designed for the
            <br />
            <em>Discerning Eye</em>
          </h2>
          <p className="text-[#A8A8A8] text-sm leading-[2.2] font-light max-w-sm">
            Every piece is built with a deep focus on materials, proportions,
            and long-term durability — designed for high-end global spaces.
          </p>
          <p className="text-[#A8A8A8] text-sm leading-[2.2] font-light max-w-sm">
            We work directly with a curated network of artisans and
            manufacturers, ensuring every detail meets the standard our clients
            expect.
          </p>
        </FadeIn>
      </section>

      {/* ── 5. CAPABILITIES ───────────────────────────────── */}
      <section id="capabilities" className="px-6 md:px-16 lg:px-24 py-40 max-w-[1400px] mx-auto">
        <FadeIn className="mb-20 text-center">
          <p className="text-[10px] tracking-[0.45em] text-[#BFA37A] uppercase mb-5">
            Offerings
          </p>
          <h2
            className="text-[#F5F1EB]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              letterSpacing: "0.12em",
            }}
          >
            Capabilities
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-px bg-[#1C1C1C]">
          {capabilities.map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <motion.div
                whileHover={{ backgroundColor: "#161616" }}
                transition={{ duration: 0.5 }}
                className="bg-[#121212] p-14 lg:p-16 flex flex-col gap-8 h-full cursor-default"
              >
                <span className="text-[10px] tracking-[0.35em] text-[#BFA37A]">
                  {item.num}
                </span>
                <h3
                  className="text-[#F5F1EB]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontSize: "1.3rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-[#A8A8A8] text-sm leading-[2.1] font-light">
                  {item.desc}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── 6. PROCESS ────────────────────────────────────── */}
      <section id="process" className="px-6 md:px-16 lg:px-24 py-40 max-w-[1400px] mx-auto">
        <FadeIn className="text-center mb-24">
          <p className="text-[10px] tracking-[0.45em] text-[#BFA37A] uppercase mb-5">
            How We Work
          </p>
          <h2
            className="text-[#F5F1EB]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              letterSpacing: "0.12em",
            }}
          >
            Our Process
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-4 gap-px bg-[#1C1C1C]">
          {process.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-[#121212] p-10 lg:p-12 flex flex-col gap-6 h-full">
                <span className="text-[10px] tracking-[0.35em] text-[#BFA37A]">
                  0{i + 1}
                </span>
                <h3
                  className="text-[#F5F1EB]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontSize: "1.15rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  {item.step}
                </h3>
                <p className="text-[#A8A8A8] text-sm leading-[2.1] font-light">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CINEMATIC IMAGE ───────────────────────────────── */}
      <FadeIn className="px-6 md:px-16 lg:px-24 py-6 max-w-[1400px] mx-auto">
        <div className="overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1.2, ease: EASE }}
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=85"
            alt="Luxury living space"
            className="w-full h-[55vh] md:h-[72vh] object-cover"
          />
        </div>
      </FadeIn>

      {/* ── 7. GLOBAL PRESENCE ────────────────────────────── */}
      <section className="py-48 text-center px-6">
        <FadeIn>
          <p className="text-[10px] tracking-[0.5em] text-[#BFA37A] uppercase mb-10">
            Reach
          </p>
          <h2
            className="text-[#F5F1EB] mb-10"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              letterSpacing: "0.12em",
            }}
          >
            A Global Standard
          </h2>
          <p className="text-[#A8A8A8] text-sm md:text-base leading-[2.4] max-w-lg mx-auto font-light">
            Serving clients across the UK, Europe, UAE, and beyond — with the
            same standard of precision regardless of destination.
          </p>
        </FadeIn>
      </section>

      {/* ── 7b. PRIVATE CATALOGUE ────────────────────────── */}
      <CatalogueSection />

      {/* ── 8. CONTACT ────────────────────────────────────── */}
      <ContactSection />

      {/* ── FOOTER ────────────────────────────────────────── */}
      <FooterSection />

    </main>
  );
}
