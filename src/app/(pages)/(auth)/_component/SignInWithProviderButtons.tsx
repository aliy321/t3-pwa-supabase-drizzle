import { Loader } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { Icons } from '~/components/icons';
import { TextureButton } from '~/components/ui/texture-button';
import { getBaseUrl } from '~/lib/utils';
import { createSupabaseBrowser } from '~/utils/supabase/client';

const SignInWithProviderButtons = () => {
	const [loading, setLoading] = React.useState(false);
	const supabase = createSupabaseBrowser();

	const handleSignIn = async () => {
		setLoading(true);

		const { error, data } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${getBaseUrl()}/auth/callback`, // Adjust to your callback URL
			},
		});

		console.log(data);

		if (error) {
			toast.error(`Sign in failed: ${error.message}`);
		}
	};

	return (
		<TextureButton type="button" onClick={handleSignIn} disabled={loading}>
			{loading ? <Loader className="size-4 animate-spin" /> : null}
			{loading ? (
				'Loading...'
			) : (
				<>
					<Icons.google className="size-4" /> Google
				</>
			)}
		</TextureButton>
	);
};

export default SignInWithProviderButtons;
