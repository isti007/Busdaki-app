import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Shield, User, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t.home },
    { path: '/map', icon: Map, label: t.map },
    { path: '/planner', icon: Compass, label: t.plan },
    { path: '/safety', icon: Shield, label: t.safety },
    { path: '/profile', icon: User, label: t.profile },
  ];

  return (
    <div className="max-w-md mx-auto bg-brand-light min-h-screen relative shadow-2xl overflow-hidden border-x border-gray-100">
      <div className="h-full overflow-y-auto no-scrollbar">
        {children}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-brand-beige px-6 py-3 flex justify-between items-center z-40 rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-brand-green' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Layout;