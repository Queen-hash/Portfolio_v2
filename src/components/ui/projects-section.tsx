'use client';

import React, { forwardRef, HTMLAttributes, ReactNode, Ref, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 1. DATA 5 PROYEK (Ditambahin Gambar & Link) ---
const projectsData = [
  { 
    id: 4, 
    title: "Web Prime Property", 
    category: "Web Platform", 
    description: "An interactive real estate website platform designed to make it easy for users to search for properties. ", 
    tech: ["UI/UX", "Next.js", "Tailwind CSS", "supabase", "CSS3"],
    img: "/prime-property.png", 
    link: "https://prime-property-agency-nine.vercel.app/" 
  },
  { 
    id: 3, 
    title: "App Eventix", 
    category: "UI/UX & Web Platform", 
    description: "Designing and building the user interface for an event management application (Eventix) that is optimized for both mobile and desktop devices.", 
    tech: ["Responsive Design", "JavaScript", "CSS"],
    img: "/eventix1.jpg", 
    link: "https://eventix-b95xamr2x-wincakardi040105-1983s-projects.vercel.app" 
  },
  { 
    id: 2, 
    title: "Interactive Portfolio", 
    category: "Web Development", 
    description: "An interactive portfolio website with custom physics animations, optimized for SEO and high performance.", 
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    img: "/portfolio.png", 
    link: "https://munawardy.com" 
  },
  { 
    id: 1, 
    title: "Finly (Finance Tracker)", 
    category: "Web Application", 
    description: "A financial tracking app for monitoring cash flow in real time with dynamic calculations and a responsive interface.", 
    tech: ["JavaScript", "HTML/CSS", "Flexbox"],
    img: "/finly.jpg", 
    link: "https://queen-hash.github.io/Finly-Budget-Planner/" 
  },
  { 
    id: 5, 
    title: "Coming Soon...", 
    category: "Future Exploration", 
    description: "Innovative ideas and exploration of modern technology are currently in the development phase.", 
    tech: ["???", "???"],
    img: "/soon.jpg", 
    link: "#"
  }
];

// --- 2. HOOKS UTILITY UNTUK MESIN GSAP ---
function useMergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) return null;
    return (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') ref(node);
        else if (ref != null) (ref as React.MutableRefObject<T | null>).current = node;
      });
    };
  }, [refs]);
}

function useResponsiveValue(baseValue: number, mobileValue: number) {
  const [value, setValue] = useState(baseValue);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setValue(window.innerWidth < 768 ? mobileValue : baseValue);
    handleResize();
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [baseValue, mobileValue]);
  return value;
}

// --- 3. KOMPONEN CORE GSAP (Mesin Rotasi) ---
export interface RadialScrollGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (hoveredIndex: number | null) => ReactNode[];
  scrollDuration?: number;
  visiblePercentage?: number;
  baseRadius?: number;
  mobileRadius?: number;
  startTrigger?: string;
  onItemSelect?: (index: number) => void;
  direction?: 'ltr' | 'rtl';
  disabled?: boolean;
}

const RadialScrollGallery = forwardRef<HTMLDivElement, RadialScrollGalleryProps>((
  { children, scrollDuration = 2500, visiblePercentage = 45, baseRadius = 550, mobileRadius = 220, className = '', startTrigger = 'center center', onItemSelect, direction = 'ltr', disabled = false, ...rest }, ref
) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);
  const childRef = useRef<HTMLLIElement>(null);
  const mergedRef = useMergeRefs(ref, pinRef);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [childSize, setChildSize] = useState<{ w: number; h: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const currentRadius = useResponsiveValue(baseRadius, mobileRadius);
  const circleDiameter = currentRadius * 2;

  const { visibleDecimal, hiddenDecimal } = useMemo(() => {
    const clamped = Math.max(10, Math.min(100, visiblePercentage));
    return { visibleDecimal: clamped / 100, hiddenDecimal: 1 - (clamped / 100) };
  }, [visiblePercentage]);

  const childrenNodes = useMemo(() => children ? React.Children.toArray(children(hoveredIndex)) : [], [children, hoveredIndex]);
  const childrenCount = childrenNodes.length;

  useEffect(() => {
    setIsMounted(true);
    if (!childRef.current) return;
    const observer = new ResizeObserver((entries) => {
      let hasChanged = false;
      for (const entry of entries) {
        setChildSize({ w: entry.contentRect.width, h: entry.contentRect.height });
        hasChanged = true;
      }
      if (hasChanged) ScrollTrigger.refresh();
    });
    observer.observe(childRef.current);
    return () => observer.disconnect();
  }, [childrenCount]);

  useGSAP(() => {
    if (!pinRef.current || !containerRef.current || childrenCount === 0) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      gsap.fromTo(containerRef.current.children, { scale: 0, autoAlpha: 0 }, {
        scale: 1, autoAlpha: 1, duration: 1.2, ease: 'back.out(1.2)', stagger: 0.05,
        scrollTrigger: { trigger: pinRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
      gsap.to(containerRef.current, {
        rotation: 360, ease: 'none',
        scrollTrigger: { trigger: pinRef.current, pin: true, start: startTrigger, end: `+=${scrollDuration}`, scrub: 1, invalidateOnRefresh: true },
      });
    }
  }, { scope: pinRef, dependencies: [scrollDuration, currentRadius, startTrigger, childrenCount] });

  if (childrenCount === 0) return null;

  const calculatedBuffer = childSize ? childSize.h * 1.25 - childSize.h + 60 : 150;
  const visibleAreaHeight = childSize ? circleDiameter * visibleDecimal + childSize.h / 2 + calculatedBuffer : circleDiameter * visibleDecimal + 200;

  return (
    <div ref={mergedRef} className={`min-h-screen w-full relative flex items-center justify-center overflow-hidden ${className}`} {...rest}>
      <div className='relative w-full overflow-hidden' style={{ height: `${visibleAreaHeight}px`, maskImage: 'linear-gradient(to top, transparent 0%, black 40%, black 100%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%, black 100%)' }}>
        <ul ref={containerRef} className={`absolute left-1/2 -translate-x-1/2 will-change-transform m-0 p-0 list-none transition-opacity duration-500 ease-out ${disabled ? 'opacity-50 pointer-events-none grayscale' : ''} ${isMounted ? 'opacity-100' : 'opacity-0'}`} dir={direction} style={{ width: circleDiameter, height: circleDiameter, bottom: -(circleDiameter * hiddenDecimal) }}>
          {childrenNodes.map((child, index) => {
            const angle = (index / childrenCount) * 2 * Math.PI;
            let x = currentRadius * Math.cos(angle);
            const y = currentRadius * Math.sin(angle);
            if (direction === 'rtl') x = -x;
            const rotationAngle = (angle * 180) / Math.PI;
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <li key={index} ref={index === 0 ? childRef : null} className='absolute top-1/2 left-1/2' style={{ zIndex: isHovered ? 100 : 10, transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rotationAngle + 90}deg)` }}>
                <div role='button' tabIndex={disabled ? -1 : 0} onClick={() => !disabled && onItemSelect?.(index)} onMouseEnter={() => !disabled && setHoveredIndex(index)} onMouseLeave={() => !disabled && setHoveredIndex(null)} className={`block cursor-pointer outline-none text-left rounded-xl transition-all duration-500 ease-out will-change-transform ${isHovered ? 'scale-110 -translate-y-8' : 'scale-100'} ${isAnyHovered && !isHovered ? 'blur-[2px] opacity-40 grayscale' : 'blur-0 opacity-100'}`}>
                  {child}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});
RadialScrollGallery.displayName = 'RadialScrollGallery';

// --- 4. EXPORT UTAMA: PROJECTS SECTION ---
export const ProjectsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="projects" className="relative z-50 w-full py-16 md:py-24 bg-background overflow-hidden border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      
      {/* Judul */}
      <div className="text-center mb-10 md:mb-16 relative z-10 px-4">
        <h2 className="text-4xl md:text-5xl lg:text-20xl font-extrabold text-foreground drop-shadow-md">
          My<span className="text-purple-500">Projects</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-foreground/70 max-w-2xl mx-auto">
         A collection of my technical explorations and projects. 
         Each project is a unique blend of creativity, problem solving, and technical skill, 
         showcasing my passion for crafting innovative digital experiences. 
         Dive in to see how I turn ideas into interactive realities.
        </p>
      </div>

      {!mounted ? null : isMobile ? (
        
        // ================= VERSI MOBILE (Stack Aman) =================
        <div className="flex flex-col gap-8 px-4 sm:px-8 w-full max-w-md mx-auto relative z-20">
          {projectsData.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative w-full min-h-75 rounded-3xl border border-white/10 overflow-hidden shadow-lg flex flex-col justify-end">
              
              {/* Gambar Background Mobile */}
              <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
              </div>

              {/* Konten Teks & Link */}
              <div className="relative z-10 p-6">
                <span className="text-xs font-mono font-semibold text-purple-400 mb-2 block">{project.category}</span>
                <h3 className={`text-2xl font-bold mb-3 ${project.id === 4 ? 'text-black drop-shadow-none' : 'text-foreground'}`}>{project.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${project.id === 4 ? 'text-black/90 font-medium' : 'text-foreground/80'}`}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => <span key={i} className="px-3 py-1 text-[10px] text-foreground/70 bg-white/10 backdrop-blur-md rounded-full border border-white/10">{t}</span>)}
                </div>
                {project.id !== 5 && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors w-fit pt-3 border-t border-white/10 mt-auto">
                    View Project <ArrowUpRight size={16} className="ml-1" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      ) : (

        // ================= VERSI PC (Radial GSAP) =================
        <div className="relative z-20">
          <RadialScrollGallery className="min-h-175!" baseRadius={420} mobileRadius={200} visiblePercentage={55} scrollDuration={2500}>
            {(hoveredIndex) => projectsData.map((project, index) => {
              const isActive = hoveredIndex === index;
              return (
                <div key={project.id} className="group relative w-75 h-100 overflow-hidden rounded-3xl bg-white/3 border border-white/10 shadow-xl flex flex-col transition-all duration-300">
                  
                  {/* Gambar Background PC */}
                  <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                    <img src={project.img} alt={project.title} className={`w-full h-full object-cover transition-transform duration-300 ease-out ${isActive ? 'scale-110 blur-0' : 'scale-100 blur-[2px] grayscale-50'}`} />
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/70 to-background/20" />
                  </div>
                  
                  {/* Konten Teks & Link */}
                  <div className="relative z-10 flex flex-col justify-between p-6 h-full">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-mono font-semibold text-purple-400 px-3 py-1 bg-background/50 backdrop-blur-md rounded-full border border-purple-500/20">{project.category}</span>
                        {project.id !== 5 && (
                          // Ini Tombol Klik Menuju Link Live Demo
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all duration-500 shadow-lg cursor-pointer pointer-events-auto ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                            <ArrowUpRight size={18} />
                          </a>
                        )}
                      </div>
                      <h3 className={`text-2xl font-bold leading-tight mb-3 ${project.id === 4 ? 'text-black drop-shadow-none' : 'text-foreground drop-shadow-md'}`}>{project.title}</h3>
                      <p className={`text-sm leading-relaxed line-clamp-4 ${project.id === 4 ? 'text-black/90 font-medium drop-shadow-none' : 'text-foreground/80 drop-shadow-sm'}`}>{project.description}</p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((t, i) => <span key={i} className="px-2 py-1 text-xs text-foreground bg-background/50 backdrop-blur-md rounded-full border border-white/10">{t}</span>)}
                      </div>
                      <div className={`h-1 bg-purple-500 rounded-full transition-all duration-500 shadow-[0_0_10px_#a855f7] ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                    </div>
                  </div>

                </div>
              );
            })}
          </RadialScrollGallery>
        </div>
      )}

    </section>
  );
};