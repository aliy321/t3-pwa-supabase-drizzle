'use client';
import React from 'react';
import SignUp from './signup';
import Social from './social';
import { useSearchParams } from 'next/navigation';
import TextureCard, {
	TextureCardContent,
	TextureCardDescription,
	TextureCardHeader,
	TextureCardTitle,
	TextureSeparator,
} from '@/components/ui/texture-card';
import Logo from '../Logo';
import { DevLoginButtons } from '~/app/(pages)/(auth)/_component/DevLoginButtons';
import { Link } from 'next-view-transitions';

export default function Register() {
	const queryString =
		typeof window !== 'undefined' ? window?.location.search : '';
	const urlParams = new URLSearchParams(queryString);

	// Get the value of the 'next' parameter
	const next = urlParams.get('next');
	const verify = urlParams.get('verify');

	return (
		<div className="flex flex-col gap-6">
			<TextureCard className="">
				<TextureCardHeader className="space-y-3 text-center">
					<div className="space-y-3 text-center">
						<div className="flex items-center justify-center">
							<Link href="/" className="cursor-pointer">
								<Logo />
							</Link>
						</div>
					</div>
					<TextureCardTitle className="text-xl">
						Create Account
					</TextureCardTitle>
					<TextureCardDescription>
						Welcome! Please fill in the details to get started.
					</TextureCardDescription>
				</TextureCardHeader>
				<TextureCardContent className="space-y-4">
					<Social redirectTo={next ?? '/'} />

					<div className="flex items-center gap-4">
						<div className="w-full">
							<TextureSeparator />
						</div>
						<div className="text-sm">or</div>
						<div className="w-full">
							<TextureSeparator />
						</div>
					</div>

					<SignUp redirectTo={next ?? '/'} />
				</TextureCardContent>
			</TextureCard>

			{process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && (
				<TextureCard className="mx-auto w-full text-center">
					<TextureCardHeader>
						<TextureCardTitle className="text-xl">
							Dev Tool
						</TextureCardTitle>
						<TextureCardDescription>
							Quick login for development
						</TextureCardDescription>
					</TextureCardHeader>
					<TextureCardContent>
						<DevLoginButtons />
					</TextureCardContent>
				</TextureCard>
			)}
		</div>
	);
}
