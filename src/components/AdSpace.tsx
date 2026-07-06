import React from 'react';
import { Link } from 'react-router-dom';

interface AdSpaceProps {
  type: 'horizontal' | 'sidebar';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ type, className = '' }) => {
  const isHorizontal = type === 'horizontal';

  const adData = isHorizontal ? {
    image: '/assets/ads/ehk_books_banner.png',
    alt: 'Éditions Hubert Kalukanda - Vos ouvrages de référence en droit',
    link: 'mailto:contact@rja.ehk-editions.com?subject=Demande d\'information - Éditions Hubert Kalukanda',
    isExternal: true
  } : {
    image: '/assets/ads/legal_training_sidebar.png',
    alt: 'RJA Formations - Boostez votre expertise juridique. Inscriptions ouvertes',
    link: '/contact',
    isExternal: false
  };

  const adContent = (
    <img 
      src={adData.image} 
      alt={adData.alt} 
      className="w-full h-auto block object-cover rounded-lg"
    />
  );

  return (
    <div className={`flex flex-col gap-1.5 w-full ${isHorizontal ? 'my-8 mx-auto max-w-[1200px]' : 'my-6'} ${className}`}>
      <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider px-1">
        <span>Sponsorisé</span>
        <span className="border border-gray-200 px-1.5 py-0.5 rounded text-[8px] tracking-widest font-black bg-gray-50">PUBLICITÉ</span>
      </div>
      {adData.isExternal ? (
        <a 
          href={adData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full overflow-hidden rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-yellow-500 hover:-translate-y-0.5 transition-all duration-300"
        >
          {adContent}
        </a>
      ) : (
        <Link 
          to={adData.link}
          className="block w-full overflow-hidden rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-yellow-500 hover:-translate-y-0.5 transition-all duration-300"
        >
          {adContent}
        </Link>
      )}
    </div>
  );
};

export default AdSpace;
