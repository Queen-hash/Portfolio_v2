"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail } from "lucide-react";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. INLINE STYLES UNTUK ANIMASI & GRID (Versi Aman Anti-Error)
// -------------------------------------------------------------------------
const STYLES = `
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 30s linear infinite;
}

/* Aurora breathe */
@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1;   }
}
.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

/* Background Grid Mirip Referensi */
.footer-bg-grid {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

/* Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(147, 51, 234, 0.12) 0%,
    rgba(255, 255, 255, 0.04) 40%,
    transparent 70%
  );
}

/* Teks Raksasa Latar Belakang (Metallic Cutout) */
.footer-giant-bg-text {
  font-size: 16vw;
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.05em;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.03);
}

/* Teks Utama (Metallic Glow) */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 0px 20px rgba(255,255,255,0.1));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON (Tombol Kapsul Mengikuti Mouse)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || window.innerWidth < 768) return; // Nonaktif di HP
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
         const rect = element.getBoundingClientRect();
         const centerX = rect.left + rect.width / 2;
         const centerY = rect.top + rect.height / 2;

         // Normalize: hasil selalu -1 sampai 1, tidak peduli ukuran button
         const x = (e.clientX - centerX) / (rect.width / 2);
         const y = (e.clientY - centerY) / (rect.height / 2);

          gsap.to(element, {
            x: x * 8,        // max geser 8px — sama untuk semua button
            y: y * 4,        // max geser 4px
            scale: 1.04,
            ease: "power2.out",
            duration: 0.15,  // snappy seperti button kecil
         });
       };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: .3,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. KOMPONEN UTAMA FOOTER
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>FRONTEND DEVELOPMENT</span> <span className="text-white/20">✦</span>
    <span>UI/UX DESIGN</span> <span className="text-white/20">✦</span>
    <span>RESPONSIVE ARCHITECTURE</span> <span className="text-white/20">✦</span>
    <span>WEB OPTIMIZATION</span> <span className="text-white/20">✦</span>
    <span>API INTEGRATION</span> <span className="text-white/20">✦</span>
  </div>
);

export function FooterSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Efek Paralaks Teks MUNAWARDY (Naik perlahan saat di-scroll)
      gsap.fromTo(
        giantTextRef.current,
        { y: "20%", scale: 0.95, opacity: 0 },
        {
          y: "0%",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Heading reveal (scroll-linked, smooth)
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 75%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Links stagger reveal (scroll-linked)
      gsap.fromTo(
        linksRef.current?.children ? Array.from(linksRef.current.children) : [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* Container utama.
        Diubah dari format 'clip-path' yang kaku menjadi struktur relatif 
        yang dipastikan selalu tampil di layar.
      */}
      {/* Curtain Reveal Wrapper: konten hanya terlihat di dalam bounding box */}
      <div
        id="footer"
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* Footer fixed di bawah — muncul lewat efek curtain saat scroll */}
        <footer 
          className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#050505] text-white pt-28 border-t border-white/5 font-sans"
        >
        
        {/* Aurora Glow (Animasi Nafas) */}
        <div className="footer-aurora animate-footer-breathe absolute left-1/2 top-1/2 h-[60vh] w-[80vw] rounded-[50%] blur-[80px] pointer-events-none z-0" />

        {/* Latar Belakang Grid & Bayangan Gelap */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* Teks Raksasa (Di Belakang) */}
        <div
          ref={giantTextRef}
          className="footer-giant-bg-text absolute -bottom-5 md:-bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
        >
          MUNAWARDY
        </div>

        {/* Top: Diagonal Marquee */}
        <div className="absolute top-28 left-0 w-full overflow-hidden border-y border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md py-3 z-10 -rotate-2 scale-105 shadow-2xl">
          <div className="flex w-max animate-footer-scroll-marquee text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/40 uppercase">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* Center: Main Content */}
        <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 mt-16 w-full max-w-5xl mx-auto">
          
          <h2 ref={headingRef} className="text-5xl md:text-7xl lg:text-8xl font-black footer-text-glow tracking-tighter mb-10 text-center drop-shadow-2xl">
            Ready to begin?
          </h2>

          {/* Tombol Kapsul Utama (Baris 1) */}
          <div ref={linksRef} className="w-full flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 w-full">
            <MagneticButton 
              as="a" 
              href="mailto:wincakardi.040105@gmail.com" 
              className="group px-8 py-4 md:px-10 md:py-5 rounded-full border border-white/10 bg-white/3 backdrop-blur-xl hover:bg-white/8 hover:border-white/20 transition-all duration-30 flex items-center gap-3 text-white/90 hover:text-white font-medium text-sm md:text-base shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <Mail className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              Start a Project
            </MagneticButton>
            
            <MagneticButton 
              as="a" 
              href="https://www.linkedin.com/in/munawardy-dy-1992b52ba" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group px-8 py-4 md:px-10 md:py-5 rounded-full border border-white/10 bg-white/3 backdrop-blur-xl hover:bg-white/8 hover:border-white/20 transition-all duration-30 flex items-center gap-3 text-white/90 hover:text-white font-medium text-sm md:text-base shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              Hire on LinkedIn
            </MagneticButton>
          </div>

          {/* Tombol Kapsul Sekunder (Baris 2) */}
          <div className="flex flex-wrap justify-center gap-3 w-full mt-6">
            <MagneticButton 
              as="a" 
              href="https://github.com/Queen-hash" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2.5 rounded-full border border-white/5 bg-white/2 hover:bg-white/6 transition-colors text-white/50 hover:text-white text-xs md:text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </MagneticButton>
            <MagneticButton 
              as="a" 
              href="https://www.instagram.com/_nrrdyy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2.5 rounded-full border border-white/5 bg-white/2 hover:bg-white/6 transition-colors text-white/50 hover:text-white text-xs md:text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Instagram
            </MagneticButton>
          </div>

          </div>{/* tutup linksRef */}

        </div>

        {/* Bottom Bar (Credits & Back to Top) */}
        <div className="relative z-20 w-full mt-24 pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <div className="text-white/30 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 text-center md:text-left">
            © 2026 MUNAWARDY. ALL RIGHTS RESERVED.
          </div>

          {/* Kapsul Status (Tengah) persis seperti referensi */}
          <div className="px-5 py-3 rounded-full border border-white/10 bg-white/3 flex items-center gap-2 order-1 md:order-2 cursor-default backdrop-blur-md">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/70 text-[9px] md:text-[10px] font-bold tracking-widest uppercase ml-1">
              Available for work
            </span>
          </div>

          {/* Tombol Back to Top (Kanan) */}
          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/3 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-purple-500 hover:bg-purple-500/30 transition-colors group order-3"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </MagneticButton>

        </div>
        </footer>
      </div>{/* tutup curtain wrapper */}
    </>
  );
}