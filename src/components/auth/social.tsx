'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
// import { IoLogoGithub } from 'react-icons/io5';
import { createSupabaseBrowser } from '~/utils/supabase/client';
import { getBaseUrl } from '~/lib/utils';
import { TextureButton } from '../ui/texture-button';
import { IoLogoGithub } from 'react-icons/io';

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
			<TextureButton
				variant="secondary"
				onClick={() => loginWithProvider('google')}
			>
				<FcGoogle className="mr-2" /> Google
			</TextureButton>
			{/* <TextureButton
				variant="secondary"
				onClick={() => loginWithProvider('github')}
			>
				<IoLogoGithub className="mr-2" /> Github
			</TextureButton> */}
		</div>
	);
}
