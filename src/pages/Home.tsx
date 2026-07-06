import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Clock, ChevronRight, PlayCircle, Radio, ArrowRight, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, MEDIA_BASE_URL, getArrayPayload } from '../api/config';
import AdSpace from '../components/AdSpace';


interface NewsItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  local_image: string;
  category: string;
  published_at: string;
  slug: string;
}

const getImageSrc = (item: NewsItem) =>
  item.local_image ? `${MEDIA_BASE_URL}/${item.local_image}` : item.image_url;

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatTime = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const Home = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/news.php?limit=30`)
      .then(res => { setNews(getArrayPayload<NewsItem>(res.data)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    return [...new Set(news.map(item => item.category?.trim()).filter(Boolean))].sort((a, b) =>
      a!.localeCompare(b!, 'fr', { sensitivity: 'base' })
    ) as string[];
  }, [news]);

  const slugify = (cat: string) =>
    cat.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f8f8f6]">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-yellow-400 border-[#001f3e]/20 animate-spin"></div>
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#001f3e]/50">Chargement en cours…</p>
      </div>
    );
  }

  const hero = news[0];
  const heroSide = news.slice(1, 4);
  const featured = news.slice(4, 10);
  const latestNews = news.slice(10, 16);

  return (
    <div className="min-h-screen bg-[#f4f4f2] font-inter">

      {/* ── BREAKING NEWS TICKER ───────────────────────────── */}
      <div className="bg-[#001f3e] border-b border-yellow-500/30 h-11 flex items-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 xl:px-8 w-full flex items-center h-full gap-0">
          <div className="bg-red-600 text-white px-5 h-full flex items-center text-[10px] font-black mr-0 flex-shrink-0 uppercase tracking-[0.2em] gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping inline-block"></span>
            Flash
          </div>
          <div className="bg-yellow-500 px-4 h-full flex items-center flex-shrink-0">
            <span className="text-[10px] font-black text-black uppercase tracking-widest">Info</span>
          </div>
          <div className="flex-grow overflow-hidden relative h-full flex items-center pl-6">
            <div className="flex gap-14 animate-marquee whitespace-nowrap items-center h-full">
              {news.slice(0, 12).map((item, i) => (
                <Link key={i} to={`/news/${item.slug}`} className="text-[11px] font-semibold text-white/80 hover:text-yellow-400 tracking-tight transition-colors shrink-0">
                  {item.title} <span className="mx-5 text-white/20">◆</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <main className="max-w-[1400px] mx-auto px-4 xl:px-8 py-8">

        {/* ── HERO GRID (France 24 split layout) ───────────── */}
        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-white shadow-sm overflow-hidden">

            {/* HERO Main Story */}
            {hero && (
              <Link to={`/news/${hero.slug}`} className="lg:col-span-7 relative group overflow-hidden block min-h-[420px]">
                <img
                  src={getImageSrc(hero)}
                  alt={hero.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                {/* category badge */}
                <div className="absolute top-0 left-0">
                  <span className="bg-yellow-500 text-black text-[9px] font-black px-3 py-1.5 uppercase tracking-widest block">
                    {hero.category}
                  </span>
                </div>
                {/* content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Clock className="h-3 w-3" /> {formatTime(hero.published_at)} — {formatDate(hero.published_at)}
                  </p>
                  <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3 group-hover:text-yellow-300 transition-colors font-serif">
                    {hero.title}
                  </h1>
                  <p className="text-white/70 text-sm font-medium leading-relaxed line-clamp-2 mb-4 hidden md:block">
                    {hero.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-yellow-400 text-[11px] font-black uppercase tracking-wider group-hover:gap-3 transition-all">
                    Lire l'article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            )}

            {/* HERO Side Stories */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-gray-100">
              {heroSide.map((item, i) => (
                <Link key={i} to={`/news/${item.slug}`} className="group flex items-stretch gap-0 bg-white hover:bg-gray-50 transition-colors overflow-hidden flex-1">
                  <div className="w-[120px] md:w-[150px] flex-shrink-0 overflow-hidden">
                    <img
                      src={getImageSrc(item)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 p-4 md:p-5 flex flex-col justify-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-50 px-2 py-0.5 self-start">
                      {item.category}
                    </span>
                    <h3 className="text-sm md:text-[15px] font-bold text-gray-900 leading-snug group-hover:text-[#001f3e] transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-semibold text-gray-400 flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {formatTime(item.published_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <AdSpace type="horizontal" />

        {/* ── FEATURED ARTICLES + LIVE SIDEBAR ───────────────── */}
        <section className="mb-10 grid grid-cols-1 xl:grid-cols-12 gap-6">


          {/* 6-grid news cards */}
          <div className="xl:col-span-8">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-7 bg-yellow-500 rounded-full"></div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#001f3e]">À ne pas manquer</h2>
              <div className="flex-grow h-px bg-gray-200"></div>
              <Link to="/category/actualite" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-yellow-600 transition-colors flex items-center gap-1">
                Tout voir <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((item, i) => (
                <Link key={i} to={`/news/${item.slug}`} className="group flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={getImageSrc(item)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 bg-yellow-500 px-2.5 py-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-black">{item.category}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <h3 className="text-[14px] font-bold text-gray-900 leading-snug group-hover:text-[#001f3e] transition-colors line-clamp-3 flex-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <p className="text-[10px] font-semibold text-gray-400 flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {formatDate(item.published_at)}
                      </p>
                      <ChevronRight className="h-4 w-4 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* LIVE SIDEBAR */}
          <div className="xl:col-span-4 flex flex-col gap-5">

            {/* Live TV Promo Card */}
            <div className="bg-[#001f3e] overflow-hidden shadow-lg">
              <div className="relative aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/NZ84zy4OBOo"
                  title="Malaika TV Direct"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className="absolute top-3 left-3 pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-red-600 px-2.5 py-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Direct HD</span>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Tv className="h-3 w-3" /> Malaïka TV — En direct
                  </p>
                  <h3 className="text-white font-bold text-sm leading-snug">L'actualité panafricaine et mondiale, 24h/24.</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/direct-tv" className="bg-yellow-500 hover:bg-yellow-400 text-black py-2.5 text-center font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5">
                    <PlayCircle className="h-3.5 w-3.5" /> TV
                  </Link>
                  <Link to="/direct-radio" className="bg-white/10 hover:bg-white/20 border border-white/10 text-white py-2.5 text-center font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5">
                    <Radio className="h-3.5 w-3.5" /> Radio
                  </Link>
                </div>
              </div>
            </div>

            {/* Latest News List */}
            <div className="bg-white shadow-sm flex-1">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-1 h-5 bg-red-600 rounded-full"></div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#001f3e]">Dernières infos</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {latestNews.map((item, i) => (
                  <Link key={i} to={`/news/${item.slug}`} className="group flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-8 text-center pt-0.5">
                      <span className="text-[18px] font-black text-gray-100 group-hover:text-yellow-400 transition-colors leading-none block">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-yellow-600 uppercase tracking-wider mb-1">{item.category}</p>
                      <h4 className="text-[13px] font-bold text-gray-800 leading-snug group-hover:text-[#001f3e] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatTime(item.published_at)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <AdSpace type="sidebar" />
          </div>
        </section>


        {/* ── CATEGORIES GRID (BDD dynamic) ──────────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-7 bg-[#001f3e] rounded-full"></div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#001f3e]">Toutes les catégories</h2>
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{categories.length} rubriques</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const catNews = news.filter(n => n.category === cat);
              const thumb = catNews[0] ? getImageSrc(catNews[0]) : null;
              return (
                <Link
                  key={cat}
                  to={`/category/${slugify(cat)}`}
                  className="group relative overflow-hidden bg-[#001f3e] aspect-[4/3] flex flex-col justify-end hover:shadow-xl transition-shadow"
                >
                  {thumb && (
                    <img
                      src={thumb}
                      alt={cat}
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001f3e] via-[#001f3e]/40 to-transparent"></div>
                  {/* gold left accent border on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
                  <div className="relative z-10 p-4">
                    <p className="text-yellow-400 text-[9px] font-black uppercase tracking-[0.25em] mb-1">
                      {catNews.length} article{catNews.length > 1 ? 's' : ''}
                    </p>
                    <h3 className="text-white font-black text-base leading-tight group-hover:text-yellow-300 transition-colors">{cat}</h3>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 bg-yellow-500 flex items-center justify-center">
                      <ArrowRight className="h-3.5 w-3.5 text-black" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
