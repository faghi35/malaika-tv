import { useEffect, useState } from 'react';
import { Share2, ChevronRight, Music, Radio as RadioIcon, Clock, Volume2, Info } from 'lucide-react';
import { API_BASE_URL } from '../api/config';

interface Program {
  id: number;
  title: string;
  time_slot: string;
  description: string;
  image_url: string;
}

const DirectRadio = () => {
  const [schedule, setSchedule] = useState<Program[]>([]);

  useEffect(() => {
    fetchPrograms();
    window.scrollTo(0, 0);
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/programs.php?type=RADIO`);
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching radio programs:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-gray-900 pb-20 md:pb-28">
      {/* 📻 Premium Dark Player Hero Section */}
      <div className="bg-gradient-to-br from-[#001f3e] to-[#000912] text-white border-b-4 border-yellow-500 relative overflow-hidden">
        {/* Abstract background glowing shapes */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10">
          <div className="flex flex-col items-center">
            
            {/* Live Radio Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 bg-red-600 animate-live-glow text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-12"
                 style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              En Direct Radio FM
            </div>

            {/* Deck Player Layout */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full max-w-5xl">
              
              {/* Rotating Audio Visual Deck */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-25"></div>
                {/* Concentric soundwaves rings */}
                <div className="absolute inset-4 border-2 border-dashed border-yellow-500/30 rounded-full animate-[spin_40s_linear_infinite]"></div>
                <div className="absolute inset-10 border border-white/20 rounded-full"></div>
                
                {/* Main Deck Face (Vinyl Style) */}
                <div className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-tr from-[#111] to-[#222] rounded-full shadow-2xl relative flex items-center justify-center border-4 border-white/5 group overflow-hidden">
                  
                  {/* Vinyl Groove Lines */}
                  <div className="absolute inset-3 rounded-full border border-white/5 pointer-events-none"></div>
                  <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none"></div>
                  <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none"></div>
                  
                  {/* Center Label (Gold & Navy) */}
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#001f3e] rounded-full border-4 border-yellow-500 flex flex-col items-center justify-center text-white relative z-10">
                    <span className="text-3xl md:text-5xl font-black italic tracking-tighter"
                          style={{ fontFamily: '"DM Serif Display", serif' }}>M</span>
                    <span className="text-[7px] md:text-[9px] uppercase tracking-widest text-yellow-400 font-bold"
                          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Radio</span>
                  </div>

                  {/* Equalizer overlay when active */}
                  <div className="absolute bottom-6 flex items-end justify-center gap-1.5 z-20 w-full h-8 px-8">
                    <span className="w-1 bg-yellow-400 rounded-t animate-eq-1"></span>
                    <span className="w-1 bg-sky-400 rounded-t animate-eq-2"></span>
                    <span className="w-1 bg-yellow-400 rounded-t animate-eq-3"></span>
                    <span className="w-1 bg-sky-400 rounded-t animate-eq-4"></span>
                    <span className="w-1 bg-yellow-400 rounded-t animate-eq-5"></span>
                  </div>
                </div>
              </div>

              {/* Title & Embedded Audio Stream */}
              <div className="flex-grow text-center lg:text-left w-full">
                <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start"
                     style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  <RadioIcon className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 font-bold uppercase text-[10px] tracking-widest">Malaika FM — 94.2 MHz</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight leading-none"
                    style={{ fontFamily: '"DM Serif Display", serif' }}>
                  Le Son de <span className="text-yellow-400">l'Excellence</span>
                </h1>
                
                <p className="text-gray-300 font-medium mb-8 text-base max-w-xl leading-relaxed">
                  L'information, la culture et l'analyse panafricaine en temps réel. Écoutez Malaika FM en direct et en haute définition.
                </p>

                {/* Styled Stream Player Box */}
                <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl mb-6">
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-400"
                       style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    <Volume2 className="h-4 w-4 text-sky-400" />
                    <span>Lecteur FM Direct HD (Flux adaptatif)</span>
                  </div>
                  <div className="w-full overflow-hidden rounded-lg bg-black/40">
                    <iframe
                      style={{ width: '100%', height: '80px', border: 'none' }}
                      scrolling="no"
                      src="https://stream-africa.com/embededplayer?eid=5f76f554211efb784b335d27"
                      title="Malaika FM Player"
                    ></iframe>
                  </div>
                </div>

                {/* Control Actions */}
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <button className="text-[10px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 uppercase tracking-widest flex items-center gap-2 px-5 py-2.5 transition-all"
                          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    <Share2 className="h-3.5 w-3.5" /> Partager l'écoute
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 📅 Interactive Program Timeline Schedule */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
          <div>
            <span className="text-red-600 font-bold text-[10px] uppercase tracking-widest block mb-1"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Programme Radio</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900"
                style={{ fontFamily: '"DM Serif Display", serif' }}>
              Grille des Programmes
            </h2>
          </div>
          <div className="flex items-center gap-2 text-gray-400"
               style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <Clock className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Heure locale</span>
          </div>
        </div>

        {/* Chronological Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-gray-200 space-y-8">
          {schedule.length > 0 ? schedule.map((item, i) => (
            <div key={i} className="relative group">
              
              {/* Chronological bullet marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 bg-white border-4 border-gray-300 rounded-full group-hover:border-yellow-500 group-hover:bg-[#001f3e] transition-all z-10"></div>
              
              {/* Inner card style */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-yellow-500/40 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                
                {/* Time slot column */}
                <div className="flex flex-col items-start justify-center flex-shrink-0 sm:w-28 sm:border-r border-gray-100 sm:pr-4">
                  <span className="text-lg font-bold text-[#001f3e] tabular-nums"
                        style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    {item.time_slot || '--:--'}
                  </span>
                  <span className="text-[9px] font-bold text-yellow-600 uppercase tracking-widest mt-0.5"
                        style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Direct</span>
                </div>

                {/* Show thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100 overflow-hidden rounded-md">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Music className="h-7 w-7 text-gray-300" />
                  )}
                </div>

                {/* Details column */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest"
                          style={{ fontFamily: '"Space Grotesk", sans-serif' }}>À l'antenne</span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-yellow-600 transition-colors uppercase tracking-tight"
                      style={{ fontFamily: '"DM Serif Display", serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold mt-1 max-w-2xl">{item.description}</p>
                </div>

                {/* Action button */}
                <div className="self-end sm:self-auto flex items-center justify-end">
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#001f3e] group-hover:text-white group-hover:border-[#001f3e] transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>

              </div>
            </div>
          )) : (
            /* Loading/Fallback timeline list */
            [1, 2, 3].map((_, i) => (
              <div key={i} className="relative animate-pulse">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 bg-gray-200 rounded-full border-4 border-white"></div>
                <div className="bg-white border border-gray-100 rounded-lg p-6 flex gap-6">
                  <div className="w-24 h-10 bg-gray-200 rounded"></div>
                  <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                  <div className="flex-grow space-y-2">
                    <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FM Notice Info */}
        <div className="mt-12 p-5 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-4 items-start">
          <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase text-yellow-800 tracking-wider mb-1"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Écoute FM alternative</h4>
            <p className="text-[11px] text-yellow-700 leading-relaxed font-semibold">
              Si le flux numérique rencontre des perturbations, vous pouvez également syntoniser Malaika FM sur la fréquence <b>94.2 MHz</b> dans toute l'agglomération de Lubumbashi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectRadio;
