export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex items-center">
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          About <span className="text-purple-500">Me</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl leading-relaxed">
          Hi, I'm Munawardy, a Front-End Developer and Informatics Engineering student. Coming from a disciplined background, 
          I thrive on writing clean, scalable code and turning complex problems into intuitive web interfaces. 
          My current toolkit revolves around React, Next.js, and Tailwind CSS. Whether I'm building a personal finance tracker or a real estate platform, 
          I always prioritize performance and a seamless user experience. When I'm not coding or studying, I'm usually exploring new web technologies to level up my stack.
        </p>
      </div>
    </section>
  );
};