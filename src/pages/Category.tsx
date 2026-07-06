import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, ChevronRight, Hash, Grid } from 'lucide-react';
import { API_BASE_URL, MEDIA_BASE_URL } from '../api/config';
import AdSpace from '../components/AdSpace';


interface NewsItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  local_image: string;
  category: string;
  published_at: string;
  source_url: string;
}

const Category = () => {
  const { categoryName = '' } = useParams<{ categoryName: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [tags, setTags] = useState<{name: string, slug: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const formattedCategory = categoryName 
      ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace('e-p', 'é-P').replace('securite', 'Sécurité').replace('economie', 'Économie').replace('sante', 'Santé').replace('actualite', 'Actualité')
      : '';
      
    // Fetch News
    const fetchNews = axios.get(`${API_BASE_URL}/news.php?category=${formattedCategory}&limit=28`);
    // Fetch Dynamic Tags
    const fetchTags = axios.get(`${API_BASE_URL}/category_tags.php?category=${formattedCategory}`);

    Promise.all([fetchNews, fetchTags])
      .then(([newsRes, tagsRes]) => {
        setNews(newsRes.data);
        setTags(tagsRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching category data', err);
        setLoading(false);
      });
  }, [categoryName]);

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
    <div className="bg-brand-grey min-h-screen py-16 font-inter">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Header: NBC Style */}
        <div className="bg-white p-10 md:p-16 mb-12 border border-gray-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <span className="w-12 h-1.5 bg-[#002f5a]"></span>
               <span className="text-brand-red font-bold text-xs tracking-widest uppercase">Archive thématique</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
               <div>
                  <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-none mb-8 font-serif">
                    <span className="text-gray-200 mr-2">#</span>
                    {categoryName?.replace('-', ' ')}
                  </h1>
                  
                  {/* Dynamic Tags Filter */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {tags.length > 0 ? tags.map((tag, idx) => (
                      <Link 
                        key={idx} 
                        to={`/tag/${tag.slug}`}
                        className="text-[11px] font-bold text-gray-400 hover:text-[#002f5a] transition-colors duration-200 group"
                        style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
                      >
                        <span className="text-gray-300 group-hover:text-[#002f5a] transition-colors">#</span>{tag.name.toLowerCase()}
                      </Link>
                    )) : (
                      <div className="h-4 w-64 bg-gray-100 animate-pulse"></div>
                    )}
                  </div>
               </div>
               
               <div className="flex items-center gap-4 bg-gray-50 px-8 py-4 border border-gray-100 self-start md:self-end">
                  <Grid className="h-5 w-5 text-[#002f5a]" />
                  <span className="text-xs font-black text-gray-900 tracking-widest">
                    {news.length} publications
                  </span>
               </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="h-80 bg-white animate-pulse border border-gray-200"></div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {news.map((item, index) => (
              <React.Fragment key={item.id}>
                {index === 4 && (
                  <div className="col-span-full">
                    <AdSpace type="horizontal" />
                  </div>
                )}
                <Link 
                  to={`/news/${item.slug}`} 
                  className="group flex flex-col bg-white border border-gray-200 hover:border-[#002f5a] transition-all duration-300"
                >

                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={item.local_image ? `${MEDIA_BASE_URL}/${item.local_image}` : (item.image_url || "https://images.unsplash.com/photo-1504711432869-efd597cdd042?w=800&q=80")} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-0 left-0 bg-[#002f5a] text-white text-[9px] font-bold px-3 py-1.5 tracking-widest">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold">{formatTimeAgo(item.published_at)}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#002f5a] transition-colors line-clamp-3 leading-snug mb-6 font-serif break-words">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-8 flex-grow font-medium leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-[#002f5a] font-black text-[10px] tracking-widest group-hover:translate-x-1 transition-all">Lire la suite</span>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#002f5a] transition-all" />
                  </div>
                </div>
                </Link>
              </React.Fragment>
            ))}
          </div>
        )}
        
        {!loading && news.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 bg-white border border-gray-200">
             <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mb-6">
                <Hash className="h-10 w-10 text-gray-200" />
             </div>
             <h2 className="text-2xl font-black text-gray-900 mb-2">Aucun article disponible</h2>
             <p className="text-gray-500 font-medium text-center max-w-sm px-6">
                Nous n'avons trouvé aucune publication récente pour la catégorie <b>{categoryName}</b>.
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
