import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, ChevronRight, Hash, Filter } from 'lucide-react';
import { API_BASE_URL, MEDIA_BASE_URL, getArrayPayload } from '../api/config';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  local_image: string;
  category: string;
  published_at: string;
}

const Tag = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/news.php?tag=${tagSlug}&limit=28`)
      .then(res => {
        setNews(getArrayPayload<NewsItem>(res.data));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tag news', err);
        setLoading(false);
      });
  }, [tagSlug]);

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 60) return `Il y a ${diff} min`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen py-16 font-outfit">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tag Header */}
        <div className="bg-white rounded-[40px] p-10 md:p-16 mb-12 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="flex items-center gap-6 md:gap-10">
             <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-blue text-white rounded-[24px] md:rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-100 border-4 border-blue-50">
                <Hash className="h-10 w-10 md:h-12 md:w-12" />
             </div>
             <div>
                <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] mb-2">Thématique Tag</p>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                  {tagSlug?.replace(/-/g, ' ')}
                </h1>
             </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 self-start md:self-center">
            <div className="bg-[#F3F4F6] px-8 py-4 rounded-3xl border border-transparent text-xs font-black text-gray-900 uppercase tracking-widest">
               {news.length} Résultats trouvés
            </div>
            <button className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-brand-blue transition-all">
               <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="h-80 bg-white rounded-[32px] animate-pulse"></div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {news.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/${item.slug}`} 
                className="group flex flex-col bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 hover:-translate-y-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={item.local_image ? `${MEDIA_BASE_URL}/${item.local_image}` : (item.image_url || "https://images.unsplash.com/photo-1504711432869-efd597cdd042?w=800&q=80")} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-brand-blue text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-xl">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{formatTimeAgo(item.published_at)}</span>
                  </div>
                  <h2 className="text-xl font-black text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-3 leading-tight mb-6 uppercase tracking-tighter">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-8 flex-grow font-medium leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-brand-blue font-black text-[10px] uppercase tracking-widest group-hover:tracking-[0.15em] transition-all">Voir l'article</span>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-brand-blue transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {!loading && news.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[50px] border border-dashed border-gray-200">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Hash className="h-10 w-10 text-gray-100" />
             </div>
             <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">Aucune publication trouvée</h2>
             <p className="text-gray-500 font-medium text-center max-w-sm px-6 mb-10">
                Aucun contenu n'a été indexé avec le mot-clé <b>#{tagSlug}</b> pour le moment.
             </p>
             <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-900 transition-all">
                <ChevronRight className="h-4 w-4 rotate-180" /> Explorer d'autres thématiques
             </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tag;
