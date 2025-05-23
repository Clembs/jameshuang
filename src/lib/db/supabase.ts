import { SUPABASE_API_KEY, SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);
