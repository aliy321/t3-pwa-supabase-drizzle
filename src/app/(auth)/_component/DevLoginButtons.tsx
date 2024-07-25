'use client';

import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { createSupabaseBrowser } from '~/utils/supabase/client';

const testAccounts = [
	{ email: 'example@email.com', password: 'example-password' },
];

export const DevLoginButtons = () => {
	const supabase = createSupabaseBrowser();
	const router = useRouter();

	const login = async (account: { email: string; password: string }) => {
		console.log('login', account);

		try {
			const { data, error } =
				await supabase.auth.signInWithPassword(account);

			if (error) {
				throw error;
			}

			if (!data) {
				throw new Error('No data returned from login');
			}

			router.push('/app');
			console.log('login success', data);
		} catch (error) {
			console.error('login error', error);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			{testAccounts.map((account, index) => (
				<div
					key={index}
					className="flex flex-col items-start gap-4 text-white"
				>
					<Button
						variant={'secondary'}
						className="w-full"
						onClick={async () => {
							void login(account);
						}}
					>
						Login: {account.email}
					</Button>
					<Button
						variant={'secondary'}
						className="w-full"
						onClick={async () => {
							void supabase.auth.signUp(account);
						}}
					>
						Register: {account.email}
					</Button>
				</div>
			))}
		</div>
	);
};
