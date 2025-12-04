import React from 'react';
import { User, Settings, Heart, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Profile: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-24 pt-8 px-4 bg-brand-light min-h-screen">
       <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-brand-beige border-4 border-white rounded-full flex items-center justify-center text-brand-green text-2xl font-bold shadow-lg mb-3">
                JD
            </div>
            <h1 className="text-xl font-bold text-gray-900">Jane Doe</h1>
            <p className="text-gray-500 text-sm">+880 1712 345678</p>
       </div>

       <div className="space-y-3">
           <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-brand-beige">
                <div className="flex items-center gap-3">
                    <div className="bg-pink-50 p-2 rounded-lg text-pink-500">
                        <Heart size={20} />
                    </div>
                    <span className="font-bold text-gray-700">{t.favorites}</span>
                </div>
                <span className="text-gray-400">&rarr;</span>
           </div>

           <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-brand-beige">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-brand-navy">
                        <User size={20} />
                    </div>
                    <span className="font-bold text-gray-700">{t.emergencyContacts}</span>
                </div>
                <span className="text-gray-400">&rarr;</span>
           </div>

           <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-brand-beige">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-light p-2 rounded-lg text-gray-500">
                        <Settings size={20} />
                    </div>
                    <span className="font-bold text-gray-700">{t.settings}</span>
                </div>
                <span className="text-gray-400">&rarr;</span>
           </div>
           
           <button className="w-full mt-8 flex items-center justify-center gap-2 text-red-500 font-bold py-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
               <LogOut size={18} />
               {t.signOut}
           </button>
       </div>
       
       <div className="mt-10 text-center text-xs text-gray-400">
           Busdaki v1.2.0
       </div>
    </div>
  );
};

export default Profile;