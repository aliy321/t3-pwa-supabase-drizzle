'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
// import { IoLogoGithub } from 'react-icons/io5';
import { createSupabaseBrowser } from '~/utils/supabase/client';
import { getBaseUrl } from '~/lib/utils';

export default function Social({ redirectTo }: { redirectTo: string }) {
	const loginWithProvider = async (provider: 'github' | 'google') => {
		const supbase = createSupabaseBrowser();

		// Note: for OAuth, you need to set the redirect URL in the provider settings
		await supbase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: getBaseUrl() + `/auth/callback?next=` + redirectTo,
			},
		});
	};

	return (
		<div className="flex w-full gap-2">
			{/* <Button
				className="flex h-8 w-full items-center gap-5"
				variant="outline"
				onClick={() => loginWithProvider('github')}
			>
				<IoLogoGithub />
				Github
			</Button> */}
			<Button
				className="flex h-8 w-full items-center gap-2"
				variant="outline"
				onClick={() => loginWithProvider('google')}
			>
				<FcGoogle />
				Google
			</Button>
		</div>
	);
}
