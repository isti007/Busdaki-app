import React, { useState } from 'react';
import { getSmartRouteAdvice } from '../services/geminiService';
import { RouteSuggestion } from '../types';
import { ArrowLeft, Zap, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Planner: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<RouteSuggestion[]>([]);

  const handleSearch = async () => {
    if (!from || !to) return;
    setLoading(true);
    setSuggestions([]);
    
    // Simulate time passing and call Gemini
    const now = new Date().toLocaleTimeString();
    const results = await getSmartRouteAdvice(from, to, now, language);
    setSuggestions(results);
    setLoading(false);
  };

  return (
    <div className="pb-24 min-h-screen bg-brand-light">
      <div className="bg-brand-light p-4 pt-6 shadow-sm sticky top-0 z-10 border-b border-brand-beige">
        <div className="flex items-center gap-3 mb-4">
             <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">{t.smartRoutePlanner}</h1>
        </div>
        
        <div className="space-y-3">
            <div className="relative">
                <div className="absolute left-3 top-3.5 w-3 h-3 border-2 border-brand-green rounded-full"></div>
                <input 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder={t.from}
                    className="w-full pl-9 pr-4 py-3 bg-white border border-brand-beige rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-green/50 shadow-sm"
                />
            </div>
            <div className="relative">
                <div className="absolute left-3 top-3.5 w-3 h-3 bg-brand-navy rounded-full"></div>
                <input 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={t.to}
                    className="w-full pl-9 pr-4 py-3 bg-white border border-brand-beige rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-green/50 shadow-sm"
                />
            </div>
            
            <button 
                onClick={handleSearch}
                disabled={loading || !from || !to}
                className={`w-full py-3 rounded-xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${loading ? 'bg-gray-400' : 'bg-brand-green hover:bg-brand-darkGreen'}`}
            >
                {loading ? t.analyzing : <><Sparkles size={18} /> {t.findRoutes}</>}
            </button>
        </div>
      </div>

      <div className="p-4">
        {loading && (
            <div className="space-y-4 animate-pulse">
                {[1,2].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
            </div>
        )}

        {!loading && suggestions.length > 0 && (
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-600 text-sm">Recommended by AI</h3>
                {suggestions.map((route, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl shadow-md border border-brand-beige">
                        <div className="flex justify-between mb-2">
                             <div className="flex items-center gap-2">
                                <span className="bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-bold">
                                    Option {idx + 1}
                                </span>
                                {route.safetyScore >= 8 && (
                                    <span className="flex items-center gap-1 text-xs text-brand-navy bg-blue-50 px-2 py-1 rounded font-medium">
                                        <Shield size={10} /> Safe
                                    </span>
                                )}
                             </div>
                             <span className="font-bold text-gray-800">{route.duration}</span>
                        </div>
                        
                        <p className="text-gray-700 font-medium mb-3 text-sm">{route.description}</p>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs border-t border-dashed border-gray-200 pt-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-400">Crowd</span>
                                <span className="font-bold text-gray-700">{route.crowdPrediction}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-400">Cost</span>
                                <span className="font-bold text-gray-700">{route.cost}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-400">Safety</span>
                                <span className="font-bold text-brand-green">{route.safetyScore}/10</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Planner;