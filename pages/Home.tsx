
import React, { useState } from 'react';
import { Bus, CrowdLevel } from '../types';
import { MOCK_BUSES } from '../constants';
import BusCard from '../components/BusCard';
import AdBanner from '../components/AdBanner';
import AIChatWindow from '../components/AIChatWindow';
import { Search, MapPin, BarChart3, Bot, Filter, Ticket, BusFront, Armchair } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [showAI, setShowAI] = useState(false);
  const [capacityFilter, setCapacityFilter] = useState<CrowdLevel | 'ALL'>('ALL');
  const [minSeats, setMinSeats] = useState<number>(0);

  const handleTrack = (bus: Bus) => {
    navigate('/map', { state: { focusedBusId: bus.id } });
  };

  const filteredBuses = MOCK_BUSES.filter(bus => {
    const matchesCrowd = capacityFilter === 'ALL' ? true : bus.crowdLevel === capacityFilter;
    const matchesSeats = bus.availableSeats >= minSeats;
    return matchesCrowd && matchesSeats;
  });

  return (
    <div className="pb-24 bg-brand-light min-h-screen">
      {showAI && <AIChatWindow onClose={() => setShowAI(false)} />}
      
      {/* Header */}
      <div className="bg-brand-green p-6 pt-10 rounded-b-[2.5rem] shadow-lg mb-6 relative overflow-hidden animate-in slide-in-from-top duration-500">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-3">
             {/* Branded Logo Asset */}
             <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-green/5"></div>
                <BusFront size={28} className="text-brand-green" strokeWidth={2.5} />
             </div>
             <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-black text-white tracking-wider drop-shadow-sm font-sans">BUSDAKI</h1>
                <p className="text-brand-beige text-xs font-medium tracking-wide opacity-90">{t.subtitle}</p>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
             {/* Language Toggle */}
             <button 
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 transition-colors backdrop-blur-md"
             >
                {language === 'en' ? 'EN' : 'বাংলা'}
             </button>
             
             <div 
               onClick={() => navigate('/profile')}
               className="w-10 h-10 bg-brand-beige text-brand-green font-bold rounded-full flex items-center justify-center border-2 border-white/50 shadow-md cursor-pointer hover:scale-105 transition-transform"
             >
                JD
             </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white hover:bg-white/20 transition-colors group cursor-pointer">
                <div className="flex items-center gap-2 mb-1 opacity-90">
                    <BarChart3 size={14} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">{t.dailyStats}</span>
                </div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-[10px] opacity-80">{t.busesTracked}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white hover:bg-white/20 transition-colors group cursor-pointer">
                 <div className="flex items-center gap-2 mb-1 opacity-90">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]"></div>
                    <span className="text-xs font-bold">{t.activeAlerts}</span>
                </div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-[10px] opacity-80">Safe & Normal</div>
            </div>
        </div>

        {/* Search Bar */}
        <div className="bg-brand-light rounded-xl shadow-xl p-2 flex items-center gap-2 relative z-10">
            <MapPin className="text-brand-green ml-2" size={20} />
            <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm py-2"
                onClick={() => navigate('/planner')}
            />
            <button className="bg-brand-navy text-white p-2.5 rounded-lg shadow-md hover:bg-gray-800 transition-colors">
                <Search size={18} />
            </button>
        </div>
      </div>

      {/* Advertisement Banner */}
      <AdBanner />

      {/* Main Content */}
      <div className="px-4">
        {/* AI Assistant Button */}
        <div 
            onClick={() => setShowAI(true)}
            className="bg-white border border-brand-green/30 p-4 rounded-xl shadow-sm mb-6 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
            <div className="flex items-center gap-3">
                <div className="bg-brand-green/10 p-2.5 rounded-full text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
                    <Bot size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">{t.aiAssistant}</h3>
                    <p className="text-xs text-gray-500">{t.aiPrompt}</p>
                </div>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors">
                &rarr;
            </div>
        </div>

        {/* Menu for Capacity (Crowd & Seat Filter) */}
        <div className="mb-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                    <Filter size={14} className="text-brand-green" />
                    {t.filterCapacity}
                </h2>
            </div>
            
            <div className="flex flex-col gap-3">
                {/* Seat Capacity Input */}
                <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 px-2">
                        <Armchair size={14} />
                        <span>{t.seatsAvailable}:</span>
                    </div>
                    <select 
                        value={minSeats}
                        onChange={(e) => setMinSeats(Number(e.target.value))}
                        className="flex-1 bg-brand-light text-brand-navy text-xs font-bold p-2 rounded-lg outline-none focus:ring-1 focus:ring-brand-green"
                    >
                        <option value={0}>{t.any}</option>
                        <option value={1}>1+</option>
                        <option value={5}>5+</option>
                        <option value={10}>10+</option>
                        <option value={20}>20+</option>
                    </select>
                </div>

                {/* Crowd Level Filter */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button 
                        onClick={() => setCapacityFilter('ALL')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                            capacityFilter === 'ALL' 
                            ? 'bg-brand-navy text-white border-brand-navy' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {t.all}
                    </button>
                    <button 
                        onClick={() => setCapacityFilter(CrowdLevel.LOW)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border flex items-center gap-1 ${
                            capacityFilter === CrowdLevel.LOW 
                            ? 'bg-brand-green text-white border-brand-green' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-green-50'
                        }`}
                    >
                        <div className={`w-2 h-2 rounded-full ${capacityFilter === CrowdLevel.LOW ? 'bg-white' : 'bg-brand-green'}`}></div>
                        {t.lowCrowd}
                    </button>
                    <button 
                        onClick={() => setCapacityFilter(CrowdLevel.MODERATE)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border flex items-center gap-1 ${
                            capacityFilter === CrowdLevel.MODERATE 
                            ? 'bg-yellow-500 text-white border-yellow-500' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-yellow-50'
                        }`}
                    >
                        <div className={`w-2 h-2 rounded-full ${capacityFilter === CrowdLevel.MODERATE ? 'bg-white' : 'bg-yellow-500'}`}></div>
                        {t.modCrowd}
                    </button>
                    <button 
                        onClick={() => setCapacityFilter(CrowdLevel.HIGH)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border flex items-center gap-1 ${
                            capacityFilter === CrowdLevel.HIGH 
                            ? 'bg-red-500 text-white border-red-500' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-red-50'
                        }`}
                    >
                        <div className={`w-2 h-2 rounded-full ${capacityFilter === CrowdLevel.HIGH ? 'bg-white' : 'bg-red-500'}`}></div>
                        {t.highCrowd}
                    </button>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center mb-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <h2 className="font-bold text-gray-800 text-lg">{t.nearbyBuses}</h2>
            <button className="text-brand-green text-xs font-bold hover:underline">{t.viewAll}</button>
        </div>

        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                    <BusCard key={bus.id} bus={bus} onTrack={handleTrack} />
                ))
            ) : (
                <div className="text-center py-8 bg-white rounded-xl border border-brand-beige">
                    <p className="text-gray-400 text-sm">No buses found matching your criteria.</p>
                </div>
            )}
        </div>

        <div className="mt-8 mb-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            <h2 className="font-bold text-gray-800 text-lg mb-3">{t.quickActions}</h2>
            <div className="grid grid-cols-3 gap-3">
                <div 
                    onClick={() => navigate('/planner')}
                    className="bg-brand-beige p-4 rounded-xl border border-brand-green/20 flex flex-col items-center justify-center gap-2 active:bg-brand-green/20 transition-colors"
                >
                    <span className="text-2xl">🗺️</span>
                    <span className="text-brand-darkGreen font-semibold text-xs text-center">{t.planTrip}</span>
                </div>
                <div 
                    onClick={() => navigate('/ticket')}
                    className="bg-white p-4 rounded-xl border border-brand-green/20 flex flex-col items-center justify-center gap-2 active:bg-brand-green/10 transition-colors shadow-sm"
                >
                    <Ticket size={24} className="text-brand-navy" />
                    <span className="text-brand-navy font-semibold text-xs text-center">{t.buyTicket}</span>
                </div>
                <div 
                    onClick={() => navigate('/safety')}
                    className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center justify-center gap-2 active:bg-red-100 transition-colors"
                >
                    <span className="text-2xl">🛡️</span>
                    <span className="text-red-700 font-semibold text-xs text-center">{t.safety}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
