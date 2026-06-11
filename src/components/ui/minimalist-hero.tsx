import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import OrbitingSkills from './orbiting-skills';
import { ArrowUpRight } from "lucide-react";

// Hook untuk deteksi ukuran layar

// --- Komponen Custom Spotlight (Versi Monokrom / Elegan) ---
const Spotlight = ({ className, ...props }: any) => {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-[100px] pointer-events-none", className)}
      {...props}
    />
  );
};

// --- Komponen Custom Typewriter ---
const TypewriterText = ({ prefix, words }: { prefix: string, words: string[] }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasStarted(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const currentWord = words[wordIndex];
    if (!isDeleting && displayedText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }
    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const typingSpeed = isDeleting ? 30 : 80;
    const timeout = setTimeout(() => {
      setDisplayedText(currentWord.substring(0, displayedText.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex, words, hasStarted]);

  return (
    <span className="flex flex-wrap items-center justify-center md:justify-start">
      <span>{prefix}&nbsp;</span>
      <span className="font-semibold text-purple-400">{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="ml-1 font-bold text-purple-500"
      >
        |
      </motion.span>
    </span>
  );
};

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  logoSrc?: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: { part1: string; part2: string; };
  socialLinks: { icon: React.ElementType; href: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground">
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a href={href} target="_blank" aria-label="Kunjungi profil sosial media saya" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  logoSrc,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setNavHidden] = useState(false);

 useEffect(() => {
  const target = document.querySelector('#footer');
  if (!target) return;
  const observer = new IntersectionObserver(
    ([entry]) => setNavHidden(entry.isIntersecting),
    { threshold: 1.0 }
  );
  observer.observe(target);
  return () => observer.disconnect();
}, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- RUMUS SCROLL ---
  const fadeOut = useTransform(smoothProgress, [0, 0.2, 1], [1, 0, 0]);
  const hidePointer = useTransform(smoothProgress, [0, 0.19, 0.2, 1], ["auto", "auto", "none", "none"]);
  const spotlightOpacity = useTransform(smoothProgress, [0, 0.2, 0.6, 1], [0, 0, 1, 1]);
  
  // Rumus animasi foto — PC
  const photoX = useTransform(smoothProgress, [0, 0.2, 0.6, 1], ["0%", "0%", "-60%", "-60%"]);
  const photoScale = useTransform(smoothProgress, [0, 0.2, 0.6, 1], [1.3, 1.3, 2.0, 2.0]);
  const photoY = useTransform(smoothProgress, [0, 0.2, 0.6, 1], ["0vh", "0vh", "15vh", "15vh"]);

  // Rumus animasi foto — Mobile only
  const photoXMobile = useTransform(smoothProgress, [0, 0.2, 0.6, 1], ["0%", "0%", "-30%", "-30%"]);
  const photoScaleMobile = useTransform(smoothProgress, [0, 0.2, 0.6, 1], [1.3, 1.3, 1.2, 1.2]);
  const photoYMobile = useTransform(smoothProgress, [0, 0.2, 0.6, 1], ["0vh", "0vh", "5vh", "5vh"]);

  // About section animasi — desktop
  const aboutX = useTransform(smoothProgress, [0, 0.2, 0.6, 1], ["60vw", "60vw", "10vw", "10vw"]);
  const aboutY = useTransform(smoothProgress, [0, 0.2, 0.6, 1], ["0vh", "0vh", "0vh", "0vh"]);
  const aboutOpacity = useTransform(smoothProgress, [0, 0.2, 0.6, 1], [0, 0, 1, 1]);
  // Mobile about: geser dari kanan, berhenti di sisi kanan layar
  const aboutXMobile = useTransform(smoothProgress, [0, 0.2, 0.6, 1], ["100vw", "100vw", "2vw", "2vw"]);

  return (
    <>
      {/* --- NAVBAR GLOBAL FIXED (Menempel terus di seluruh layar) --- */}
      <header className="fixed top-0 left-0 z-100 flex w-full justify-center bg-background/80 px-4 py-4 sm:px-6 sm:py-5 md:px-12 md:py-6 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="flex w-full max-w-7xl items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3 text-xl font-bold tracking-wider">
            {/* Memunculkan gambar logo jika ada prop logoSrc */}
            {logoSrc && (
              <img
                src={logoSrc}
                alt="Logo"
                // Ukuran diperbesar jadi h-10 di HP dan h-12 di PC. Kalau masih kurang gede, ganti jadi h-14 atau h-16
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            )}
            <span>{logoText}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </motion.div>
          <button 
            className="flex flex-col space-y-1.5 md:hidden" 
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`}></span>
          </button>
        </div>
        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden w-full mt-2 flex flex-col items-center gap-4 pb-4 border-t border-white/5 pt-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {/* --- HERO CONTAINER --- */}
      <div ref={containerRef} className={cn('relative h-[200vh] w-full bg-background', className)}>
        
        <div id="about" className="absolute top-[100vh] h-px w-full" />

        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-between overflow-hidden md:overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12 font-sans">
          
          {/* --- LAYER 0: BACKGROUND SPOTLIGHT RAKSASA --- */}
          <motion.div style={{ opacity: spotlightOpacity }} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Spotlight
              className="w-[80vw] h-[80vw] bg-white/4 top-[-30%] left-[-20%]"
              initial={{ x: "-50%", y: "-50%", rotate: "0deg" }}
              animate={{
                x: ["-50%", "-30%", "-70%", "-50%"],
                y: ["-50%", "-70%", "-30%", "-50%"],
                rotate: ["0deg", "15deg", "-15deg", "0deg"],
              }}
              transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            />
            <Spotlight
              className="w-[70vw] h-[90vw] bg-white/3 top-[10%] left-[30%]"
              initial={{ x: "0%", y: "0%", rotate: "0deg" }}
              animate={{
                x: ["0%", "20%", "-20%", "0%"],
                y: ["0%", "30%", "10%", "0%"],
                rotate: ["-20deg", "0deg", "20deg", "-20deg"],
              }}
              transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 3 }}
            />
            <Spotlight
              className="w-[90vw] h-[70vw] bg-white/4 bottom-[-30%] right-[-10%]"
              initial={{ x: "0%", y: "0%", rotate: "10deg" }}
              animate={{
                x: ["0%", "-30%", "10%", "0%"],
                y: ["0%", "-20%", "20%", "0%"],
                rotate: ["10deg", "-10deg", "25deg", "10deg"],
              }}
              transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 5 }}
            />
          </motion.div>

          {/* --- LAYER 1: ORBITING SKILLS (Desktop only, absolute center) --- */}
          <motion.div style={{ opacity: fadeOut, pointerEvents: hidePointer as any }} className="hidden md:flex absolute inset-0 z-0 items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1.9 }} transition={{ duration: 1.5 }}>
              <OrbitingSkills />
            </motion.div>
          </motion.div>

          {/* Dummy pengganti tinggi header biar layout Flex nggak berantakan */}
          <div className="w-full h-15" />

          {/* ============================================================ */}
          {/* MOBILE ABOUT ME — scroll-triggered, sama animasi kayak PC    */}
          {/* ============================================================ */}
          <motion.div
            style={{ opacity: aboutOpacity, x: aboutXMobile }}
            className="md:hidden absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              style={{ pointerEvents: aboutOpacity as any }}
              className="w-[55%] ml-auto mr-4 text-left space-y-3"
            >
              <h2 className="text-xl font-bold text-foreground">
                About <span className="text-purple-400">Me</span>
              </h2>
              <p className="text-xs leading-relaxed text-foreground/90">
                A front-end web developer from Indonesia with a passion for crafting clean, functional, and modern digital experiences. I focus on turning ideas into interactive, responsive interfaces — paying close attention to detail, performance, and user experience.
              </p>
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* MOBILE FOTO — absolute tersendiri, ikut animasi scroll       */}
          {/* sama persis kayak desktop: photoX, photoScale, photoY        */}
          {/* ============================================================ */}
          <motion.div
            style={{ x: photoXMobile }}
            className="md:hidden absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <motion.div style={{ scale: photoScaleMobile, y: photoYMobile }}>
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                src={imageSrc}
                alt={imageAlt}
                className="h-auto w-48 object-cover drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* MOBILE LAYOUT (hidden di md ke atas)                        */}
          {/* Urutan: [typewriter + code&craft] → [orbiting+foto] → [nama+desc+btn] */}
          {/* ============================================================ */}
          <motion.div
            style={{ opacity: fadeOut, pointerEvents: hidePointer as any }}
            className="md:hidden relative z-10 w-full flex flex-col items-center justify-between grow"
          >

            {/* ── BARIS 1: Typewriter + "code & craft" ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="w-full text-center pt-1 flex-none"
            >
              <div className="text-purple-500 font-mono text-xs flex justify-center mb-1">
                <TypewriterText prefix="Hey, I'm a" words={["Front-end Developer", "Web Developer"]} />
              </div>
              <h1 className="text-3xl font-extrabold text-foreground leading-tight">
                {overlayText.part1}
                <br />
                {overlayText.part2}
              </h1>
            </motion.div>

            {/* ── BARIS 2: Orbiting Skills saja (foto dihandle terpisah di bawah) ── */}
            <div className="relative flex items-center justify-center w-full flex-1 min-h-0">
              {/* Orbiting skills — absolute center */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <OrbitingSkills />
              </div>
              {/* Spacer supaya baris tetap punya tinggi */}
              <div className="w-44 h-44" />
            </div>

            {/* ── BARIS 3: Tombol → Nama → Deskripsi ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="w-full text-center space-y-4 pb-4 flex-none"
            >
              <div className="flex flex-col items-center gap-2 px-4">
                <a href="#projects" className="w-full px-6 py-2 bg-black-900 hover:bg-purple-600 text-white text-sm rounded-full font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.2)] text-center">
                  See project
                </a>
                <a href="#contact" className="w-full relative inline-flex items-center text-sm font-medium rounded-full h-10 p-1 ps-6 pe-12 group transition-all duration-500 overflow-hidden cursor-pointer bg-foreground/10 text-foreground border border-foreground/30 hover:bg-purple-600 hover:text-white hover:border-purple-500">
                  <span className="relative z-10 transition-all duration-500 truncate">Let's Collaborate</span>
                  <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-38px)] group-hover:rotate-45">
                    <ArrowUpRight size={14} />
                  </div>
                </a>
              </div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight drop-shadow-md">
                Munawardy
              </h2>
              <p className="mx-auto max-w-xs text-xs leading-relaxed text-foreground/90 drop-shadow-md px-4">
                {mainText}
              </p>
            </motion.div>

          </motion.div>

          {/* ============================================================ */}
          {/* DESKTOP LAYOUT (hidden di bawah md)                          */}
          {/* ============================================================ */}
          <div className="hidden md:grid relative z-10 w-full max-w-7xl grow grid-cols-3 items-center">
            
            {/* LAYER KIRI (TEKS & TOMBOL) */}
            <motion.div style={{ opacity: fadeOut, pointerEvents: hidePointer as any }} className="z-40 order-1 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 1 }} 
                className="space-y-4"
              >
                <div className="text-purple-500 font-mono text-sm md:text-base flex justify-start">
                  <TypewriterText prefix="Hey, I'm a" words={["Front-end Developer", "Web Developer"]} />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight drop-shadow-md">
                  Munawardy
                </h2>
                <p className="max-w-sm text-sm md:text-base leading-relaxed text-foreground/90 drop-shadow-md">
                  {mainText}
                </p>
                <div className="flex flex-row items-center justify-start gap-4 pt-4">
                  <a href="#projects" className="px-6 py-2.5 bg-black-900 hover:bg-purple-600 text-white text-base rounded-full font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.2)]">
                    See project
                  </a>
                  <a href="#contact" className="relative inline-flex items-center text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 overflow-hidden cursor-pointer bg-foreground/10 text-foreground border border-foreground/30 hover:bg-purple-600 hover:text-white hover:border-purple-500">
                    <span className="relative z-10 transition-all duration-500 truncate">
                      Let's Collaborate
                    </span>
                    <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </div>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* LAYER TENGAH: Foto Profil */}
            <motion.div style={{ x: photoX }} className="relative z-30 order-2 flex h-full items-center justify-center">
              <motion.div style={{ scale: photoScale, y: photoY }}>
                <motion.img
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  src={imageSrc}
                  alt={imageAlt}
                  className="relative z-10 h-auto w-60 lg:w-72 object-cover"
                />
              </motion.div>
            </motion.div>

            {/* LAYER KANAN: Watermark Text */}
            <motion.div style={{ opacity: fadeOut, pointerEvents: hidePointer as any }} className="z-10 order-3 flex items-center justify-start">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-foreground whitespace-nowrap"
              >
                {overlayText.part1}
                <br />
                {overlayText.part2}
              </motion.h1>
            </motion.div>

            {/* LAYER ABOUT ME (Desktop) */}
            <motion.div
              style={{ opacity: aboutOpacity, x: aboutX, y: aboutY }}
              className="absolute left-[35%] lg:left-[45%] top-1/2 z-40 w-full max-w-xl -translate-y-1/2 p-6 pointer-events-auto text-left"
            >
              <div className="space-y-6 drop-shadow-lg">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">
                  About <span className="text-purple-400">Me</span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90">
                  Hi, I'm Munawardy, a Front-End Developer and Informatics Engineering student. Coming from a disciplined background, 
                  I thrive on writing clean, scalable code and turning complex problems into intuitive web interfaces. 
                  My current toolkit revolves around React, Next.js, and Tailwind CSS. Whether I'm building a personal finance tracker or a real estate platform, 
                  I always prioritize performance and a seamless user experience. When I'm not coding or studying, 
                  I'm usually exploring new web technologies to level up my stack.
                </p>
              </div>
            </motion.div>

          </div>

          {/* FOOTER */}
          <motion.footer style={{ opacity: fadeOut, pointerEvents: hidePointer as any }} className="z-50 flex w-full max-w-7xl items-center justify-between relative px-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="flex w-full items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {socialLinks.map((link, index) => (
                  <SocialIcon key={index} href={link.href} icon={link.icon} />
                ))}
              </div>
              <div className="text-xs sm:text-sm font-medium text-foreground/80">
                {locationText}
              </div>
            </motion.div>
          </motion.footer>

        </div>
      </div>
    </>
  );
};