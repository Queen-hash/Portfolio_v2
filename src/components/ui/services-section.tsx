'use client';

import React, { useEffect, useRef } from 'react';
import { Code2, LayoutTemplate, Zap, Smartphone, Search, Database } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TiltCard = ({ service }: { service: any }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 👇 Validasi: Kalau di layar HP (kurang dari 768px), batalkan efek miring 3D
    if (!cardRef.current || window.innerWidth < 768) return; 
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = ((y - rect.height / 2) / rect.height) * -15; 
    const rotateY = ((x - rect.width / 2) / rect.width) * 15;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    cardRef.current.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    // 👇 Validasi: Kalau di layar HP, batalkan efek reset rotasi
    if (!cardRef.current || window.innerWidth < 768) return; 
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    cardRef.current.style.transition = 'transform 0.5s ease-out';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card p-6 md:p-8 rounded-3xl md:rounded-3xl border border-white/5 bg-white/2 hover:bg-white/4 hover:shadow-[0_10px_40px_rgba(147,51,234,0.15)] group flex flex-col will-change-transform"
    >
      <div className="mb-4 md:mb-6 p-3 rounded-2xl bg-white/5 w-fit border border-white/5 group-hover:border-purple-500/30 transition-colors duration-300">
        {service.icon}
      </div>
      <h3 className="text-base md:text-lg font-semibold text-white/90 mb-2 md:mb-3">
        {service.title}
      </h3>
      <p className="text-[13px] md:text-sm text-white/40 leading-relaxed font-light mb-6 md:mb-8 grow">
        {service.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {service.tags.map((tag: string, tagIndex: number) => (
          <span 
            key={tagIndex} 
            className="px-2.5 py-1 md:px-3 md:py-1 text-[9px] md:text-[10px] font-medium tracking-wide text-white/50 bg-white/5 rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // INI BAGIAN YANG GUA EDIT: Animasi 3D Flip In GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { 
          opacity: 0, 
          y: 60,
          rotationX: -45, // Miring ke belakang pas belum muncul
          transformPerspective: 1000, // Menambahkan kedalaman 3D
          scale: 0.8 // Mengecil sedikit
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0, // Berubah jadi tegak lurus
          scale: 1,
          duration: 1.2,
          stagger: 0.15, // Beruntun dari kiri ke kanan
          ease: 'power3.out', // Rem perlahan di akhir animasi
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <Code2 className="w-5 h-5 text-white/80 group-hover:text-purple-400 transition-colors duration-300" strokeWidth={1.5} />,
      title: 'Frontend Engineering',
      desc: 'Crafting interactive and scalable web applications. I focus on clean architecture and writing maintainable code that scales.',
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript']
    },
    {
      icon: <LayoutTemplate className="w-5 h-5 text-white/80 group-hover:text-purple-400 transition-colors duration-300" strokeWidth={1.5} />,
      title: 'UI Implementation',
      desc: 'Translating complex Figma designs into pixel-perfect, fluid interfaces. Bridging the gap between design and technical execution.',
      tags: ['Tailwind CSS', 'Framer Motion', 'Pixel Perfect']
    },
    {
      icon: <Zap className="w-5 h-5 text-white/80 group-hover:text-purple-400 transition-colors duration-300" strokeWidth={1.5} />,
      title: 'Web Optimization',
      desc: 'Fine-tuning load times and core web vitals. I make sure your application runs fast, efficiently, and retains users.',
      tags: ['Performance', 'Core Web Vitals']
    },
    {
      icon: <Smartphone className="w-5 h-5 text-white/80 group-hover:text-purple-400 transition-colors duration-300" strokeWidth={1.5} />,
      title: 'Mobile-First UI',
      desc: 'Building responsive layouts that adapt naturally. Ensuring seamless user experiences from ultra-wide monitors to smartphone screens.',
      tags: ['Responsive', 'Cross-browser']
    },
    {
      icon: <Search className="w-5 h-5 text-white/80 group-hover:text-purple-400 transition-colors duration-300" strokeWidth={1.5} />,
      title: 'Technical SEO',
      desc: 'Structuring web semantics and metadata so search engines can read and rank your content efficiently.',
      tags: ['SEO Friendly', 'Semantics']
    },
    {
      // Gua tambahin 1 layanan lagi biar pas 6 kotak (grid 3 kolomnya penuh)
      icon: <Database className="w-5 h-5 text-white/80 group-hover:text-purple-400 transition-colors duration-300" strokeWidth={1.5} />,
      title: 'API Integration',
      desc: 'Connecting frontend interfaces with robust backend services. Handling dynamic data fetching and state management securely.',
      tags: ['REST API', 'JSON', 'State Management']
    }
  ];

  return (
    <section 
      id="services"  
      ref={containerRef} 
      className="relative z-50 w-full px-4 py-24 bg-background flex flex-col items-center border-b border-white/5"
    >
      {/* Header - Editorial Style */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-3xl flex flex-col items-center">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-20xl font-extrabold text-foreground drop-shadow-md">
            What I<span className="text-purple-500"> Do</span> </h2>
        </div>
        <p className="text-sm text-white/50 max-w-md leading-relaxed font-light mt-4">
          Delivering end-to-end technical solutions. From slicing designs to optimizing performance, I build web experiences that just work.
        </p>
      </div>

      {/* Grid Cards - Rata Kiri */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {services.map((service, index) => (
          // Panggil komponen 3D-nya di sini
          <TiltCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};