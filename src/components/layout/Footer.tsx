import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Facebook, Twitter, Instagram, Youtube, Send, Mail, Smartphone, ShieldCheck, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

interface CategoryItem {
  id: number;
  name: string;
}

const Footer = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Mobile accordion state
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(prev => (prev === section ? null : section));
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories.php`)
      .then(res => {
        setCategories(res.data.filter((c: any) => c.name !== 'Accueil').slice(0, 8));
      })
      .catch(err => {
        console.error('Error fetching categories in footer:', err);
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const slugifyCategory = (category: string) =>
    category
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const legalLinks = [
    'Mentions légales', 'Accessibilité', 'Confidentialité', 'Cookies', 'Paramètres cookies', 'Notifications'
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: <Facebook className="h-4 w-4" /> },
    { name: 'X', url: '#', icon: <Twitter className="h-4 w-4" /> },
    { name: 'Instagram', url: '#', icon: <Instagram className="h-4 w-4" /> },
    { name: 'YouTube', url: '#', icon: <Youtube className="h-4 w-4" /> },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-[#001124] via-[#001a35] to-[#000d1a] text-white border-t-4 border-yellow-500 font-inter mt-auto">
      
      {/* 1. NEWSLETTER BANNER (France 24 style upper bar) */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-[1400px] mx-auto px-4 xl:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="p-3 bg-yellow-500 rounded-full text-black hidden sm:block">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-wider text-yellow-400">Newsletter Malaïka TV</h3>
              <p className="text-sm text-gray-400 font-medium">Recevez directement les analyses et les alertes infos de notre rédaction.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex items-center max-w-md">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 flex-grow font-semibold"
            />
            <button 
              type="submit" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-black px-6 py-3.5 text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              S'inscrire <Send className="h-3 w-3" />
            </button>
          </form>
          
          {isSubscribed && (
            <div className="fixed bottom-20 left-4 z-[110] bg-green-600 text-white px-6 py-3 shadow-xl font-bold rounded-lg animate-bounce">
              Inscription réussie à la newsletter !
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-[1400px] mx-auto px-4 xl:px-8 py-16">
        
        {/* DESKTOP VIEW: Grid Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center">
              <img src="/Logo-Malaika.png" alt="Malaika TV" className="h-[45px] w-auto object-contain brightness-0 invert" />
            </Link>
            
            <div className="text-gray-400 text-xs leading-relaxed font-medium space-y-4">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>
                  04, Av. Kimbangu,<br />
                  Lubumbashi, Haut-Katanga,<br />
                  République Démocratique du Congo.
                </span>
              </p>
              
              <p className="flex items-center gap-2 font-bold text-white text-[13px]">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span>+243 900 005 250 / 810 850 765</span>
              </p>
              
              <div className="pt-4 border-t border-white/5 space-y-1">
                <p className="text-[10px] opacity-75 font-bold uppercase tracking-widest text-yellow-500">Identification légale</p>
                <p>Id. Nat. : 6-73-N 48923H</p>
                <p>RCCM: 1184</p>
              </div>

              <p className="pt-2 text-gray-500 italic text-[11px] leading-snug">
                Malaïka TVR, groupe de médias généraliste et indépendant existe depuis 2011 pour ses audiences: les jeunes de toutes les obédiences politiques et ethniques en RD.Congo.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Rapide */}
          <div>
            <h4 className="font-black text-xs mb-8 tracking-[0.2em] text-yellow-400 border-b border-white/10 pb-4 uppercase">Navigation</h4>
            <ul className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider text-gray-300">
              <li><Link to="/" className="hover:text-yellow-400 transition-colors">La une / Accueil</Link></li>
              <li><Link to="/programs" className="hover:text-yellow-400 transition-colors">Émissions</Link></li>
              <li><Link to="/direct-tv" className="hover:text-yellow-400 transition-colors">Direct TV</Link></li>
              <li><Link to="/direct-radio" className="hover:text-yellow-400 transition-colors">Direct Radio</Link></li>
              <li><Link to="/videos" className="hover:text-yellow-400 transition-colors">Vidéos & replays</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Dynamic Categories */}
          <div>
            <h4 className="font-black text-xs mb-8 tracking-[0.2em] text-yellow-400 border-b border-white/10 pb-4 uppercase">Catégories</h4>
            <ul className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider text-gray-300">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/category/${slugifyCategory(cat.name)}`} 
                    className="hover:text-yellow-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: App Downloads & Satellite */}
          <div className="flex flex-col gap-6">
            <h4 className="font-black text-xs mb-8 tracking-[0.2em] text-yellow-400 border-b border-white/10 pb-4 uppercase">Malaïka partout</h4>
            
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-4 px-5 py-3.5 bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-white/10 transition-all">
                <Smartphone className="h-6 w-6 text-yellow-400" />
                <div className="text-left">
                  <div className="text-[8px] font-black tracking-widest opacity-60 uppercase">Disponible sur</div>
                  <div className="text-xs font-bold tracking-wide">App Store & Play Store</div>
                </div>
              </a>
              
              <div className="p-4 bg-white/5 border border-white/5 space-y-2 mt-2">
                <h5 className="text-[10px] font-black text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
                  📡 Suivez Malaika TV
                </h5>
                <div className="text-[11px] text-gray-400 leading-normal space-y-1">
                  <p>✔ Canal+ : <span className="text-yellow-400 font-bold">602</span></p>
                  <p>✔ Startimes : <span className="text-yellow-400 font-bold">125</span></p>
                  <p>✔ UHF : <span className="text-yellow-400 font-bold">527.25 MHz</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ONLY COLLAPSIBLE FOOTER (Accordion-style for space saving) */}
        <div className="block md:hidden space-y-4 mb-10">
          
          {/* Section: Brand Identity */}
          <div className="border-b border-white/10 pb-4 flex flex-col items-center text-center">
            <img src="/Logo-Malaika.png" alt="Malaika TV" className="h-[40px] w-auto mb-4 brightness-0 invert" />
            <p className="text-[11px] text-gray-400 italic max-w-xs leading-relaxed">
              Malaïka TVR, groupe de médias généraliste et indépendant. L'info de l'excellence en RDC et à l'international.
            </p>
          </div>

          {/* Accordion 1: Navigation */}
          <div className="border-b border-white/10 pb-2">
            <button 
              onClick={() => toggleSection('nav')}
              className="w-full flex items-center justify-between py-3 text-xs font-black uppercase tracking-wider text-yellow-400"
            >
              <span>Navigation</span>
              {activeSection === 'nav' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {activeSection === 'nav' && (
              <ul className="flex flex-col gap-3 py-2 pl-2 text-xs font-bold uppercase tracking-wide text-gray-300 animate-in fade-in duration-200">
                <li><Link to="/" className="hover:text-yellow-400 transition-colors">La une / Accueil</Link></li>
                <li><Link to="/programs" className="hover:text-yellow-400 transition-colors">Émissions</Link></li>
                <li><Link to="/direct-tv" className="hover:text-yellow-400 transition-colors">Direct TV</Link></li>
                <li><Link to="/direct-radio" className="hover:text-yellow-400 transition-colors">Direct Radio</Link></li>
                <li><Link to="/videos" className="hover:text-yellow-400 transition-colors">Vidéos & replays</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
              </ul>
            )}
          </div>

          {/* Accordion 2: Catégories */}
          <div className="border-b border-white/10 pb-2">
            <button 
              onClick={() => toggleSection('cats')}
              className="w-full flex items-center justify-between py-3 text-xs font-black uppercase tracking-wider text-yellow-400"
            >
              <span>Catégories</span>
              {activeSection === 'cats' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {activeSection === 'cats' && (
              <div className="grid grid-cols-2 gap-3 py-2 pl-2 text-xs font-bold uppercase tracking-wide text-gray-300 animate-in fade-in duration-200">
                {categories.map((cat) => (
                  <Link 
                    key={cat.id} 
                    to={`/category/${slugifyCategory(cat.name)}`} 
                    className="hover:text-yellow-400 py-1 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 3: Contact & Legal */}
          <div className="border-b border-white/10 pb-2">
            <button 
              onClick={() => toggleSection('contact')}
              className="w-full flex items-center justify-between py-3 text-xs font-black uppercase tracking-wider text-yellow-400"
            >
              <span>Contacts & Infos</span>
              {activeSection === 'contact' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {activeSection === 'contact' && (
              <div className="py-2 pl-2 space-y-4 text-xs text-gray-400 font-semibold animate-in fade-in duration-200">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>04, Av. Kimbangu, Lubumbashi, RDC.</span>
                </p>
                <p className="flex items-center gap-2 text-white font-bold">
                  <Phone className="h-4 w-4 text-yellow-500" />
                  <span>+243 900 005 250</span>
                </p>
                <div className="border-t border-white/5 pt-3 space-y-1 text-[10px]">
                  <p className="text-yellow-500 uppercase font-black">Identification légale</p>
                  <p>Id. Nat. : 6-73-N 48923H | RCCM: 1184</p>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 4: Fréquences & Canaux */}
          <div className="border-b border-white/10 pb-2">
            <button 
              onClick={() => toggleSection('satellite')}
              className="w-full flex items-center justify-between py-3 text-xs font-black uppercase tracking-wider text-yellow-400"
            >
              <span>📡 Suivez Malaika TV</span>
              {activeSection === 'satellite' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {activeSection === 'satellite' && (
              <div className="py-2 pl-2 space-y-1.5 text-xs text-gray-400 font-semibold animate-in fade-in duration-200">
                <p>✔ Canal+ : <span className="text-yellow-400 font-bold">602</span></p>
                <p>✔ Startimes : <span className="text-yellow-400 font-bold">125</span></p>
                <p>✔ UHF : <span className="text-yellow-400 font-bold">527.25 MHz</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/10 my-10"></div>

        {/* 3. FOOTER BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Legal link rows */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-[11px] font-bold tracking-wider text-gray-400">
            {legalLinks.map((link, idx) => (
              <Link 
                key={idx} 
                to="#" 
                className="hover:text-yellow-400 transition-colors flex items-center gap-1"
              >
                {idx === 2 && <ShieldCheck className="h-3 w-3 text-yellow-500" />}
                {link}
              </Link>
            ))}
          </div>

          {/* Social Links Row */}
          <div className="flex gap-3">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx}
                href={social.url} 
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black text-white transition-all shadow-md"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright notice */}
        <div className="text-center mt-12 text-[10px] text-gray-500 font-black uppercase tracking-widest">
          © {new Date().getFullYear()} Malaika TV — Le média de l'excellence panafricaine.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
