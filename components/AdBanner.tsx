import React from 'react';
import { Megaphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AdBanner: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mx-4 mb-4 bg-gradient-to-r from-brand-accent to-yellow-400 rounded-xl p-4 shadow-md flex items-center justify-between text-brand-navy">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase opacity-60 tracking-wider mb-1 flex items-center gap-1">
            <Megaphone size={10} /> {t.sponsored}
        </span>
        <h4 className="font-bold text-sm leading-tight max-w-[200px]">
            {t.adPromo}
        </h4>
      </div>
      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg text-2xl">
        🚌
      </div>
    </div>
  );
};

export default AdBanner;