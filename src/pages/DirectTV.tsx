import { useEffect, useState } from 'react';
import { Share2, Clock, Tv, Calendar, Monitor, Layers } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { API_BASE_URL } from '../api/config';

interface Program {
  id: number;
  title: string;
  time_slot: string;
  description: string;
}

const DirectTV = () => {
  const [schedule, setSchedule] = useState<Program[]>([]);
  const { playTV } = usePlayer();

  useEffect(() => {
    fetchPrograms();
    playTV(); // Signal that TV is active
    window.scrollTo(0, 0);
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/programs.php?type=TV`);
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching TV programs:", error);
    }
  };

  return (
    <div className="bg-[#f4f4f2] min-h-screen pb-20 md:pb-28">
      {/* 📺 Theater Broadcast Header */}
      <div className="bg-gradient-to-r from-[#001124] to-[#001f3e] text-white py-6 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 xl:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-widest"
                 style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              <Tv className="h-4 w-4" />
              <span>Malaika TV — Direct Antenne</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight mt-1"
                style={{ fontFamily: '"DM Serif Display", serif' }}>
              Le Direct Télévision
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-live-glow"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Diffusion HD Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 xl:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Player & Meta Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Ambient Bezel Frame TV Player */}
            <div className="bg-[#000814] rounded-xl overflow-hidden border border-white/10 shadow-2xl p-2 md:p-3 relative group">
              {/* Outer screen glare light effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/5 to-white/0 pointer-events-none opacity-40"></div>
              
              {/* Inner screen frame */}
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black relative border border-black shadow-inner">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/NZ84zy4OBOo?autoplay=1&mute=1" 
                  title="Malaika TV Live" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
                
                {/* On-screen Live watermark */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <div className="bg-red-600 text-white text-[9px] md:text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] flex items-center gap-1.5 animate-live-glow"
                       style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span> DIRECT HD
                  </div>
                </div>
              </div>
            </div>
            
            {/* Show Details Description */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-gray-100">
                <div className="max-w-2xl">
                  <span className="text-yellow-600 font-bold text-[10px] uppercase tracking-widest mb-2 block"
                        style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Flux Principal</span>
                  
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight uppercase tracking-tight mb-4"
                      style={{ fontFamily: '"DM Serif Display", serif' }}>
                    Malaika TV : L'Info en continu <span className="text-[#001f3e]">24h/24</span>
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed font-semibold text-base">
                    Suivez toute l'actualité en temps réel sur Malaika TV. Analyses approfondies, débats en direct, actualités régionales et internationales, documentaires et replays de nos émissions phares.
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#001f3e] hover:bg-yellow-500 hover:text-[#001f3e] text-white font-bold transition-all uppercase text-[10px] tracking-widest rounded-md"
                          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    <Share2 className="h-4 w-4" /> Partager le live
                  </button>
                </div>
              </div>
              
              {/* Features cards: Description, Format, Availability */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="p-5 bg-[#f8f8f6] border-l-4 border-red-600 flex flex-col gap-2 rounded-r-md">
                   <h3 className="font-bold text-gray-900 uppercase text-[10px] tracking-widest flex items-center gap-2"
                       style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                      <Monitor className="h-4 w-4 text-red-600" /> Signal Télévision
                   </h3>
                   <p className="text-xs text-gray-500 font-bold leading-normal">
                      Diffusion nationale et internationale. Disponible via satellite, TNT et web.
                   </p>
                </div>
                
                {/* Card 2 */}
                <div className="p-5 bg-[#f8f8f6] border-l-4 border-[#001f3e] flex flex-col gap-2 rounded-r-md">
                   <h3 className="font-bold text-gray-900 uppercase text-[10px] tracking-widest flex items-center gap-2"
                       style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                      <Layers className="h-4 w-4 text-[#001f3e]" /> Format HD
                   </h3>
                   <p className="text-xs text-gray-500 font-bold leading-normal">
                      Résolution Full HD 1080p. Qualité sonore stéréo optimisée pour la TV.
                   </p>
                </div>
                
                {/* Card 3 */}
                <div className="p-5 bg-[#f8f8f6] border-l-4 border-yellow-500 flex flex-col gap-2 rounded-r-md">
                   <h3 className="font-bold text-gray-900 uppercase text-[10px] tracking-widest flex items-center gap-2"
                       style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                      <Calendar className="h-4 w-4 text-yellow-500" /> Disponibilité
                   </h3>
                   <p className="text-xs text-gray-500 font-bold leading-normal">
                      Flux live gratuit accessible 24h sur 24 et 7 jours sur 7 partout dans le monde.
                   </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Program Grid Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
              
              {/* Sidebar Header */}
              <div className="p-6 bg-gradient-to-b from-[#001f3e] to-[#000a14] text-white flex items-center justify-between">
                <h2 className="font-bold uppercase tracking-widest text-xs flex items-center gap-2.5"
                    style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                   <Clock className="h-4 w-4 text-yellow-500" /> Grille des Programmes TV
                </h2>
                <span className="px-2 py-0.5 bg-red-600 text-[8px] font-bold uppercase tracking-widest rounded flex items-center gap-1 animate-pulse"
                      style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                   Live
                </span>
              </div>

              {/* Programs Chronological Scroll Container */}
              <div className="p-4 overflow-y-auto pr-2 space-y-3 no-scrollbar max-h-[580px] bg-[#fdfdfc]">
                {schedule.length > 0 ? schedule.map((item, i) => {
                  const isActiveShow = i === 0; // Mock highlight first show
                  return (
                    <div key={i} 
                         className={`p-4 border rounded-lg transition-all duration-300 relative group cursor-pointer ${
                           isActiveShow 
                             ? 'bg-gradient-to-r from-yellow-50/50 to-white border-yellow-500/80 shadow-sm' 
                             : 'bg-white border-gray-200 hover:bg-gray-50'
                         }`}>
                      
                      {/* Left border active bar */}
                      {isActiveShow && <div className="absolute top-0 bottom-0 left-0 w-1 bg-yellow-500 rounded-l-lg"></div>}
                      
                      <div className="flex gap-4 items-start">
                        {/* Time marker */}
                        <div className={`font-bold text-xs leading-none w-14 flex-shrink-0 tabular-nums ${isActiveShow ? 'text-yellow-600' : 'text-[#001f3e]'}`}
                             style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                          {item.time_slot || '--:--'}
                        </div>
                        
                        {/* Title details */}
                        <div>
                          {isActiveShow && (
                            <span className="inline-block text-[8px] font-bold text-red-600 uppercase tracking-widest mb-1"
                                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                              En cours
                            </span>
                          )}
                          <h3 className="font-bold text-gray-900 text-xs group-hover:text-yellow-600 transition-colors uppercase tracking-tight leading-tight mb-1"
                              style={{ fontFamily: '"DM Serif Display", serif' }}>
                             {item.title}
                          </h3>
                          <p className="text-[10px] text-gray-400 font-semibold line-clamp-2 leading-relaxed uppercase">
                             {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  /* Loading placeholders */
                  [1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-lg animate-pulse bg-white">
                      <div className="w-12 h-4 bg-gray-200 rounded"></div>
                      <div className="flex-grow space-y-2">
                        <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <button className="w-full py-3.5 border border-[#001f3e] text-[#001f3e] font-bold text-[10px] uppercase tracking-widest hover:bg-[#001f3e] hover:text-white transition-all rounded-md"
                        style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                   Voir la grille complète
                </button>
              </div>
            </div>

            {/* Premium App Promo Banner */}
            <div className="bg-[#001f3e] rounded-xl p-8 text-white relative overflow-hidden group border border-white/5 shadow-xl">
               <div className="relative z-10">
                  <span className="text-yellow-400 font-bold text-[9px] uppercase tracking-widest block mb-2"
                        style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Application Mobile</span>
                  <h3 className="font-black text-2xl mb-3 uppercase tracking-tight italic"
                      style={{ fontFamily: '"DM Serif Display", serif' }}>
                    L'Info <span className="text-yellow-400">Panafricaine</span> dans votre poche
                  </h3>
                  <p className="text-xs text-gray-300 mb-6 leading-relaxed font-semibold">
                    Téléchargez l'application Malaika TV pour suivre l'actualité en continu sur smartphone et tablette.
                  </p>
                  <div className="flex gap-3">
                     <button className="flex-1 bg-white text-[#001f3e] font-bold px-4 py-3 text-[9px] uppercase tracking-widest hover:bg-yellow-500 hover:text-[#001f3e] transition-all rounded"
                             style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                       App Store
                     </button>
                     <button className="flex-1 bg-white/10 border border-white/20 text-white font-bold px-4 py-3 text-[9px] uppercase tracking-widest hover:bg-white/20 transition-all rounded"
                             style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                       Google Play
                     </button>
                  </div>
               </div>
               {/* Decorative background logo icon */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-5 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                 <Tv className="w-full h-full text-white" />
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DirectTV;
