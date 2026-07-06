import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Videos from './pages/Videos';
import About from './pages/About';
import Contact from './pages/Contact';
import DirectTV from './pages/DirectTV';
import DirectRadio from './pages/DirectRadio';
import Category from './pages/Category';
import NewsDetail from './pages/NewsDetail';
import Tag from './pages/Tag';
import { PlayerProvider } from './context/PlayerContext';
import GlobalPlayer from './components/player/GlobalPlayer';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          <main className="flex-grow pt-[110px] md:pt-[120px] pb-16 xl:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/direct-tv" element={<DirectTV />} />
              <Route path="/direct-radio" element={<DirectRadio />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/tag/:tagSlug" element={<Tag />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
            </Routes>
          </main>
          <GlobalPlayer />
          <Footer />
          <MobileBottomNav />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
