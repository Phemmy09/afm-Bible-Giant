-- =========================================================================
-- THE APOSTOLIC FAITH CHURCH EKITI AREA - WHO WANTS TO BE A BIBLE GIANT
-- Supabase Database Schema & Realtime Setup
-- Project: nxnzacsnbykmctnaxysf
-- =========================================================================

-- 1. Create Tournament Sessions Table
CREATE TABLE IF NOT EXISTS public.tournament_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_code TEXT NOT NULL UNIQUE DEFAULT 'EKITI-GIANT',
    title TEXT NOT NULL DEFAULT 'Ekiti Area Youth Bible Challenge',
    status TEXT NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, PAUSED
    current_state JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Contestants Table
CREATE TABLE IF NOT EXISTS public.contestants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.tournament_sessions(id) ON DELETE CASCADE,
    seat_number INTEGER NOT NULL,
    name TEXT NOT NULL,
    zone TEXT NOT NULL, -- e.g. 'Ado Central (Ajilosun)', 'Ikole Ekiti', 'Igede Ekiti'
    score INTEGER DEFAULT 0 NOT NULL,
    bonus_score INTEGER DEFAULT 0 NOT NULL,
    lifelines_used JSONB DEFAULT '{"fiftyFifty": false, "consultScriptures": false, "askAudience": false, "phonePastor": false}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section TEXT NOT NULL, -- 'AFC Heritage & History', 'Scriptural Knowledge', 'German Speed Round', 'Theory & Recital'
    category TEXT DEFAULT 'General',
    question_type TEXT NOT NULL DEFAULT 'objective', -- 'objective', 'german', 'theory'
    prompt TEXT NOT NULL,
    options JSONB, -- {"A": "...", "B": "...", "C": "...", "D": "..."}
    answer TEXT NOT NULL,
    scripture_ref TEXT,
    explanation TEXT,
    points INTEGER DEFAULT 20 NOT NULL,
    bonus_points INTEGER DEFAULT 10 NOT NULL,
    time_limit INTEGER DEFAULT 30 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS) & Public Policies for tournament access
ALTER TABLE public.tournament_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contestants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read of active sessions" 
ON public.tournament_sessions FOR SELECT USING (true);

CREATE POLICY "Allow public write of active sessions" 
ON public.tournament_sessions FOR ALL USING (true);

CREATE POLICY "Allow public read contestants" 
ON public.contestants FOR SELECT USING (true);

CREATE POLICY "Allow public write contestants" 
ON public.contestants FOR ALL USING (true);

CREATE POLICY "Allow public read questions" 
ON public.questions FOR SELECT USING (true);

CREATE POLICY "Allow public write questions" 
ON public.questions FOR ALL USING (true);

-- 5. Enable Supabase Realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.tournament_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contestants;
