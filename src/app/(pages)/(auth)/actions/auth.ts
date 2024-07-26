'use server';

import { createSupabaseServer } from '~/utils/supabase/server';

export const verifyOtp = async (data: {
	email: string;
	otp: string;
	type: string;
}) => {
	const supabase = createSupabaseServer();

	const res = await supabase.auth.verifyOtp({
		email: data.email,
		token: data.otp,
		type: 'email',
	});
	return JSON.stringify(res);
};
