'use client';
import React, { useState, useTransition } from 'react';
import Social from './social';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
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
import Link from 'next/link';
import { app_config } from '~/config';
import Logo from '@/components/Logo';

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
		<div className="w-full rounded-md border shadow dark:border-zinc-800 sm:w-[26rem] sm:p-5">
			<div className="space-y-5 p-5">
				<div className="space-y-3 text-center">
					<div className="flex items-center justify-center">
						<Logo />
					</div>
					<h1 className="font-bold">Sign in to {app_config.name}</h1>
					<p className="text-sm">
						Welcome back! Please sign in to continue
					</p>
				</div>
				<Social redirectTo={next ?? '/'} />
				<div className="flex items-center gap-5">
					<div className="h-[0.5px] w-full flex-1 bg-zinc-400 dark:bg-zinc-800"></div>
					<div className="text-sm">or</div>
					<div className="h-[0.5px] w-full flex-1 bg-zinc-400 dark:bg-zinc-800"></div>
				</div>
				<SignInForm redirectTo={next ?? '/'} />
			</div>
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
									className="h-8"
									placeholder="example@gmail.com"
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
								<div className="relative">
									<Input
										className="h-8"
										type={
											passwordReveal ? 'text' : 'password'
										}
										{...field}
									/>
									<div
										className="group absolute right-2 top-[30%] cursor-pointer"
										onClick={() =>
											setPasswordReveal(!passwordReveal)
										}
									>
										{passwordReveal ? (
											<FaRegEye className="transition-all group-hover:scale-105" />
										) : (
											<FaRegEyeSlash className="transition-all group-hover:scale-105" />
										)}
									</div>
								</div>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="flex h-8 w-full items-center gap-2 bg-indigo-500 text-white transition-all hover:bg-indigo-600"
				>
					<AiOutlineLoading3Quarters
						className={cn(
							!isPending ? 'hidden' : 'block animate-spin'
						)}
					/>
					Continue
				</Button>
			</form>
			<div className="text-center text-sm">
				<h1>
					Doest not have account yet?{' '}
					<Link
						href={
							redirectTo
								? `/register?next=` + redirectTo
								: '/register'
						}
						className="text-blue-400"
					>
						Register
					</Link>
				</h1>
			</div>
		</Form>
	);
}
