import { Link } from 'react-router-dom';
import { Menu, PlayCircle, Radio, ChevronDown, ChevronRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, getArrayPayload } from '../../api/config';

interface CategoryItem {
  id: number;
  name: string;
}

const breakingNews = [
  "Malaika TV — Suivez l'actualité en continu",
  "Direct : Conférence de presse du gouvernement à 15h",
  "Économie : La croissance africaine atteint 4,5% en 2025",
  "Sport : Les Lions qualifiés pour la demi-finale",
  "Culture : Festival international de musique ce weekend",
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % breakingNews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories.php`)
      .then(res => {
        // Filter out 'Accueil' if present since Logo directs to Home
        const list = getArrayPayload<CategoryItem>(res.data).filter((c) => c.name !== 'Accueil');
        setCategories(list);
      })
      .catch(err => {
        console.error('Error fetching categories in header:', err);
        // Fallback static categories
        setCategories([
          { id: 1, name: 'Actualité' },
          { id: 2, name: 'Politique' },
          { id: 3, name: 'Économie' },
          { id: 4, name: 'Afrique' },
          { id: 5, name: 'Culture' },
          { id: 6, name: 'Sport' }
        ]);
      });
  }, []);

  const slugifyCategory = (category: string) =>
    category
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  return (
    <header className="w-full z-50 fixed top-0 left-0 right-0 shadow-2xl font-inter bg-[#001f3e] border-b border-yellow-500/20">
      {/* Unified Header */}
      <div className="max-w-[1400px] mx-auto px-4 xl:px-8">
        <div className="h-[70px] md:h-[80px] flex items-center justify-between">
          
          {/* Left Side: Logo & Main Nav */}
          <div className="flex items-center gap-8 lg:gap-12 flex-grow">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img 
                src="/Logo-Malaika.png" 
                alt="Malaika TV" 
                className="h-[40px] md:h-[50px] w-auto object-contain brightness-0 invert"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              <Link 
                to="/" 
                className="text-[13px] font-bold text-white/90 hover:text-yellow-400 transition-colors tracking-tight uppercase"
              >
                Accueil
              </Link>
              <Link 
                to="/direct-tv" 
                className="text-[13px] font-bold text-white/90 hover:text-yellow-400 transition-colors tracking-tight uppercase flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                Direct TV
              </Link>
              <Link 
                to="/direct-radio" 
                className="text-[13px] font-bold text-white/90 hover:text-yellow-400 transition-colors tracking-tight uppercase"
              >
                Direct Radio
              </Link>
              <Link 
                to="/programs" 
                className="text-[13px] font-bold text-white/90 hover:text-yellow-400 transition-colors tracking-tight uppercase"
              >
                Émissions
              </Link>
              <Link 
                to="/videos" 
                className="text-[13px] font-bold text-white/90 hover:text-yellow-400 transition-colors tracking-tight uppercase"
              >
                Vidéos
              </Link>

              {/* Dropdown Menu for Categories */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1.5 text-[13px] font-bold text-white/90 hover:text-yellow-400 transition-colors tracking-tight uppercase cursor-pointer">
                  Catégories
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                
                {/* Smooth Hover Dropdown */}
                <div className="absolute left-0 mt-2 w-64 bg-[#001f3e]/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-none py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${slugifyCategory(cat.name)}`}
                        className="px-4 py-2.5 text-xs font-bold text-white/80 hover:text-yellow-400 hover:bg-white/5 border-l-2 border-transparent hover:border-yellow-400 transition-all uppercase tracking-wider"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Right Side: Watch & Menu */}
          <div className="flex items-center gap-6">
             <Link to="/direct-tv" className="flex items-center gap-2 text-white font-bold text-xs hover:text-yellow-400 transition-colors group">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline uppercase tracking-wider">Regarder le direct</span>
                <PlayCircle className="h-4 w-4" />
             </Link>
             
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="p-2 text-white hover:bg-white/10 transition-colors cursor-pointer"
             >
               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Sub-header / Breaking News Ticker (NBC Style) */}
      <div className="bg-[#002f5a] border-t border-white/10 h-10 flex items-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 xl:px-8 w-full flex items-center h-full gap-4">
          <div className="bg-red-600 text-white px-2.5 py-0.5 text-[9px] font-black flex-shrink-0 uppercase tracking-widest">
            En Direct
          </div>
          <div className="flex-grow overflow-hidden relative h-full flex items-center">
            <p
              key={tickerIndex}
              className="text-[11px] font-semibold text-white/80 whitespace-nowrap animate-ticker"
            >
              {breakingNews[tickerIndex]}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {breakingNews.map((_, i) => (
              <button
                key={i}
                onClick={() => setTickerIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === tickerIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-[#001f3e] z-50 overflow-y-auto animate-in slide-in-from-top duration-300 pb-24">
           <div className="p-6 md:p-8 flex flex-col gap-8 max-w-[600px] mx-auto">
              
              {/* Direct Live Section (At the Top) */}
              <div className="flex flex-col gap-3">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-400 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div> Direct
                 </h4>
                 <div className="grid grid-cols-2 gap-4">
                    <Link 
                       to="/direct-tv" 
                       onClick={() => setIsMenuOpen(false)} 
                       className="bg-red-600 text-white py-4 px-3 font-bold text-center tracking-wider text-xs uppercase flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg"
                    >
                       <PlayCircle className="h-5 w-5" /> Direct TV
                    </Link>
                    <Link 
                       to="/direct-radio" 
                       onClick={() => setIsMenuOpen(false)} 
                       className="bg-[#002f5a] border border-white/10 text-white py-4 px-3 font-bold text-center tracking-wider text-xs uppercase flex items-center justify-center gap-2 hover:bg-white/5 transition-all shadow-lg"
                    >
                       <Radio className="h-5 w-5" /> Direct Radio
                    </Link>
                 </div>
              </div>

              {/* Main Navigation links */}
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Navigation</h4>
                 <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-3 text-lg font-bold text-white border-b border-white/5 hover:text-yellow-400 transition-all flex items-center justify-between">
                    Accueil <ChevronRight className="h-4 w-4 opacity-50" />
                 </Link>
                 <Link to="/programs" onClick={() => setIsMenuOpen(false)} className="py-3 text-lg font-bold text-white border-b border-white/5 hover:text-yellow-400 transition-all flex items-center justify-between">
                    Émissions <ChevronRight className="h-4 w-4 opacity-50" />
                 </Link>
                 <Link to="/videos" onClick={() => setIsMenuOpen(false)} className="py-3 text-lg font-bold text-white border-b border-white/5 hover:text-yellow-400 transition-all flex items-center justify-between">
                    Vidéos <ChevronRight className="h-4 w-4 opacity-50" />
                 </Link>
              </div>

              {/* Dynamic BDD Categories */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-400">Catégories</h4>
                 <div className="grid grid-cols-2 gap-3">
                    {categories.map(cat => (
                       <Link 
                          key={cat.id} 
                          to={`/category/${slugifyCategory(cat.name)}`} 
                          onClick={() => setIsMenuOpen(false)} 
                          className="py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white/80 hover:text-yellow-400 transition-all uppercase tracking-wider text-center"
                       >
                          {cat.name}
                       </Link>
                    ))}
                 </div>
              </div>
              
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;
