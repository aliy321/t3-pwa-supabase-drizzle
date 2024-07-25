'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './theme-provider';
import { isIOS } from 'react-device-detect';
import { getItemWithExpiry, setItemWithExpiry } from '~/lib/locale-storage';
import ScreenSize from '../Responsive';
import PWAPrompt from 'react-ios-pwa-prompt';
import { Toaster } from 'sonner';

type Props = {
	children: React.ReactNode;
};

const RootProviders = ({ children }: Props) => {
	const [shouldShowPWAPrompt, setShouldShowPWAPrompt] = useState(false);

	useEffect(() => {
		const beforeInstallPromptHandler = (event: Event) => {
			event.preventDefault();
			setShouldShowPWAPrompt(true);
		};

		// Check if the prompt has been shown before
		const hasPromptBeenShown =
			getItemWithExpiry('pwaPromptShown') === 'true';

		if (!hasPromptBeenShown) {
			window.addEventListener(
				'beforeinstallprompt',
				beforeInstallPromptHandler
			);

			const isInStandaloneMode =
				'standalone' in window.navigator && window.navigator.standalone;

			if (isIOS && !isInStandaloneMode) {
				setShouldShowPWAPrompt(true);
			} else if (isInStandaloneMode) {
				setShouldShowPWAPrompt(false);
			}
		}

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				beforeInstallPromptHandler
			);
		};
	}, []);

	const handlePromptClose = () => {
		setShouldShowPWAPrompt(false);
		// Set the expiry to 7 days
		setItemWithExpiry('pwaPromptShown', 'true', 7 * 24 * 60 * 60 * 1000);
	};

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
			<PWAPrompt
				isShown={shouldShowPWAPrompt}
				onClose={handlePromptClose}
				appIconPath="/icons/android-chrome-192x192.png"
			/>
			<ScreenSize />
			<Toaster position="bottom-right" richColors closeButton />
		</ThemeProvider>
	);
};

export default RootProviders;
