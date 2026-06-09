import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Front-end Web Developer",
    company: "Independent Projects",
    duration: "Project-Based",
    description: "Developed the Finly app (Personal Finance Tracker) for real-time cash flow monitoring with dynamic calculations. Built an interactive portfolio website featuring physics-based animations, optimized for SEO and high performance.",
    tech: ["JavaScript (ES6+)", "HTML5/CSS3", "Git/GitHub", "SEO"]
  },
  {
    id: 2,
    role: "Front-end Web Developer",
    company: "App Eventix",
    duration: "Project-Based",
    description: "Designed and built the user interfaces for the Eventix app and the Web Prime Property platform. Implemented Responsive Web Design using a grid and flexbox system to ensure optimal display across various mobile and desktop devices.",
    tech: ["Responsive Web Design", "UI/UX Implementation", "JavaScript"]
  },
  {
    id: 3,
    role: "Fullstack Web Developer",
    company: "Prime-Property",
    duration: "Project-Based",
    description: "Developed a website platform for Prime Property. Utilized CSS Grid and Flexbox to create a clean, dynamic property listing layout optimized for both mobile and desktop devices. Implemented responsive design principles to ensure a seamless user experience across various screen sizes. Integrated the website with a backend database to manage property listings and user interactions effectively.",
    tech: ["Next.js", "Tailwind CSS", "Superbase", "Git/GitHub"]
  },
  {
    id: 4,
    role: "Officers & Administrators",
    company: "Pondok Pesantren Darul Hijrah Al-Madaniyyah",
    duration: "2021 - 2023",
    description: "Managed internal administrative record-keeping such as attendance and student data management. Participated in coordinating activities by fostering a structured work culture, discipline, and punctuality in task completion.",
    tech: ["Administration", "Time Management", "Teamwork"]
  },
];

export const ExperienceTimeline = () => {
  return (
    // TAMBAHAN BARU: z-50, border-t, dan shadow atas biar efek "numpuk/kartu" makin estetik dan jelas batasnya
    <section id="journey" className="relative z-50 w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-background overflow-hidden border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      
      {/* Judul Section */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20 relative z-10 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }} 
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground"
        >
          My <span className="text-purple-500">Journey</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-foreground/70">
          Here are some of my professional experiences.
        </motion.p>
      </div>

      {/* Container Timeline */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0">

        {/* Garis Vertikal Tengah (Desktop) / Kiri (Mobile) */}
        <div className="absolute left-3.25 sm:left-4.25 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2" />

        {/* List Pengalaman */}
        {experiences.map((exp, index) => {
          // Selang-seling posisi kiri & kanan untuk desktop
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }} // UBAH: once jadi false
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`relative flex items-center justify-between md:justify-normal mb-12 sm:mb-14 md:mb-16 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Titik Lingkaran di Garis */}
              <div className="absolute left-0 sm:left-0.75 md:left-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-background border-3 sm:border-4 border-purple-600 rounded-full md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full" />
              </div>

              {/* Kartu Konten */}
              <div className={`w-[90%] sm:w-[85%] ml-10 sm:ml-12 md:ml-0 md:w-[48%] min-h-220px md:min-h-280px p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm hover:bg-white/5 transition-all duration-300 ${
                isEven ? "md:text-right" : "md:text-left"
              }`}>
                {/* Durasi */}
                <span className="inline-block px-2.5 sm:px-3 py-1 mb-3 sm:mb-4 text-xs font-mono font-semibold text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                  {exp.duration}
                </span>

                {/* Posisi & Perusahaan */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                <h4 className="text-sm sm:text-base md:text-lg text-foreground/60 mb-3 sm:mb-4">{exp.company}</h4>

                {/* Deskripsi */}
                <p className="text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed mb-4 sm:mb-6">
                  {exp.description}
                </p>

                {/* Tech Stack Tags */}
                <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                  {exp.tech.map((tech, i) => (
                    <span key={i} className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-foreground/70 bg-white/5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
};