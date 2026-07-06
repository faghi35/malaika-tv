import { useEffect, useState } from 'react';
import { PlayCircle, ChevronRight, Info, Filter } from 'lucide-react';
import API_BASE_URL, { getArrayPayload } from '../api/config';

interface Emission {
  id: number;
  title: string;
  description: string;
  image_url: string;
  source_url: string;
  category: string;
}

const Programs = () => {
  const [emissions, setEmissions] = useState<Emission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmissions();
  }, []);

  const fetchEmissions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions.php`);
      const data = await response.json();
      setEmissions(getArrayPayload<Emission>(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching emissions', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen py-16 font-outfit">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
               <span className="w-12 h-1.5 bg-brand-blue rounded-full"></span>
               <span className="text-brand-blue font-black uppercase text-xs tracking-widest">Notre Catalogue</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Émissions <span className="text-brand-blue">&</span> Magazines
            </h1>
            <p className="text-gray-500 font-medium text-lg md:text-xl mt-6 leading-relaxed">
              Plongez dans l'univers de Malaika TV avec nos productions originales et nos magazines d'exception.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-gray-100 text-sm font-bold shadow-sm">
              <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
              <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">{emissions.length} PROGRAMMES</span>
            </div>
            <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-gray-100 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
               <Filter className="h-4 w-4 text-brand-blue" />
               <span className="font-black uppercase tracking-widest text-[10px]">Filtrer</span>
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col justify-center items-center h-80 gap-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-100 border-t-brand-blue"></div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs animate-pulse">Synchronisation du catalogue...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {emissions.map((emission) => (
              <div 
                key={emission.id} 
                className="group bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 overflow-hidden flex flex-col hover:-translate-y-2"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  {emission.image_url ? (
                    <img 
                      src={emission.image_url} 
                      alt={emission.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-gray-100" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <button className="bg-white text-brand-blue font-black px-6 py-3 rounded-2xl flex items-center gap-2 text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      Regarder les replays <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  {emission.category && (
                    <span className="absolute top-6 left-6 bg-brand-blue text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl">
                      {emission.category}
                    </span>
                  )}
                </div>

                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter group-hover:text-brand-blue transition-colors leading-tight">
                    {emission.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base line-clamp-3 mb-8 leading-relaxed font-medium">
                    {emission.description || "Découvrez bientôt plus d'informations sur cette émission exclusive de Malaika TV."}
                  </p>
                  <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Info className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Institutional Content</span>
                    </div>
                    <button className="text-brand-blue font-black text-[11px] uppercase tracking-widest hover:tracking-[0.2em] transition-all decoration-2 underline-offset-8">
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && emissions.length === 0 && (
          <div className="bg-white rounded-[50px] p-24 text-center border-4 border-dashed border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
               <PlayCircle className="h-12 w-12 text-gray-200" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Catalogue en cours de chargement</h2>
            <p className="text-gray-500 max-w-md font-medium">
              Notre équipe média prépare actuellement le catalogue des émissions pour Malaika TV. 
              Revenez très bientôt !
            </p>
            <button className="mt-10 px-10 py-4 bg-brand-blue text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-100">
               Actualiser la page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
