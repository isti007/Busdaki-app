import React from 'react';
import { MOCK_BUSES } from '../constants';
import { ArrowLeft, Navigation } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const focusedBusId = (location.state as any)?.focusedBusId;

  const focusedBus = MOCK_BUSES.find(b => b.id === focusedBusId) || MOCK_BUSES[0];

  return (
    <div className="h-screen w-full relative bg-gray-200 overflow-hidden">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 pt-8 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
            <button onClick={() => navigate(-1)} className="bg-white p-2 rounded-full shadow-md">
                <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-white font-bold text-lg drop-shadow-md">Live Tracking</h1>
        </div>
      </div>

      {/* Simulated Map Background */}
      <div className="absolute inset-0 z-0">
         {/* Using a pattern or basic SVG to simulate map streets */}
         <svg className="w-full h-full bg-[#e5e7eb]" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="2"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Simulated Roads */}
            <path d="M 50 0 L 50 800" stroke="white" strokeWidth="15" />
            <path d="M 0 300 L 500 300" stroke="white" strokeWidth="15" />
            <path d="M 100 0 L 200 800" stroke="white" strokeWidth="8" />
            
            {/* Bus Path */}
            <path d="M 50 100 L 50 300 L 200 400" stroke="#0077CC" strokeWidth="4" strokeDasharray="5,5" fill="none" />
         </svg>
      </div>

      {/* Bus Markers */}
      <div className="absolute inset-0 z-10">
         {MOCK_BUSES.map((bus, idx) => {
            // Pseudo-random positioning for demo
            const top = 150 + (idx * 80);
            const left = 50 + (idx * 40);
            const isFocused = bus.id === focusedBus.id;
            
            return (
                <div 
                    key={bus.id}
                    className={`absolute transition-all duration-1000 ease-in-out flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 ${isFocused ? 'scale-110 z-30' : 'scale-90 opacity-80 z-10'}`}
                    style={{ top: `${top}px`, left: `${left}px` }}
                >
                    <div className={`p-2 rounded-full border-2 shadow-lg ${isFocused ? 'bg-brand-blue border-white' : 'bg-white border-gray-400'}`}>
                        <div className="text-white font-bold text-xs flex items-center justify-center w-5 h-5">
                            {isFocused ? <Navigation size={16} fill="white" /> : <span className="text-gray-800">🚌</span>}
                        </div>
                    </div>
                    {isFocused && (
                         <div className="mt-1 bg-white px-2 py-1 rounded shadow-md text-xs font-bold text-gray-800 whitespace-nowrap">
                            {bus.routeName} ({bus.etaMinutes}m)
                         </div>
                    )}
                </div>
            )
         })}
         
         {/* User Location */}
         <div className="absolute top-[300px] left-[150px] transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-4 h-4 bg-brand-green rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="w-16 h-16 bg-brand-green/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
         </div>
      </div>

      {/* Bottom Sheet for Focused Bus */}
      <div className="absolute bottom-20 left-4 right-4 bg-white p-4 rounded-xl shadow-xl z-20 border border-gray-100">
         <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900">{focusedBus.routeName}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded ${focusedBus.crowdLevel === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {focusedBus.crowdLevel} Crowd
            </span>
         </div>
         <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Next: {focusedBus.nextStop}</span>
            <span>ETA: {focusedBus.etaMinutes} min</span>
         </div>
      </div>
    </div>
  );
};

export default MapPage;