'use client';
import { useState, useTransition } from 'react';
import Social from './social';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createSupabaseBrowser } from '~/utils/supabase/client';
import { cn } from '~/lib/utils';
import { app_config } from '~/config';
import Logo from '@/components/Logo';

import TextureCard, {
	TextureCardContent,
	TextureCardDescription,
	TextureCardHeader,
	TextureCardTitle,
	TextureSeparator,
} from '@/components/ui/texture-card';
import { TextureButton } from '../ui/texture-button';
import { DevLoginButtons } from '~/app/(pages)/(auth)/_component/DevLoginButtons';
import { Toggle } from '../ui/toggle';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'next-view-transitions';

const FormSchema = z.object({
	email: z.string().email({ message: 'Invalid Email Address' }),
	password: z.string().min(6, { message: 'Password is too short' }),
});

export default function SignIn() {
	const queryString =
		typeof window !== 'undefined' ? window?.location.search : '';
	const urlParams = new URLSearchParams(queryString);

	// Get the value of the 'next' parameter
	const next = urlParams.get('next');

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
						Sign in to {app_config.name}
					</TextureCardTitle>
					<TextureCardDescription>
						Welcome back! Please sign in to continue.
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

					<SignInForm redirectTo={next ?? '/'} />
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

export function SignInForm({ redirectTo }: { redirectTo: string }) {
	const [passwordReveal, setPasswordReveal] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const supabase = createSupabaseBrowser();
		if (!isPending) {
			startTransition(async () => {
				const { error } = await supabase.auth.signInWithPassword({
					email: data.email,
					password: data.password,
				});
				if (error) {
					toast.error(error.message);
				} else {
					router.push(redirectTo);
				}
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="test-sm font-semibold">
								Email Address
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Email..."
									type="email"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-semibold">
								Password
							</FormLabel>
							<FormControl>
								<div className="relative flex items-center gap-2">
									<Input
										type={
											passwordReveal ? 'text' : 'password'
										}
										placeholder="Password..."
										{...field}
									/>
									<Toggle
										variant="outline"
										aria-label="Toggle password"
										onClick={() =>
											setPasswordReveal(!passwordReveal)
										}
									>
										{passwordReveal ? (
											<Eye className="size-4" />
										) : (
											<EyeOff className="size-4" />
										)}
									</Toggle>
								</div>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<TextureButton
					type="submit"
					variant="primary"
					disabled={isPending}
					// className="flex h-8 w-full items-center gap-2 bg-indigo-500 text-white transition-all hover:bg-indigo-600"
				>
					<AiOutlineLoading3Quarters
						className={cn(
							!isPending ? 'hidden' : 'block animate-spin'
						)}
					/>
					Continue
				</TextureButton>
			</form>
			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{' '}
				<Link
					href={
						redirectTo ? `/sign-up?next=` + redirectTo : '/sign-up'
					}
					className="underline"
				>
					Sign up
				</Link>
			</div>
		</Form>
	);
}
