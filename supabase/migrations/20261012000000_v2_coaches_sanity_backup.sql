-- Sanity is the source of truth for coaches; v2_coaches is a backup that the site can read from
-- if Sanity is unreachable. Run this once in the Supabase SQL editor (project qxacvupalbfcoqkuydba).

alter table public.v2_coaches
  add column if not exists sanity_id       text,
  add column if not exists sanity_snapshot jsonb,
  add column if not exists synced_at       timestamptz;

create unique index if not exists v2_coaches_sanity_id_key
  on public.v2_coaches (sanity_id)
  where sanity_id is not null;

comment on column public.v2_coaches.sanity_id is
  'Sanity document _id (coach-profile-<slug>). Present = this row is a backup of a Sanity coach.';
comment on column public.v2_coaches.sanity_snapshot is
  'Full published Sanity coach document (COACH_PROJECTION in src/lib/coach-sync.mjs). Do not edit by hand.';
comment on column public.v2_coaches.synced_at is
  'Last time the Sanity webhook / sync script wrote this row.';

-- No policy changes: the public site already reads v2_coaches with the anon key (read-only).
-- Writes are done with the service role key (webhook + scripts), which bypasses RLS.
