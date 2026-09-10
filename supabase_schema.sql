-- ============================================================
-- WHO WANTS TO BE A BIBLE GIANT — AFC BIBLE GIANT
-- THE APOSTOLIC FAITH CHURCH (AFM WECA) — EKITI AREA & YDD
-- COMPLETE SUPABASE POSTGRESQL PRODUCTION SCHEMA & SEED DATA
-- ============================================================

-- 1. ENABLE EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. SAFE TEARDOWN (Run safely on clean or existing databases)
drop table if exists audience_predictions cascade;
drop table if exists audience_answers cascade;
drop table if exists audience_members cascade;
drop table if exists team_submissions cascade;
drop table if exists certificates cascade;
drop table if exists broadcast_events cascade;
drop table if exists ultimate_challenge_attempts cascade;
drop table if exists score_adjustments cascade;
drop table if exists board_tiles cascade;
drop table if exists questions cascade;
drop table if exists rounds cascade;
drop table if exists zones cascade;
drop table if exists game_sessions cascade;
drop table if exists audit_log cascade;

-- ============================================================
-- 3. CORE TABLE DEFINITIONS
-- ============================================================

-- 3.1 GAME SESSIONS
create table if not exists game_sessions (
  id text primary key,
  name text not null default 'Ekiti Area Youth Convention — Bible Giant Tournament',
  phase text not null default 'in_progress', -- 'setup' | 'in_progress' | 'podium' | 'concluded'
  current_round_id text,
  active_zone_id text,
  unit_tier text not null default 'zone',
  unit_label text not null default 'Zone',
  engine_mode text not null default 'legacy_board', -- 'legacy_board' | 'digital_live'
  session_code text not null default '345TWJ',
  prediction_window_open boolean not null default false,
  version int not null default 0,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 3.2 COMPETING ZONES / UNITS
create table if not exists zones (
  id text primary key,
  session_id text not null references game_sessions(id) on delete cascade,
  name text not null,
  score int not null default 0,
  archived boolean not null default false,
  players jsonb not null default '[]', -- ['Player 1', 'Player 2']
  created_at timestamptz not null default now(),
  unique (session_id, name)
);

-- 3.3 TOURNAMENT ROUNDS
create table if not exists rounds (
  id text primary key,
  session_id text not null references game_sessions(id) on delete cascade,
  round_number int not null,
  round_type text not null default 'objective', -- 'objective' | 'german_gap_fill' | 'theory_open' | 'ultimate_challenge'
  round_format text not null default 'simultaneous', -- 'simultaneous' | 'tile_blitz' | 'ultimate_challenge'
  topic_label text not null default 'Genesis Book',
  is_ultimate_challenge boolean not null default false,
  created_at timestamptz not null default now(),
  unique (session_id, round_number)
);

-- 3.4 QUESTIONS REPOSITORY
create table if not exists questions (
  id text primary key,
  round_id text references rounds(id) on delete set null,
  round_number int not null,
  type text not null default 'objective', -- 'objective' | 'german' | 'theory'
  topic_label text not null default 'Genesis Book',
  question_text text not null,
  options jsonb, -- [{"id":"A","text":"..."},{"id":"B","text":"..."}]
  correct_answer text not null,
  correct_index int default 0,
  scripture_reference text,
  board_tile_number int,
  created_at timestamptz not null default now()
);

-- 3.5 BOARD TILES (Pick-a-Number Matrix)
create table if not exists board_tiles (
  id text primary key,
  round_id text not null references rounds(id) on delete cascade,
  tile_number int not null,
  question_id text references questions(id) on delete cascade,
  state text not null default 'hidden', -- 'hidden' | 'active' | 'used' | 'removed'
  revealed_at timestamptz,
  unique (round_id, tile_number)
);

-- 3.6 DIGITAL LIVE TEAM SUBMISSIONS (Mode B Speed Scoring)
create table if not exists team_submissions (
  id uuid primary key default uuid_generate_v4(),
  session_id text not null references game_sessions(id) on delete cascade,
  question_id text not null references questions(id) on delete cascade,
  zone_id text not null references zones(id) on delete cascade,
  answer_index int not null,
  time_taken_ms int not null default 0,
  is_correct boolean not null default false,
  points_awarded int not null default 0,
  created_at timestamptz not null default now()
);

-- 3.7 AUDIENCE PARTICIPANTS
create table if not exists audience_members (
  id text primary key,
  session_id text not null references game_sessions(id) on delete cascade,
  name text not null,
  phone_mask text not null,
  score int not null default 0,
  created_at timestamptz not null default now()
);

-- 3.8 AUDIENCE ANSWERS
create table if not exists audience_answers (
  id uuid primary key default uuid_generate_v4(),
  audience_id text not null references audience_members(id) on delete cascade,
  question_id text not null references questions(id) on delete cascade,
  answer_index int not null,
  time_taken_ms int not null default 0,
  is_correct boolean not null default false,
  points_awarded int not null default 0,
  created_at timestamptz not null default now()
);

-- 3.9 AUDIENCE PREDICTIONS ("Who's Winning?")
create table if not exists audience_predictions (
  id uuid primary key default uuid_generate_v4(),
  session_id text not null references game_sessions(id) on delete cascade,
  audience_id text not null references audience_members(id) on delete cascade,
  rankings jsonb not null default '[]', -- array of zone_ids in predicted 1st..N order
  created_at timestamptz not null default now(),
  unique (session_id, audience_id)
);

-- 3.10 SCORE ADJUSTMENTS (Audit Trail)
create table if not exists score_adjustments (
  id text primary key,
  zone_id text not null,
  zone_name text not null,
  delta int not null,
  reason text not null check (char_length(reason) >= 3),
  admin_actor text not null default 'Master Admin',
  created_at timestamptz not null default now()
);

-- 3.11 ULTIMATE CHALLENGE ATTEMPTS
create table if not exists ultimate_challenge_attempts (
  id uuid primary key default uuid_generate_v4(),
  zone_id text not null,
  question_index int not null default 1,
  timer_remaining_ms int not null default 60000,
  timer_state text not null default 'stopped',
  timer_locked boolean not null default false,
  subtotal int not null default 0,
  marks jsonb not null default '[]',
  committed boolean not null default false,
  created_at timestamptz not null default now()
);

-- 3.12 BROADCAST EVENTS
create table if not exists broadcast_events (
  id uuid primary key default uuid_generate_v4(),
  session_id text not null,
  event_type text not null,
  payload jsonb not null default '{}',
  action_id text not null,
  created_at timestamptz not null default now()
);

-- 3.13 CERTIFICATES
create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(),
  zone_id text not null,
  zone_name text not null,
  rank int not null,
  score int not null default 0,
  event_title text not null,
  representative_names text,
  pdf_url text,
  issued_at timestamptz not null default now()
);

-- 3.14 AUDIT LOG
create table if not exists audit_log (
  id text primary key,
  actor text not null default 'Master Admin',
  action text not null,
  details jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- ============================================================
-- 4. REALTIME REPLICATION CONFIGURATION
-- ============================================================
do $$ begin
  alter publication supabase_realtime add table game_sessions;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table zones;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table rounds;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table questions;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table board_tiles;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table team_submissions;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table audience_members;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table audience_predictions;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table broadcast_events;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table score_adjustments;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table ultimate_challenge_attempts;
exception when others then null; end $$;

do $$ begin
  alter publication supabase_realtime add table audit_log;
exception when others then null; end $$;

-- ============================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
alter table game_sessions enable row level security;
alter table zones enable row level security;
alter table rounds enable row level security;
alter table questions enable row level security;
alter table board_tiles enable row level security;
alter table team_submissions enable row level security;
alter table audience_members enable row level security;
alter table audience_answers enable row level security;
alter table audience_predictions enable row level security;
alter table score_adjustments enable row level security;
alter table ultimate_challenge_attempts enable row level security;
alter table broadcast_events enable row level security;
alter table certificates enable row level security;
alter table audit_log enable row level security;

-- Public Read & Write Policies for seamless live tournament operations
create policy "Allow all on game_sessions" on game_sessions for all using (true) with check (true);
create policy "Allow all on zones" on zones for all using (true) with check (true);
create policy "Allow all on rounds" on rounds for all using (true) with check (true);
create policy "Allow all on questions" on questions for all using (true) with check (true);
create policy "Allow all on board_tiles" on board_tiles for all using (true) with check (true);
create policy "Allow all on team_submissions" on team_submissions for all using (true) with check (true);
create policy "Allow all on audience_members" on audience_members for all using (true) with check (true);
create policy "Allow all on audience_answers" on audience_answers for all using (true) with check (true);
create policy "Allow all on audience_predictions" on audience_predictions for all using (true) with check (true);
create policy "Allow all on score_adjustments" on score_adjustments for all using (true) with check (true);
create policy "Allow all on ultimate_challenge_attempts" on ultimate_challenge_attempts for all using (true) with check (true);
create policy "Allow all on broadcast_events" on broadcast_events for all using (true) with check (true);
create policy "Allow all on certificates" on certificates for all using (true) with check (true);
create policy "Allow all on audit_log" on audit_log for all using (true) with check (true);

-- ============================================================
-- 6. DEFAULT SEED DATA (Ekiti Area Zones, Rounds & Verified Questions)
-- ============================================================

-- Primary Game Session
insert into game_sessions (id, name, phase, current_round_id, active_zone_id, engine_mode, session_code, version)
values (
  'a0000000-0000-0000-0000-000000000001',
  'Ekiti Area Youth Convention 2030 — Bible Giant Tournament',
  'in_progress',
  'r-01',
  'z-ado',
  'legacy_board',
  '345TWJ',
  1
)
on conflict (id) do update set
  engine_mode = excluded.engine_mode,
  session_code = excluded.session_code;

-- Default Competing Zones in Ekiti Area
insert into zones (id, session_id, name, score, archived, players)
values
  ('z-ado', 'a0000000-0000-0000-0000-000000000001', 'ADO', 0, false, '["Bro. Samuel Adeleke", "Sis. Deborah Babalola"]'::jsonb),
  ('z-ikere', 'a0000000-0000-0000-0000-000000000001', 'IKERE', 0, false, '["Bro. Enoch Olatunji", "Sis. Faith Adebayo"]'::jsonb),
  ('z-igede', 'a0000000-0000-0000-0000-000000000001', 'IGEDE', 0, false, '["Bro. Timothy Daramola", "Sis. Grace Alabi"]'::jsonb),
  ('z-ido', 'a0000000-0000-0000-0000-000000000001', 'IDO', 0, false, '["Bro. Daniel Awe", "Sis. Hannah Ajayi"]'::jsonb),
  ('z-emure', 'a0000000-0000-0000-0000-000000000001', 'EMURE', 0, false, '["Bro. David Ogunleye", "Sis. Joy Ojo"]'::jsonb),
  ('z-ikole', 'a0000000-0000-0000-0000-000000000001', 'IKOLE', 0, false, '["Bro. Peter Ayodele", "Sis. Mary Bello"]'::jsonb)
on conflict (id) do nothing;

-- 6 Tournament Rounds (5 Standard + Ultimate Challenge)
insert into rounds (id, session_id, round_number, round_type, round_format, topic_label, is_ultimate_challenge)
values
  ('r-01', 'a0000000-0000-0000-0000-000000000001', 1, 'objective', 'simultaneous', 'Genesis Book', false),
  ('r-02', 'a0000000-0000-0000-0000-000000000001', 2, 'objective', 'simultaneous', 'Genesis Book', false),
  ('r-03', 'a0000000-0000-0000-0000-000000000001', 3, 'objective', 'tile_blitz', 'Genesis Book', false),
  ('r-04', 'a0000000-0000-0000-0000-000000000001', 4, 'german_gap_fill', 'tile_blitz', 'Book of Daniel', false),
  ('r-05', 'a0000000-0000-0000-0000-000000000001', 5, 'theory_open', 'ultimate_challenge', 'Genesis & Gospels', false),
  ('r-06', 'a0000000-0000-0000-0000-000000000001', 6, 'ultimate_challenge', 'ultimate_challenge', 'Ultimate Challenge (60 Seconds)', true)
on conflict (id) do nothing;

-- Verified Biblical Questions Bank
insert into questions (id, round_id, round_number, type, topic_label, question_text, options, correct_answer, correct_index, scripture_reference, board_tile_number)
values
  ('q-01', 'r-01', 1, 'objective', 'Genesis Book', 'How old was Abraham when he died? (Genesis 25:7)', '[{"id":"A","text":"165 years"},{"id":"B","text":"175 years"},{"id":"C","text":"180 years"},{"id":"D","text":"190 years"}]'::jsonb, '175 years', 1, 'Genesis 25:7', 1),
  ('q-02', 'r-01', 1, 'objective', 'Genesis Book', 'Who was buried in the cave of Machpelah first? (Genesis 23:19)', '[{"id":"A","text":"Sarah"},{"id":"B","text":"Abraham"},{"id":"C","text":"Rebekah"},{"id":"D","text":"Leah"}]'::jsonb, 'Sarah', 0, 'Genesis 23:19', 2),
  ('q-03', 'r-01', 1, 'objective', 'Genesis Book', 'Who was Isaac''s favorite son? (Genesis 25:28)', '[{"id":"A","text":"Jacob"},{"id":"B","text":"Esau"},{"id":"C","text":"Joseph"},{"id":"D","text":"Reuben"}]'::jsonb, 'Esau', 1, 'Genesis 25:28', 3),
  ('q-04', 'r-01', 1, 'objective', 'Genesis Book', 'What did Esau sell his birthright for? (Genesis 25:34)', '[{"id":"A","text":"Silver and gold"},{"id":"B","text":"Bread and pottage of lentiles"},{"id":"C","text":"Flocks and cattle"},{"id":"D","text":"A field in Hebron"}]'::jsonb, 'Bread and pottage of lentiles', 1, 'Genesis 25:34', 4),
  ('q-05', 'r-02', 2, 'objective', 'Genesis Book', 'How many sons did Jacob have in all? (Genesis 35:22)', '[{"id":"A","text":"10"},{"id":"B","text":"11"},{"id":"C","text":"12"},{"id":"D","text":"13"}]'::jsonb, '12', 2, 'Genesis 35:22', 1),
  ('q-06', 'r-02', 2, 'objective', 'Genesis Book', 'Who bought Joseph from the Midianites in Egypt? (Genesis 37:36)', '[{"id":"A","text":"Pharaoh"},{"id":"B","text":"Potiphar"},{"id":"C","text":"The chief baker"},{"id":"D","text":"The chief butler"}]'::jsonb, 'Potiphar', 1, 'Genesis 37:36', 2),
  ('q-07', 'r-03', 3, 'objective', 'Genesis Book', 'Which son of Jacob was kept as a hostage in Egypt until Benjamin was brought? (Genesis 42:24)', '[{"id":"A","text":"Reuben"},{"id":"B","text":"Simeon"},{"id":"C","text":"Levi"},{"id":"D","text":"Judah"}]'::jsonb, 'Simeon', 1, 'Genesis 42:24', 1),
  ('q-08', 'r-04', 4, 'german', 'Book of Daniel', 'Then the king commanded to call the ____, and the ____, and the ____, and the ____, for to shew the king his dreams. (Daniel 2:2)', null, 'magicians | astrologers | sorcerers | Chaldeans', 0, 'Daniel 2:2', 1),
  ('q-09', 'r-04', 4, 'german', 'Book of Daniel', 'Nebuchadnezzar spake, and said unto them, Is it true, O ____, ____, and ____, do not ye serve my gods? (Daniel 3:14)', null, 'Shadrach | Meshach | Abednego', 0, 'Daniel 3:14', 2),
  ('q-10', 'r-05', 5, 'theory', 'Genesis & Gospels', 'What did Jacob do at his birth that gave him his original Hebrew name? (Genesis 25:26)', null, 'His hand took hold on Esau''s heel', 0, 'Genesis 25:26', 1),
  ('q-11', 'r-05', 5, 'theory', 'Genesis & Gospels', 'Which of the four Gospels begins with "In the beginning was the Word"?', null, 'The Gospel according to St. John (John 1:1)', 0, 'John 1:1', 2),
  ('q-12', 'r-06', 6, 'theory', 'Ultimate Challenge', 'Who was the oldest man recorded in the Bible? (Genesis 5:27)', null, 'Methuselah (969 years)', 0, 'Genesis 5:27', 1),
  ('q-13', 'r-06', 6, 'theory', 'Ultimate Challenge', 'How many days and nights did rain fall during the great flood? (Genesis 7:12)', null, 'Forty days and forty nights', 0, 'Genesis 7:12', 2),
  ('q-14', 'r-06', 6, 'theory', 'Ultimate Challenge', 'What did God place in the sky as a covenant sign that the earth would never again be destroyed by a flood? (Genesis 9:13)', null, 'The bow in the cloud (Rainbow)', 0, 'Genesis 9:13', 3),
  ('q-15', 'r-06', 6, 'theory', 'Ultimate Challenge', 'What was the name of the tower where languages were confounded? (Genesis 11:9)', null, 'Babel', 0, 'Genesis 11:9', 4),
  ('q-16', 'r-06', 6, 'theory', 'Ultimate Challenge', 'What was Abraham''s original name before God renamed him? (Genesis 17:5)', null, 'Abram', 0, 'Genesis 17:5', 5)
on conflict (id) do nothing;

-- Initialize Board Tiles for Round 1
insert into board_tiles (id, round_id, tile_number, question_id, state)
values
  ('bt-r1-01', 'r-01', 1, 'q-01', 'hidden'),
  ('bt-r1-02', 'r-01', 2, 'q-02', 'hidden'),
  ('bt-r1-03', 'r-01', 3, 'q-03', 'hidden'),
  ('bt-r1-04', 'r-01', 4, 'q-04', 'hidden')
on conflict (round_id, tile_number) do nothing;

-- Audit entry
insert into audit_log (id, actor, action, details)
values (
  'log-init',
  'Master Admin',
  'schema_initialized',
  '{"message": "Database schema created with Realtime replication, RLS, and seed data."}'::jsonb
)
on conflict (id) do nothing;
