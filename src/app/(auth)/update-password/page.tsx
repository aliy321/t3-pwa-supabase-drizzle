'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createSupabaseBrowser } from '~/utils/supabase/client';
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
import { TextureButton } from '~/components/ui/texture-button';
import React, { useEffect, useState } from 'react';
import TextureCard, {
	TextureCardContent,
	TextureCardDescription,
	TextureCardHeader,
	TextureCardTitle,
} from '~/components/ui/texture-card';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Toggle } from '~/components/ui/toggle';

const FormSchema = z.object({
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function UpdatePasswordPage() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const supabase = createSupabaseBrowser();
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: '',
		},
	});

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'PASSWORD_RECOVERY') {
				toast('Enter your new password below.');
			}
		});
	}, [supabase.auth]);

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setLoading(true);
		const { password } = data;

		const { error } = await supabase.auth.updateUser({ password });

		if (error) {
			toast.error(error.message);
		} else {
			router.push('/app');
			toast.success('Password updated successfully!');
		}

		setLoading(false);
	}

	return (
		<div className="mx-auto space-y-6">
			<TextureCard className="mx-auto max-w-sm">
				<TextureCardHeader>
					<TextureCardTitle className="text-xl">
						Update Password
					</TextureCardTitle>
					<TextureCardDescription>
						Enter a new password
					</TextureCardDescription>
				</TextureCardHeader>
				<TextureCardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
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
								{loading ? 'Loading...' : 'Update Password'}
							</TextureButton>
						</form>
					</Form>
				</TextureCardContent>
			</TextureCard>
		</div>
	);
}
