'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RiArrowRightSFill, RiArrowDropLeftFill } from 'react-icons/ri';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SiMinutemailer } from 'react-icons/si';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { Link } from 'next-view-transitions';
import { cn } from '~/lib/utils';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { verifyOtp } from '~/app/(pages)/(auth)/actions/auth';
import { TextureButton } from '../ui/texture-button';
import { Toggle } from '../ui/toggle';
import { Eye, EyeOff } from 'lucide-react';

const FormSchema = z
	.object({
		email: z.string().email({ message: 'Invalid Email Address' }),
		password: z.string().min(6, { message: 'Password is too short' }),
		'confirm-pass': z.string().min(6, { message: 'Password is too short' }),
	})
	.refine(
		data => {
			if (data['confirm-pass'] !== data.password) {
				// console.log('running');
				return false;
			} else {
				return true;
			}
		},
		{ message: "Password does't match", path: ['confirm-pass'] }
	);

export default function SignUp({ redirectTo }: { redirectTo: string }) {
	const queryString =
		typeof window !== 'undefined' ? window.location.search : '';
	const urlParams = new URLSearchParams(queryString);

	const verify = urlParams.get('verify');
	const existEmail = urlParams.get('email');

	const [passwordReveal, setPasswordReveal] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(verify === 'true');
	const [verifyStatus, setVerifyStatus] = useState<string>('');
	const [isPending, startTransition] = useTransition();
	const [isSendAgain, startSendAgain] = useTransition();
	const [otpValue, setOtpValue] = useState('');
	const pathname = usePathname();
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
			'confirm-pass': '',
		},
	});

	const postEmail = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		};
		// Send the POST request
		const res = await fetch('/api/signup', requestOptions);
		const json = (await res.json()) as {
			error: { code: string; message: string };
		};
		return json;
	};

	const sendVerifyEmail = async (data: z.infer<typeof FormSchema>) => {
		const json = (await postEmail({
			email: data.email,
			password: data.password,
		})) as { error: { code: string; message: string } };

		if (!json.error) {
			router.replace(
				(pathname || '/') +
					'?verify=true&email=' +
					form.getValues('email')
			);
			setIsConfirmed(true);
		} else {
			if (json.error.code) {
				toast.error(json.error.code);
			} else if (json.error.message) {
				toast.error(json.error.message);
			}
		}
	};

	const inputOptClass = cn({
		' border-green-500': verifyStatus === 'success',
		' border-red-500': verifyStatus === 'failed',
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!isPending) {
			startTransition(async () => {
				await sendVerifyEmail(data);
			});
		}
	}

	return (
		<div
			className={cn(
				`items-center space-x-5 overflow-hidden whitespace-nowrap align-top`,
				isPending ? 'animate-pulse' : ''
			)}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn(
						`inline-block w-full transform space-y-3 p-1 transition-all`,
						{
							'-translate-x-[110%]': isConfirmed,
						}
					)}
				>
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
										placeholder="Email.."
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
												passwordReveal
													? 'text'
													: 'password'
											}
											placeholder="Password..."
											{...field}
										/>
										<Toggle
											variant="outline"
											aria-label="Toggle password"
											onClick={() =>
												setPasswordReveal(
													!passwordReveal
												)
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
					<FormField
						control={form.control}
						name="confirm-pass"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold">
									Confirm Password
								</FormLabel>
								<FormControl>
									<div className="relative flex items-center gap-2">
										<Input
											type={
												passwordReveal
													? 'text'
													: 'password'
											}
											placeholder="Password..."
											{...field}
										/>
										<Toggle
											variant="outline"
											aria-label="Toggle password"
											onClick={() =>
												setPasswordReveal(
													!passwordReveal
												)
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
					>
						<AiOutlineLoading3Quarters
							className={cn(
								!isPending ? 'hidden' : 'block animate-spin'
							)}
						/>
						Continue
						<RiArrowRightSFill className="size-4" />
					</TextureButton>

					<div className="mt-4 text-center text-sm">
						Have an account?{' '}
						<Link
							href={
								redirectTo
									? `/sign-in?next=` + redirectTo
									: '/sign-in'
							}
							className="underline"
						>
							Sign In
						</Link>
					</div>
				</form>
			</Form>

			{/* verify email */}
			<div
				className={cn(
					`inline-block h-80 w-full transform space-y-3 text-wrap align-top transition-all`,
					isConfirmed ? '-translate-x-[105%]' : 'translate-x-0'
				)}
			>
				<div className="flex h-full flex-col items-center justify-center space-y-5">
					<SiMinutemailer className="size-8" />

					<h1 className="text-center text-2xl font-semibold text-primary">
						Verify email
					</h1>
					<p className="flex flex-col text-center text-sm">
						<span>{' A verification code has been sent to '}</span>
						<span className="font-bold underline underline-offset-2">
							{verify === 'true'
								? existEmail
								: form.getValues('email')}
						</span>
					</p>

					<InputOTP
						pattern={REGEXP_ONLY_DIGITS}
						id="input-otp"
						maxLength={6}
						value={otpValue}
						onChange={async value => {
							setOtpValue(value);

							if (value.length === 6) {
								document.getElementById('input-otp')?.blur();
								const res = await verifyOtp({
									email: form.getValues('email'),
									otp: value,
									type: 'email',
								});
								const { error } = JSON.parse(res) as {
									error: unknown;
								};

								if (error) {
									setVerifyStatus('failed');
									setOtpValue('');
									toast.error(
										'Invalid OTP, please try again'
									);
									// set focus back to the first slot
									document
										.getElementById('input-otp')
										?.focus();
								} else {
									setVerifyStatus('success');
									router.push(redirectTo);
								}
							}
						}}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} className={inputOptClass} />
							<InputOTPSlot index={1} className={inputOptClass} />
							<InputOTPSlot index={2} className={inputOptClass} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={3} className={inputOptClass} />
							<InputOTPSlot
								index={4}
								className={cn(inputOptClass)}
							/>
							<InputOTPSlot
								index={5}
								className={cn(inputOptClass)}
							/>
						</InputOTPGroup>
					</InputOTP>

					<div className="flex gap-2 text-sm">
						<p>{"Didn't work?"} </p>
						<span
							className="flex cursor-pointer items-center gap-2 text-primary transition-all hover:underline"
							onClick={async () => {
								setVerifyStatus('');

								if (!isSendAgain) {
									startSendAgain(async () => {
										// Resend the OTP without resetting the form or changing state
										const json = await postEmail({
											email: form.getValues('email'),
											password:
												form.getValues('password'),
										});

										if (json.error) {
											toast.error(
												'Failed to resend email'
											);
										} else {
											toast.success(
												'A new code has been sent to your email.'
											);
										}
									});
								}
							}}
						>
							<AiOutlineLoading3Quarters
								className={`${
									!isSendAgain
										? 'hidden'
										: 'block animate-spin'
								}`}
							/>
							Send me another code.
						</span>
					</div>
					<TextureButton
						type="submit"
						variant="primary"
						onClick={async () => {
							form.setValue('email', '');
							form.setValue('password', '');
							form.setValue('confirm-pass', '');

							setVerifyStatus('');
							setIsConfirmed(false);
						}}
					>
						<RiArrowDropLeftFill className="size-5" />
						Change Email
					</TextureButton>
				</div>
			</div>
		</div>
	);
}
