import React, { useState } from 'react';
import SafetyWidget from '../components/SafetyWidget';
import { SAFETY_TIPS } from '../constants';
import { analyzeReport } from '../services/geminiService';
import { ShieldAlert, CheckCircle, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Safety: React.FC = () => {
  const { t } = useLanguage();
  const [reportText, setReportText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmitReport = async () => {
    if (!reportText.trim()) return;
    setIsSubmitting(true);
    
    const response = await analyzeReport(reportText);
    
    setFeedback(response);
    setReportText('');
    setIsSubmitting(false);
    
    setTimeout(() => setFeedback(''), 5000);
  };

  return (
    <div className="pb-24 px-4 pt-8 min-h-screen bg-brand-light">
      <h1 className="text-2xl font-bold text-brand-navy mb-6">{t.safety}</h1>
      
      {/* SOS Section */}
      <section className="mb-8">
        <SafetyWidget />
      </section>

      {/* Report Section */}
      <section className="bg-white rounded-xl shadow-sm border border-brand-beige p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="text-orange-500" />
            <h2 className="font-bold text-lg text-gray-800">{t.reportIssue}</h2>
        </div>
        
        <textarea 
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="Describe harassment, unsafe driving, or overcrowding..."
            className="w-full p-3 bg-brand-light rounded-lg border border-brand-beige text-sm focus:ring-2 focus:ring-brand-green/50 outline-none h-24 mb-3 resize-none"
        />
        
        {feedback && (
            <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg mb-3 flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5" />
                {feedback}
            </div>
        )}

        <button 
            onClick={handleSubmitReport}
            disabled={isSubmitting || !reportText}
            className={`w-full py-2.5 rounded-lg font-bold text-white text-sm flex items-center justify-center gap-2 shadow-sm ${isSubmitting ? 'bg-gray-400' : 'bg-brand-navy hover:bg-black'}`}
        >
            {isSubmitting ? 'Processing...' : <><Send size={16} /> {t.submitReport}</>}
        </button>
      </section>

      {/* Tips Section */}
      <section>
        <h3 className="font-bold text-gray-700 mb-3 ml-1">{t.safetyTips}</h3>
        <div className="space-y-3">
            {SAFETY_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-brand-beige text-sm text-gray-600 flex gap-3 shadow-sm">
                    <span className="text-brand-green font-bold">{idx + 1}.</span>
                    {tip}
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Safety;