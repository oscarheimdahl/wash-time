// src/routes/+layout.server.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { supabase, session } = await parent();
	const { data, error } = await supabase.from('washers').select('*');

	return {
		data,
		error
	};
};
