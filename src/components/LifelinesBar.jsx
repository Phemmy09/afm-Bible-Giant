import React from 'react';
import { 
  Percent, 
  BookOpen, 
  Users, 
  PhoneCall, 
  Sparkles,
  Lock
} from 'lucide-react';
import classicalAudio from '../services/audioService';

export default function LifelinesBar({ 
  lifelinesUsed = {}, 
  onUseLifeline, 
  isObjective = true,
  disabled = false,
  showLabels = true
}) {
  const lifelines = [
    {
      id: 'fiftyFifty',
      title: '50:50 Grace Elimination',
      short: '50:50',
      desc: 'Eliminate two incorrect options',
      icon: Percent,
      color: 'from-amber-500 to-yellow-600 border-amber-400',
      requiresObjective: true
    },
    {
      id: 'consultScriptures',
      title: 'Consult the Scriptures (30s Bible Search)',
      short: 'Bible Search',
      desc: '30 seconds to open the Bible and search for chapter & verse',
      icon: BookOpen,
      color: 'from-emerald-600 to-teal-700 border-emerald-400',
      requiresObjective: false
    },
    {
      id: 'askAudience',
      title: 'Ask Ekiti Area Youth Congregation',
      short: 'Ask Youth',
      desc: 'Poll the church hall congregation for consensus',
      icon: Users,
      color: 'from-blue-600 to-indigo-700 border-blue-400',
      requiresObjective: true
    },
    {
      id: 'phonePastor',
      title: 'Phone an Apostolic Faith Minister / Elder',
      short: 'Call Pastor',
      desc: '30-second call to an ordained minister or youth counselor',
      icon: PhoneCall,
      color: 'from-purple-600 to-pink-700 border-purple-400',
      requiresObjective: false
    }
  ];

  const handleTrigger = (item) => {
    if (disabled || lifelinesUsed[item.id]) return;
    if (item.requiresObjective && !isObjective) return;

    classicalAudio.playLifeline();
    onUseLifeline(item.id);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
      {lifelines.map((item) => {
        const isUsed = !!lifelinesUsed[item.id];
        const isUnavailable = item.requiresObjective && !isObjective;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => handleTrigger(item)}
            disabled={disabled || isUsed || isUnavailable}
            title={`${item.title} - ${isUsed ? 'Already Used' : item.desc}`}
            className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl border font-bold text-xs transition-all shadow-md ${
              isUsed
                ? 'bg-black/40 border-gray-700/60 text-gray-500 line-through opacity-45 cursor-not-allowed'
                : isUnavailable
                ? 'bg-black/30 border-gray-800 text-gray-600 opacity-40 cursor-not-allowed'
                : `bg-gradient-to-r ${item.color} text-white hover:scale-105 hover:shadow-gold-glow cursor-pointer`
            }`}
          >
            <div className={`p-1.5 rounded-lg ${isUsed ? 'bg-gray-800' : 'bg-black/25'}`}>
              {isUsed ? <Lock className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
            </div>

            {showLabels && (
              <div className="text-left">
                <span className="block font-serif text-[11px] leading-tight">
                  {item.short}
                </span>
                <span className="block text-[9px] font-normal opacity-80 leading-none">
                  {isUsed ? 'EXHAUSTED' : 'LIFELINE'}
                </span>
              </div>
            )}

            {!isUsed && !isUnavailable && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-afc-gold rounded-full animate-ping"></span>
            )}
          </button>
        );
      })}
    </div>
  );
}
