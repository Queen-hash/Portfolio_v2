export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex items-center">
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          About <span className="text-purple-500">Me</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl leading-relaxed">
          A front-end web developer from Indonesia with a
          passion for crafting clean, functional, and modern
          digital experiences. I focus on turning ideas into interactive,
          responsive interfaces — paying close attention to detail,
          performance, and user experience. Always curious, always learning,
          and always open to new challenges, collaborations,
          and exciting opportunities in the world of web development.
        </p>
      </div>
    </section>
  );
};