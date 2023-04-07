import { writable } from 'svelte/store';
import type { SupabaseType } from '../types/supabase';

export const supabase = writable<null | SupabaseType>(null);
