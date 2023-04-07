import type { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from './DatabaseDefinitions';
export type SupabaseType = ReturnType<typeof createSupabaseLoadClient<Database>>;
