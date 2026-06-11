import { useEffect } from 'react';

// 1. Import Icon Sosmed
import { Mail } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { ExperienceTimeline } from "@/components/ui/experience-timeline";
import { ProjectsSection } from "@/components/ui/projects-section"; 
import { StatsBento } from "@/components/ui/stats-bento";
import { ServicesSection } from './components/ui/services-section';
import { FooterSection } from './components/ui/footer-section';

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SERVICE', href: '#services' },
    { label: 'CONTACT', href: '#footer' },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/munawardy-dy-1992b52ba' },
    { icon: FaGithub, href: 'https://github.com/Queen-hash' },
    { icon: FaInstagram, href: 'https://www.instagram.com/_nrrdyy' },
    { icon: Mail, href: 'mailto:wincakardi.040105@gmail.com' }, 
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground">

      <main> 
        
        {/* --- BLOK 1: HERO SECTION --- */}
        <MinimalistHero 
          logoText="dy.dev"
          navLinks={navLinks}
          mainText="Front-end developer blending engineering logic with modern design. I build fast, scalable, and pixel perfect web applications."
          readMoreLink="#about"
          imageSrc="/foto1.PNG"
          imageAlt="Munawardy DY"
          overlayText={{
            part1: 'code &',
            part2: 'craft.',
          }}
          socialLinks={socialLinks}
          locationText="Indonesia"
        />

        <StatsBento />
        <ExperienceTimeline />
        <ProjectsSection/>
        <ServicesSection />
        
      </main> 

      <FooterSection />
    </div>
  );
};

export default App;