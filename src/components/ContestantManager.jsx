import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  MapPin, 
  Edit3, 
  Award, 
  Check, 
  Plus,
  RotateCcw
} from 'lucide-react';
import { PRELOADED_EKITI_ZONES } from '../data/defaultQuestions';

export default function ContestantManager({ 
  contestants, 
  activeContestantId, 
  onSetActiveContestant, 
  onUpdateContestants,
  onResetScores 
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [selectedZone, setSelectedZone] = useState(PRELOADED_EKITI_ZONES[0]);
  const [customBranch, setCustomBranch] = useState('');
  const [isCustomZone, setIsCustomZone] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [scoreEditVal, setScoreEditVal] = useState(0);

  const handleAddContestant = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const zoneDisplay = isCustomZone && customBranch.trim() 
      ? customBranch.trim() 
      : selectedZone;

    const newContestant = {
      id: `c-${Date.now()}`,
      seatNumber: contestants.length + 1,
      name: name.trim(),
      zone: zoneDisplay,
      score: 0,
      bonusScore: 0,
      lifelinesUsed: {
        fiftyFifty: false,
        consultScriptures: false,
        askAudience: false,
        phonePastor: false,
      },
    };

    onUpdateContestants([...contestants, newContestant]);
    setName('');
    setCustomBranch('');
    setIsAdding(false);
  };

  const handleRemoveContestant = (id) => {
    const updated = contestants
      .filter(c => c.id !== id)
      .map((c, idx) => ({ ...c, seatNumber: idx + 1 }));
    onUpdateContestants(updated);
  };

  const handleSaveScoreEdit = (id) => {
    const updated = contestants.map(c => {
      if (c.id === id) {
        return { ...c, score: Number(scoreEditVal) || 0 };
      }
      return c;
    });
    onUpdateContestants(updated);
    setEditingId(null);
  };

  return (
    <div className="gold-card rounded-2xl p-5 border border-afc-gold/30">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-afc-gold/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-afc-gold/20 text-afc-gold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-afc-gold-light flex items-center gap-2">
              Contestant Roster & Zones
              <span className="text-xs px-2 py-0.5 rounded-full bg-afc-navy border border-afc-gold/40 text-afc-gold">
                {contestants.length} Contestants
              </span>
            </h3>
            <p className="text-[11px] text-gray-400">
              Ekiti Area Youth Wing • Click on a seat to spotlight active contestant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-afc-gold text-afc-navy hover:brightness-110 shadow-gold-glow"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Contestant</span>
          </button>

          <button
            onClick={onResetScores}
            title="Reset All Scores to 0"
            className="p-1.5 rounded-xl bg-afc-navy-surface border border-rose-500/30 text-rose-400 hover:bg-rose-950/40 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Add Contestant Form */}
      {isAdding && (
        <form onSubmit={handleAddContestant} className="mt-4 p-4 rounded-xl bg-afc-navy-surface border border-afc-gold/30 space-y-3 text-xs animate-fade-in">
          <h4 className="font-bold text-afc-gold flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Register New Stage Contestant
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Contestant Full Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Oluwaseun Adeleke"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-afc-navy border border-afc-gold/40 rounded-lg p-2 text-white focus:outline-none focus:border-afc-gold"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Ekiti Zone or Custom Branch:</label>
              {!isCustomZone ? (
                <div className="space-y-1.5">
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full bg-afc-navy border border-afc-gold/40 rounded-lg p-2 text-white"
                  >
                    {PRELOADED_EKITI_ZONES.map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    onClick={() => setIsCustomZone(true)}
                    className="text-[10px] text-afc-gold hover:underline"
                  >
                    + Enter custom church branch name instead
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    placeholder="e.g. Apostolic Faith Church Ikere Branch"
                    value={customBranch}
                    onChange={(e) => setCustomBranch(e.target.value)}
                    className="w-full bg-afc-navy border border-afc-gold/40 rounded-lg p-2 text-white"
                  />
                  <button 
                    type="button"
                    onClick={() => setIsCustomZone(false)}
                    className="text-[10px] text-afc-gold hover:underline"
                  >
                    ← Select from pre-loaded Ekiti zones
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 rounded-lg bg-afc-gold text-afc-navy font-bold hover:brightness-110 shadow-gold-glow"
            >
              Confirm Registration
            </button>
          </div>
        </form>
      )}

      {/* Contestants List */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {contestants.map((c) => {
          const isActive = c.id === activeContestantId;
          const isEditing = editingId === c.id;

          return (
            <div
              key={c.id}
              onClick={() => onSetActiveContestant(c.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isActive 
                  ? 'gold-card-active scale-[1.02]' 
                  : 'bg-afc-navy-surface/80 border-afc-gold/20 hover:border-afc-gold/50'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 bg-afc-gold text-afc-navy text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg tracking-wider">
                  Active Spotlight
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-serif font-black text-sm border ${
                    isActive 
                      ? 'bg-afc-gold text-afc-navy border-white shadow-gold-glow' 
                      : 'bg-afc-navy text-afc-gold-light border-afc-gold/40'
                  }`}>
                    {c.seatNumber}
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-white line-clamp-1">{c.name}</h4>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-afc-gold shrink-0" />
                      <span className="truncate">{c.zone}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveContestant(c.id);
                  }}
                  title="Remove Contestant"
                  className="p-1 rounded text-gray-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Score Display & Quick Edit */}
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
                    Points:
                  </span>
                  {isEditing ? (
                    <div className="flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="number"
                        value={scoreEditVal}
                        onChange={(e) => setScoreEditVal(e.target.value)}
                        className="w-16 bg-black/60 border border-afc-gold rounded px-1.5 py-0.5 text-xs text-white"
                      />
                      <button
                        onClick={() => handleSaveScoreEdit(c.id)}
                        className="p-1 rounded bg-afc-gold text-afc-navy"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-black text-base text-afc-gold-light">
                        {c.score} <span className="text-[10px] font-sans font-normal text-gray-300">pts</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(c.id);
                          setScoreEditVal(c.score);
                        }}
                        className="text-gray-500 hover:text-afc-gold"
                        title="Edit Score"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {c.bonusScore > 0 && (
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-cyan-300 font-bold block">
                      Bonus:
                    </span>
                    <span className="text-xs font-bold text-cyan-200">
                      +{c.bonusScore} pts
                    </span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
