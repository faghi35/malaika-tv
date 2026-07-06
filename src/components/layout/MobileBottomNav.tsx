import { Link, useLocation } from 'react-router-dom';
import { Home, Play, Radio } from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Accueil',
      path: '/',
      icon: <Home className="h-5 w-5" />
    },
    {
      name: 'Direct TV',
      path: '/direct-tv',
      icon: (
        <div className="relative">
          <Play className="h-5 w-5" />
          <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
        </div>
      )
    },
    {
      name: 'Direct Radio',
      path: '/direct-radio',
      icon: <Radio className="h-5 w-5" />
    }
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#001f3e]/95 backdrop-blur-md border-t border-yellow-500/25 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-2 transition-all duration-300 ${
                isActive 
                  ? 'text-yellow-400 scale-105' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'translate-y-[-2px]' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-semibold tracking-tight mt-1 transition-all duration-300">
                {item.name}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-0.5 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
