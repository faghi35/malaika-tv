import { useEffect, useState } from 'react';
import axios from 'axios';
import { Play, X, Calendar, Tag, ChevronRight, Video as VideoIcon } from 'lucide-react';
import VideoPlayer from '../components/player/VideoPlayer';
import { getArrayPayload } from '../api/config';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  created_at: string;
  url: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    axios.get('/api/videos.php')
      .then(res => {
        setVideos(getArrayPayload<Video>(res.data));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching videos', err);
        setLoading(false);
      });
  }, []);

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen py-16 font-outfit">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
               <span className="w-12 h-1.5 bg-brand-blue rounded-full"></span>
               <span className="text-brand-blue font-black uppercase text-xs tracking-widest">Bibliothèque VOD</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Vidéos <span className="text-brand-blue">&</span> Replays
            </h1>
            <p className="text-gray-500 font-medium text-lg md:text-xl mt-6 leading-relaxed">
              Accédez à tout moment à notre catalogue de replays, reportages et exclusivités Malaika TV.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm">
             <VideoIcon className="h-5 w-5 text-brand-blue" />
             <span className="font-black uppercase tracking-widest text-[11px] text-gray-900">{videos.length} Vidéos disponibles</span>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="h-64 bg-white rounded-[32px] animate-pulse"></div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videos.map(video => (
              <div 
                key={video.id} 
                onClick={() => openVideo(video)}
                className="bg-white rounded-[32px] shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-2xl hover:ring-brand-blue/10 transition-all duration-500 group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-video bg-gray-50 overflow-hidden">
                  <img 
                    src={video.thumbnail || "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=80"} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-brand-blue/30 backdrop-blur-[2px] transition-all duration-500">
                    <div className="bg-white p-5 rounded-3xl text-brand-blue shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                      <Play className="h-8 w-8 fill-brand-blue" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                     <span className="bg-white/90 backdrop-blur-md text-brand-blue text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm">
                        {video.category}
                     </span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="font-black text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight uppercase tracking-tighter text-lg mb-4">
                    {video.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                     <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{new Date(video.created_at).toLocaleDateString()}</span>
                     </div>
                     <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-brand-blue transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && videos.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white rounded-[50px] border border-dashed border-gray-200">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <VideoIcon className="h-10 w-10 text-gray-100" />
             </div>
             <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">Aucun contenu multimédia</h2>
             <p className="text-gray-500 font-medium">Les replays de Malaika TV seront bientôt disponibles ici.</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <button 
            onClick={closeVideo}
            className="absolute top-8 right-8 z-[60] p-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-2xl transition-all shadow-2xl active:scale-95"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="relative w-full max-w-[1400px] bg-white rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-500">
            <div className="flex flex-col xl:flex-row h-full">
              {/* Player Side */}
              <div className="xl:w-3/4 bg-black aspect-video flex items-center">
                <VideoPlayer 
                  options={{
                    autoplay: true,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    sources: [{
                      src: selectedVideo.url === '#' ? 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' : selectedVideo.url,
                      type: 'application/x-mpegURL'
                    }]
                  }} 
                />
              </div>
              
              {/* Info Side */}
              <div className="xl:w-1/4 p-10 flex flex-col h-full bg-white">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                   <span className="text-brand-blue font-black uppercase text-xs tracking-widest">En cours de lecture</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-brand-blue text-[10px] font-black rounded-xl uppercase tracking-widest">
                    <Tag className="h-3 w-3" /> {selectedVideo.category}
                  </span>
                  <span className="inline-flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <Calendar className="h-3 w-3" /> {new Date(selectedVideo.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-tight">
                   {selectedVideo.title}
                </h2>
                <div className="flex-grow overflow-y-auto pr-2 no-scrollbar">
                   <p className="text-gray-500 leading-relaxed font-medium">
                      {selectedVideo.description || "Pas de description additionnelle pour ce média. Suivez l'actualité en continu sur Malaika TV."}
                   </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-50">
                   <button className="w-full py-4 bg-brand-blue text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-900 transition-all">
                      Partager la vidéo
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
