import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, RotateCcw, Users, AlertTriangle } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { ZONE_COLORS, VALIDATION } from '@/lib/constants';

export default function ZonesSetupPage() {
  const { zones, addZone, removeZone, resetAllScores, setTopicLabel, activeRound, resetBoard } = useGameStore();
  const [newZoneName, setNewZoneName] = useState('');
  const [confirmResetScores, setConfirmResetScores] = useState(false);
  const [confirmResetBoard, setConfirmResetBoard] = useState(false);

  const activeZones = zones.filter(z => !z.archived);

  const handleAddZone = () => {
    if (!newZoneName.trim() || newZoneName.length > VALIDATION.zoneNameMax) return;
    addZone(newZoneName.trim());
    setNewZoneName('');
  };

  return (
    <div className="min-h-screen bg-afc-navy relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-celestial pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/admin" className="text-afc-ivory-muted/50 hover:text-afc-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-cinzel text-xl font-bold text-gold-gradient">Zones & Round Setup</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zone Roster */}
          <div className="glass-card p-6">
            <h3 className="font-cinzel text-afc-gold text-sm tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> Zone Roster
            </h3>
            <p className="font-outfit text-afc-ivory-muted/40 text-xs mb-4">
              {activeZones.length} / {VALIDATION.maxZones} zones configured
            </p>

            {/* Add zone input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value.toUpperCase())}
                maxLength={VALIDATION.zoneNameMax}
                placeholder="Zone name (e.g., IDO)"
                className="flex-1 bg-afc-navy-mid/60 border border-afc-gold/20 rounded-lg px-3 py-2 text-afc-ivory font-outfit text-sm focus:border-afc-gold/50 focus:outline-none uppercase"
                onKeyDown={(e) => e.key === 'Enter' && handleAddZone()}
              />
              <button
                onClick={handleAddZone}
                disabled={!newZoneName.trim() || activeZones.length >= VALIDATION.maxZones}
                className="px-4 py-2 rounded-lg bg-gradient-gold text-afc-navy font-cinzel text-sm font-semibold hover:shadow-gold-intense disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Zone list */}
            <div className="space-y-2">
              <AnimatePresence>
                {activeZones.map((zone, i) => (
                  <motion.div
                    key={zone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg bg-afc-navy-mid/30"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ZONE_COLORS[i % ZONE_COLORS.length].bg }}
                    />
                    <span className="font-cinzel text-afc-ivory text-sm font-semibold flex-1">
                      {zone.name}
                    </span>
                    <span className="font-cinzel text-afc-gold text-sm">{zone.score} pts</span>
                    <button
                      onClick={() => removeZone(zone.id)}
                      className="p-1.5 rounded-lg hover:bg-afc-crimson/10 text-afc-ivory-muted/30 hover:text-afc-crimson-light transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Score Reset */}
            <div className="glass-card p-6">
              <h3 className="font-cinzel text-afc-gold text-sm tracking-wider mb-4">Score Management</h3>

              {!confirmResetScores ? (
                <button
                  onClick={() => setConfirmResetScores(true)}
                  className="w-full py-3 rounded-xl glass text-afc-ivory-muted/60 font-outfit text-sm hover:text-afc-crimson-light hover:border-afc-crimson/30 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset All Scores to 0
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <p className="font-outfit text-sm">This will reset ALL zone scores to 0!</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { resetAllScores(); setConfirmResetScores(false); }}
                      className="flex-1 py-2 rounded-lg bg-afc-crimson/20 text-afc-crimson-light font-outfit text-sm border border-afc-crimson/30"
                    >
                      Confirm Reset
                    </button>
                    <button
                      onClick={() => setConfirmResetScores(false)}
                      className="flex-1 py-2 rounded-lg glass text-afc-ivory-muted/50 font-outfit text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Round Board Reset */}
            <div className="glass-card p-6">
              <h3 className="font-cinzel text-afc-gold text-sm tracking-wider mb-4">Round Board Reset</h3>
              <p className="font-outfit text-afc-ivory-muted/40 text-xs mb-3">
                Re-enable all tiles for the current round without affecting scores or other rounds.
              </p>

              {!confirmResetBoard ? (
                <button
                  onClick={() => setConfirmResetBoard(true)}
                  className="w-full py-3 rounded-xl glass text-afc-ivory-muted/60 font-outfit text-sm hover:text-amber-400 hover:border-amber-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Current Board
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { resetBoard(); setConfirmResetBoard(false); }}
                    className="flex-1 py-2 rounded-lg bg-amber-500/20 text-amber-400 font-outfit text-sm border border-amber-500/30"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmResetBoard(false)}
                    className="flex-1 py-2 rounded-lg glass text-afc-ivory-muted/50 font-outfit text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Topic Label */}
            <div className="glass-card p-6">
              <h3 className="font-cinzel text-afc-gold text-sm tracking-wider mb-4">Topic / Book Label</h3>
              <p className="font-outfit text-afc-ivory-muted/40 text-xs mb-3">
                Current: <span className="text-afc-gold/60">{activeRound?.topicLabel || 'Not set'}</span>
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue={activeRound?.topicLabel || ''}
                  onChange={(e) => setTopicLabel(e.target.value)}
                  placeholder="e.g., Genesis Book"
                  className="flex-1 bg-afc-navy-mid/60 border border-afc-gold/20 rounded-lg px-3 py-2 text-afc-ivory font-outfit text-sm focus:border-afc-gold/50 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
