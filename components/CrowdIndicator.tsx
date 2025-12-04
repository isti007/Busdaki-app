import React from 'react';
import { CrowdLevel } from '../types';
import { Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CrowdIndicatorProps {
  level: CrowdLevel;
  mini?: boolean;
}

const CrowdIndicator: React.FC<CrowdIndicatorProps> = ({ level, mini = false }) => {
  const { t } = useLanguage();

  let colorClass = '';
  let text = '';
  let iconColor = '';
  let dotColor = '';

  switch (level) {
    case CrowdLevel.LOW:
      colorClass = 'bg-brand-green/10 text-brand-green border-brand-green/20';
      iconColor = 'text-brand-green';
      dotColor = 'bg-brand-green';
      text = t.lowCrowd;
      break;
    case CrowdLevel.MODERATE:
      colorClass = 'bg-yellow-50 text-yellow-700 border-yellow-200';
      iconColor = 'text-yellow-600';
      dotColor = 'bg-yellow-500';
      text = t.modCrowd;
      break;
    case CrowdLevel.HIGH:
      colorClass = 'bg-red-50 text-red-700 border-red-200';
      iconColor = 'text-red-600';
      dotColor = 'bg-red-500';
      text = t.highCrowd;
      break;
  }

  if (mini) {
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${colorClass}`}>
        <div className={`w-2 h-2 rounded-full ${dotColor}`} />
        {text}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colorClass}`}>
      <Users size={16} className={iconColor} />
      <span className="text-sm font-semibold">{text}</span>
    </div>
  );
};

export default CrowdIndicator;