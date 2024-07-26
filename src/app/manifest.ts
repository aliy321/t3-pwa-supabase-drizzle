import { app_config } from '../config';

export default function manifest() {
	return {
		name: app_config.name,
		short_name: app_config.name,
		icons: [
			{
				src: '/icons/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icons/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/icons/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
		],
		theme_color: '#FFFFFF',
		background_color: '#FFFFFF',
		start_url: '/',
		display: 'standalone',
		orientation: 'portrait',
	};
}
