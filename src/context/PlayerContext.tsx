import { createContext, useContext, useState, type ReactNode } from 'react';

type PlayerType = 'TV' | 'RADIO' | null;

interface PlayerContextType {
  activeType: PlayerType;
  isPlaying: boolean;
  isMinimized: boolean;
  playTV: () => void;
  playRadio: () => void;
  pause: () => void;
  resume: () => void;
  setIsMinimized: (minimized: boolean) => void;
  stop: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [activeType, setActiveType] = useState<PlayerType>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const playTV = () => {
    setActiveType('TV');
    setIsPlaying(true);
  };

  const playRadio = () => {
    setActiveType('RADIO');
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const resume = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setActiveType(null);
    setIsPlaying(false);
    setIsMinimized(false);
  };

  return (
    <PlayerContext.Provider value={{
      activeType,
      isPlaying,
      isMinimized,
      playTV,
      playRadio,
      pause,
      resume,
      setIsMinimized,
      stop
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
