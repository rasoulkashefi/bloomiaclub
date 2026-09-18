import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.REACT_APP_SUPABASE_URL ||
  'https://qxacvupalbfcoqkuydba.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YWN2dXBhbGJmY29xa3V5ZGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDQwMDgsImV4cCI6MjA3NDk4MDAwOH0.c0TCM2eTu_GNhScWk4Rozc5vtXQMZItW1v43wd4fo_o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
