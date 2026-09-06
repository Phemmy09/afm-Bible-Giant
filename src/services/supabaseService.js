import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://nxnzacsnbykmctnaxysf.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bnphY3NuYnlrbWN0bmF4eXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MTU1OTAsImV4cCI6MjEwNDI5MTU5MH0.WIDdYpdzdJ1eRy5a8Yet5PQOMum_cmdJ0O-yQezsA9g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export const DEFAULT_ROOM_CODE = 'EKITI-GIANT';

/**
 * Creates or subscribes to a Supabase Realtime Broadcast Channel
 * @param {string} roomCode Session PIN or code (e.g. EKITI-GIANT)
 * @param {function} onMessage Callback when a broadcast message is received
 * @returns {object} Subscription channel controller
 */
export function subscribeToGameChannel(roomCode = DEFAULT_ROOM_CODE, onMessage) {
  const channelName = `bible-giant-${roomCode.toUpperCase().trim()}`;
  const channel = supabase.channel(channelName);

  channel
    .on('broadcast', { event: 'game_event' }, (payload) => {
      if (onMessage && payload && payload.payload) {
        onMessage(payload.payload);
      }
    })
    .subscribe((status) => {
      console.log(`[Supabase Realtime] Room ${channelName} status:`, status);
    });

  return {
    sendEvent: async (eventData) => {
      try {
        await channel.send({
          type: 'broadcast',
          event: 'game_event',
          payload: {
            ...eventData,
            timestamp: Date.now(),
          },
        });
      } catch (err) {
        console.warn('Realtime broadcast error (fallback active):', err);
      }
    },
    unsubscribe: () => {
      supabase.removeChannel(channel);
    },
  };
}

// Local Storage helpers for persistent tournament state across refreshes & offline halls
const STORAGE_KEY = 'afc_bible_giant_state_v1';

export function saveLocalGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

export function loadLocalGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
    return null;
  }
}
