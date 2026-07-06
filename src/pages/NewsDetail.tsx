import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, ArrowLeft, Clock, Share2, Facebook, Twitter, MessageCircle, ChevronRight } from 'lucide-react';
import { API_BASE_URL, MEDIA_BASE_URL } from '../api/config';
import AdSpace from '../components/AdSpace';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  local_image: string;
  category: string;
  published_at: string;
  slug: string;
  tags?: { name: string, slug: string }[];
}

const NewsDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
    fetchLatest();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news_detail.php?slug=${slug}`);
      const data = await response.json();
      setArticle(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
      setLoading(false);
    }
  };

  const fetchLatest = async () => {
     try {
        const response = await axios.get(`${API_BASE_URL}/news.php?limit=5`);
        setLatestNews(response.data);
     } catch (err) {
        console.error("Error fetching latest news:", err);
     }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-brand-grey">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-brand-blue"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center bg-brand-grey min-h-screen">
        <h1 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-widest">Article non trouvé</h1>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-black text-xs uppercase tracking-widest hover:bg-blue-900 transition-all">
           <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const imageUrl = article.local_image 
    ? `${MEDIA_BASE_URL}/${article.local_image}` 
    : (article.image_url || "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=1200&q=80");

  return (
    <div className="bg-[#f4f4f2] min-h-screen pb-20" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-gray-200 h-12 flex items-center mb-8">
         <div className="max-w-[1400px] mx-auto px-4 xl:px-8 w-full flex items-center gap-4">
            <Link to="/" className="text-gray-400 hover:text-brand-blue flex items-center gap-2 font-bold text-xs"><ArrowLeft className="h-4 w-4" /> Accueil</Link>
            <span className="text-gray-300">/</span>
            <Link to={`/category/${article.category.toLowerCase()}`} className="text-[11px] font-bold text-brand-blue hover:underline">
               {article.category}
            </Link>
         </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <article className="bg-white shadow-sm border border-gray-200">
              {/* Header */}
              <div className="p-6 md:p-12 border-b border-gray-100">
                 <div className="flex items-center gap-4 mb-6" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
                    <span className="text-red-600 text-[11px] font-bold uppercase tracking-[0.2em] bg-red-50 px-3 py-1">
                       {article.category}
                    </span>
                    <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                    <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5">
                       <Clock className="h-3.5 w-3.5" /> {new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                 </div>
                 <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-10 break-words"
                     style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
                    {article.title}
                 </h1>
                 <div className="flex items-center justify-between py-6 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-brand-blue flex items-center justify-center text-white font-black text-sm">M</div>
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Par la rédaction</p>
                          <p className="text-sm font-bold text-gray-900">Malaika TV News</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white transition-all"><Facebook className="h-4 w-4" /></button>
                       <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all"><Twitter className="h-4 w-4" /></button>
                       <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all"><MessageCircle className="h-4 w-4" /></button>
                    </div>
                 </div>
              </div>

              {/* Image */}
              <div className="aspect-video w-full overflow-hidden bg-gray-50">
                 <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>

              {/* Body */}
              <div className="p-6 md:p-12 lg:p-16">
                 <div className="max-w-3xl mx-auto article-content text-gray-800 leading-relaxed"
                      style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '1.0625rem', lineHeight: '1.8' }}
                      dangerouslySetInnerHTML={{ __html: article.content || article.description }} />
                 
                 {/* Tags */}
                 {article.tags && article.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-100">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3"
                          style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>Mots-clés</p>
                       <div className="flex flex-wrap gap-x-4 gap-y-2">
                         {article.tags.map((tag, idx) => (
                             <Link key={idx} to={`/tag/${tag.slug}`}
                               className="text-[11px] font-semibold text-gray-400 hover:text-[#0050A1] transition-colors duration-200 group"
                               style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
                               <span className="text-gray-300 group-hover:text-[#0050A1] transition-colors">#</span>{tag.name.toLowerCase()}
                             </Link>
                         ))}
                       </div>
                    </div>
                 )}
              </div>
            </article>

            <AdSpace type="horizontal" />
          </div>


          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-10">
             {/* Latest News Widget */}
             <div className="bg-white border border-gray-200 shadow-sm flex flex-col">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-brand-red"></div>
                   <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">À la une</h2>
                </div>
                <div className="flex flex-col divide-y divide-gray-100">
                   {latestNews.map((item, i) => (
                     <Link key={i} to={`/news/${item.slug}`} className="p-5 hover:bg-gray-50 group transition-all">
                        <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest mb-2 block">{item.category}</span>
                        <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-brand-blue transition-colors">
                           {item.title}
                        </h3>
                     </Link>
                   ))}
                </div>
                <Link to="/news" className="p-4 text-center border-t border-gray-100 text-[10px] font-black text-brand-blue uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all">
                   Voir toute l'actualité
                </Link>
             </div>

             {/* Live TV Promo Widget */}
             <div className="bg-brand-blue-dark p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                   <h3 className="text-2xl font-black italic mb-4 leading-none font-serif">Malaika TV <br/><span className="text-brand-cyan">En direct</span></h3>
                   <p className="text-xs font-medium text-blue-200 mb-6 opacity-80">Suivez l'info en continu sur votre chaîne panafricaine.</p>
                   <Link to="/direct-tv" className="inline-flex items-center gap-2 bg-brand-red px-6 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all">
                      Regarder maintenant <ChevronRight className="h-4 w-4" />
                   </Link>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                   <Share2 className="w-40 h-40" />
                </div>
             </div>

             <AdSpace type="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
