import { useLocation, useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import { X, Maximize2 } from 'lucide-react';

const GlobalPlayer = () => {
  const { activeType, stop } = usePlayer();
  const location = useLocation();
  const navigate = useNavigate();

  const isDirectTVPage = location.pathname === '/direct-tv';
  const isDirectRadioPage = location.pathname === '/direct-radio';

  return (
    <>
      {/* TV MINI POPUP */}
      {activeType === 'TV' && !isDirectTVPage && (
        <div className="fixed bottom-24 md:bottom-10 right-6 z-[60] w-[320px] md:w-[400px] bg-black shadow-2xl border border-white/10 animate-in slide-in-from-right duration-500">
          <div className="relative group">
            <div className="aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/NZ84zy4OBOo?autoplay=1" 
                title="Malaika TV Live" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            {/* Overlay Controls */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-50 pointer-events-auto">
              <button 
                onClick={() => navigate('/direct-tv')}
                className="p-2 bg-black/60 hover:bg-brand-blue text-white backdrop-blur-md transition-colors cursor-pointer"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button 
                onClick={stop}
                className="p-2 bg-black/60 hover:bg-brand-red text-white backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-40">
                <p className="text-[10px] text-white font-black uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse"></span> Malaika TV Direct
                </p>
            </div>
          </div>
        </div>
      )}

      {/* RADIO BOTTOM BAR */}
      {activeType === 'RADIO' && !isDirectRadioPage && (
        <div className="fixed bottom-16 xl:bottom-0 left-0 right-0 z-[55] bg-[#002f5a] border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-500">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-8 px-4 py-3 md:py-4">
             <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 bg-[#002f5a] flex-shrink-0 flex items-center justify-center text-white font-black text-xl">
                    M
                </div>
                <div className="flex-grow">
                   <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse"></span>
                      <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Malaika FM</p>
                   </div>
                   <h4 className="text-xs font-bold text-gray-900 truncate uppercase tracking-tight">Direct Radio</h4>
                </div>
                <div className="flex md:hidden items-center gap-2">
                   <button onClick={() => navigate('/direct-radio')} className="p-2 text-gray-400"><Maximize2 className="h-4 w-4" /></button>
                   <button onClick={stop} className="p-2 text-gray-400"><X className="h-4 w-4" /></button>
                </div>
             </div>

             <div className="flex-grow w-full max-w-2xl bg-gray-50 border border-gray-100 p-1">
                <iframe 
                   style={{ width: '100%', height: '60px' }} 
                   scrolling="no" 
                   frameBorder="no" 
                   src="https://stream-africa.com/embededplayer?eid=5f76f554211efb784b335d27"
                   title="Malaika FM Global Player"
                ></iframe>
             </div>

             <div className="hidden md:flex items-center gap-4">
                <button 
                   onClick={() => navigate('/direct-radio')}
                   className="text-[10px] font-black text-gray-400 hover:text-brand-blue transition-colors uppercase tracking-widest"
                >
                   Agrandir
                </button>
                <button 
                   onClick={stop}
                   className="p-2 text-gray-400 hover:text-brand-red transition-colors"
                >
                   <X className="h-5 w-5" />
                </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalPlayer;
