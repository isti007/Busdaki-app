import React, { useState } from 'react';
import { AlertTriangle, Phone, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SafetyWidget: React.FC = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  const handleSOS = () => {
    setSosSent(true);
    // Logic to send coordinates to contacts would go here
    setTimeout(() => setSosSent(false), 3000);
  };

  if (sosSent) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-red-600 animate-pulse">
            <AlertTriangle size={64} className="text-white mb-4" />
            <h2 className="text-2xl font-bold text-white text-center">{t.sos} SENT</h2>
            <p className="text-white/80 mt-2 text-center px-6">Your live location and audio recording have been sent.</p>
        </div>
    )
  }

  return (
    <div className="bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-red-800 flex items-center gap-2">
            <AlertTriangle size={18} />
            {t.safety} Mode
        </h3>
        <span className="text-xs text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full uppercase">Active</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button 
            onClick={handleSOS}
            className="col-span-2 bg-red-600 active:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors"
        >
            <AlertTriangle size={20} />
            {t.sos}
        </button>
        <button className="bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-xs font-bold flex items-col justify-center items-center gap-1 hover:bg-gray-50 shadow-sm">
            <Phone size={14} />
            {t.callPolice}
        </button>
        <button className="bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-xs font-bold flex items-col justify-center items-center gap-1 hover:bg-gray-50 shadow-sm">
            <Send size={14} />
            {t.shareLoc}
        </button>
      </div>
    </div>
  );
};

export default SafetyWidget;