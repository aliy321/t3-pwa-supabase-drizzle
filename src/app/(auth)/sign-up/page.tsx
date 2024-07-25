'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '~/utils/supabase/client';
import TextureCard, {
	TextureCardContent,
	TextureCardDescription,
	TextureCardHeader,
	TextureCardTitle,
	TextureSeparator,
} from '@/components/ui/texture-card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { TextureButton } from '~/components/ui/texture-button';
import { Eye, EyeOff, Loader } from 'lucide-react';
import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { DevLoginButtons } from '../_component/DevLoginButtons';
import SignInWithProviderButtons from '../_component/SignInWithProviderButtons';

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export default function LoginPage() {
	const [loading, setLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const supabase = createSupabaseBrowser();
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setLoading(true);

		// toast('You submitted the following values:', {
		// 	description: (
		// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
		// 			<code className="text-white">
		// 				{JSON.stringify(data, null, 2)}
		// 			</code>
		// 		</pre>
		// 	),
		// });

		const { email, password } = data;

		if (email && password) {
			const { error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				toast.error(error.message);
			}

			toast.success('Sign Up successful');
			router.push('/app');
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto space-y-6">
			<TextureCard className="mx-auto max-w-sm">
				<TextureCardHeader>
					<TextureCardTitle className="text-xl">
						Sign Up
					</TextureCardTitle>
					<TextureCardDescription>
						Enter your information to sign up
					</TextureCardDescription>
				</TextureCardHeader>
				<TextureCardContent className="space-y-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Email.."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative flex items-center gap-2">
												<Input
													placeholder="Password.."
													type={
														showPassword
															? 'text'
															: 'password'
													}
													{...field}
												/>
												<Toggle
													variant="outline"
													aria-label="Toggle password"
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
												>
													{showPassword ? (
														<Eye className="size-4" />
													) : (
														<EyeOff className="size-4" />
													)}
												</Toggle>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<TextureButton type="submit" disabled={loading}>
								{loading ? (
									<Loader className="size-4 animate-spin" />
								) : null}
								{loading ? 'Loading...' : 'Sign Up'}
							</TextureButton>
						</form>
					</Form>

					<TextureSeparator />

					<SignInWithProviderButtons />

					<div className="mt-4 text-center text-sm">
						Have an account?{' '}
						<Link href="/sign-in" className="underline">
							Sign In
						</Link>
					</div>
				</TextureCardContent>
			</TextureCard>

			{process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && (
				<TextureCard className="mx-auto max-w-sm">
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
