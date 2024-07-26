'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createSupabaseBrowser } from '~/utils/supabase/client';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { TextureButton } from '~/components/ui/texture-button';
import React from 'react';
import { getBaseUrl } from '~/lib/utils';
import { Loader } from 'lucide-react';
import TextureCard, {
	TextureCardContent,
	TextureCardDescription,
	TextureCardHeader,
	TextureCardTitle,
} from '~/components/ui/texture-card';

const FormSchema = z.object({
	email: z.string().email(),
});

export default function ForgotPasswordPage() {
	const [loading, setLoading] = React.useState(false);
	const supabase = createSupabaseBrowser();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setLoading(true);
		const { email } = data;

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${getBaseUrl()}/update-password`,
		});

		if (error) {
			toast.error(error.message);
		} else {
			toast.success('Check your email for a password reset link.');
		}
		setLoading(false);
	}

	return (
		<div className="mx-auto space-y-6">
			<TextureCard className="mx-auto max-w-sm">
				<TextureCardHeader>
					<TextureCardTitle className="text-xl">
						Reset Password
					</TextureCardTitle>
					<TextureCardDescription>
						Enter your email to reset your password
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<Input
											placeholder="Email.."
											{...field}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<TextureButton type="submit">
								{loading ? (
									<Loader className="size-4 animate-spin" />
								) : null}
								{loading ? 'Loading...' : 'Reset Password'}
							</TextureButton>
						</form>
					</Form>
				</TextureCardContent>
			</TextureCard>
		</div>
	);
}
