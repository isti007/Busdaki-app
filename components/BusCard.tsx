
import React from 'react';
import { Bus } from '../types';
import CrowdIndicator from './CrowdIndicator';
import { MapPin, Clock, ShieldCheck, Armchair } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BusCardProps {
  bus: Bus;
  onTrack: (bus: Bus) => void;
}

const BusCard: React.FC<BusCardProps> = ({ bus, onTrack }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-brand-beige p-4 mb-3 transition-transform active:scale-[0.99] hover:shadow-md animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-brand-navy text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {bus.routeNumber}
            </span>
            <h3 className="font-bold text-lg text-gray-800">{bus.routeName}</h3>
          </div>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            {bus.origin} <span className="text-brand-green font-bold">➜</span> {bus.destination}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
            <CrowdIndicator level={bus.crowdLevel} mini />
            <div className="flex items-center gap-1 bg-brand-light border border-brand-beige px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-600">
                <Armchair size={10} className="text-brand-darkGreen" />
                <span>{bus.availableSeats}/{bus.totalSeats} {t.seats}</span>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-4 my-3 text-sm text-gray-600">
        <div className="flex items-center gap-1.5 bg-brand-light px-2 py-1 rounded-md">
            <Clock size={14} className="text-brand-green" />
            <span className="font-medium text-xs">{bus.etaMinutes} {t.minAway}</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
            <MapPin size={14} className="text-gray-400" />
            <span className="truncate max-w-[120px] text-xs">{bus.currentLocation}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        {bus.isSafeCertified ? (
           <div className="flex items-center gap-1 text-xs text-brand-green font-bold bg-brand-green/10 px-2 py-1 rounded-full border border-brand-green/20">
             <ShieldCheck size={12} />
             <span>{t.safetyCertified}</span>
           </div>
        ) : <div />}
        
        <button 
          onClick={() => onTrack(bus)}
          className="text-brand-darkGreen text-sm font-bold hover:text-brand-green flex items-center gap-1"
        >
          {t.track} &rarr;
        </button>
      </div>
    </div>
  );
};

export default BusCard;
