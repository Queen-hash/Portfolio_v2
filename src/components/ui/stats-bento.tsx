'use client';
import { FolderGit2, ShieldCheck, Sparkles } from 'lucide-react';

export const StatsBento = () => {
  return (
    <section className="relative z-50 w-full px-4 py-8 md:py-12 bg-background flex justify-center border-b border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        
        {/* Kartu 1: Projects */}
        <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md shadow-xl hover:border-white/10 hover:bg-white/2 transition-all duration-300 group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            {/* Font lebih rapat dan organik */}
            <span className="text-4xl md:text-5xl font-bold tracking-tighter text-white/90">4</span>
            {/* Icon dengan ketebalan tipis (1.5) & background soft */}
            <div className="p-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform duration-300">
               <FolderGit2 strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <h4 className="text-sm md:text-base font-medium text-white/80">Total Projects</h4>
            <p className="text-xs md:text-sm text-white/40 mt-1.5 leading-relaxed font-light">Innovative web solutions crafted.</p>
          </div>
        </div>

        {/* Kartu 2: Service */}
        <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md shadow-xl hover:border-white/10 hover:bg-white/2 transition-all duration-300 group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-4xl md:text-5xl font-bold tracking-tighter text-white/90">3</span>
            <div className="p-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform duration-300">
               <ShieldCheck strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <h4 className="text-sm md:text-base font-medium text-white/80">Core Services</h4>
            <p className="text-xs md:text-sm text-white/40 mt-1.5 leading-relaxed font-light">Comprehensive digital solutions.</p>
          </div>
        </div>

        {/* Kartu 3: Years Learning */}
        <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md shadow-xl hover:border-white/10 hover:bg-white/2 transition-all duration-300 group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-4xl md:text-5xl font-bold tracking-tighter text-white/90">2</span>
            <div className="p-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform duration-300">
               <Sparkles strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <h4 className="text-sm md:text-base font-medium text-white/80">Years Learning</h4>
            <p className="text-xs md:text-sm text-white/40 mt-1.5 leading-relaxed font-light">Continuous technical growth.</p>
          </div>
        </div>

      </div>
    </section>
  );
};