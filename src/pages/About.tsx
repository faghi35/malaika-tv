import { Tv, Globe, Users, Target, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#F3F4F6] min-h-screen py-16 font-outfit">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="bg-white rounded-[50px] p-12 md:p-24 mb-16 shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-blue"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
               <span className="w-12 h-1.5 bg-brand-blue rounded-full"></span>
               <span className="text-brand-blue font-black uppercase text-xs tracking-[0.3em]">Notre Identité</span>
               <span className="w-12 h-1.5 bg-brand-blue rounded-full"></span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-10 tracking-tighter uppercase leading-none">
              Malaika <span className="text-brand-blue">TV</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
              La chaîne d'information panafricaine de référence, 
              portant une voix moderne et institutionnelle sur l'actualité mondiale.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-blue/10 rounded-[40px] rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80" 
              alt="Malaika TV Broadcast Studio" 
              className="rounded-[40px] shadow-2xl w-full object-cover aspect-[4/3] relative z-10 border-4 border-white"
            />
          </div>
          <div className="px-4">
            <div className="flex items-center gap-3 mb-6">
               <span className="w-8 h-1 bg-brand-blue rounded-full"></span>
               <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">Notre Vision</h2>
            </div>
            <p className="text-gray-600 mb-8 text-lg md:text-xl leading-relaxed font-medium">
              Malaika TV est née de l'ambition de redéfinir le paysage médiatique africain. 
              En alliant technologie de pointe et rigueur journalistique, nous offrons 
              une fenêtre ouverte sur l'excellence et l'innovation.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              Notre mission est de semer les graines d'une information juste et inspirante, 
              en mettant en lumière les succès du continent tout en analysant avec 
              neutralité les enjeux globaux.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
               <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-brand-blue" />
                  <span className="font-black text-xs uppercase tracking-widest text-gray-900">Accrédité CNC</span>
               </div>
               <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <Globe className="h-6 w-6 text-brand-blue" />
                  <span className="font-black text-xs uppercase tracking-widest text-gray-900">Diffusion Globale</span>
               </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: <Tv className="h-8 w-8" />, title: "Excellence", desc: "Une production HD répondant aux plus hauts standards internationaux." },
            { icon: <Target className="h-8 w-8" />, title: "Intégrité", desc: "Une information vérifiée, source d'une confiance inébranlable." },
            { icon: <Users className="h-8 w-8" />, title: "Inclusion", desc: "Une voix pour tous, reflétant la diversité de nos cultures." },
            { icon: <Globe className="h-8 w-8" />, title: "Rayonnement", desc: "Porter l'image de l'Afrique vers de nouveaux horizons." },
          ].map((val, idx) => (
            <div key={idx} className="group bg-white p-12 rounded-[40px] shadow-sm border border-gray-50 text-center hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-brand-blue mb-8 group-hover:bg-brand-blue group-hover:text-white transition-colors shadow-inner">
                {val.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">{val.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
