import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// export function getBaseUrl() {
// 	// If it's client-side, return an empty string for relative URLs
// 	if (typeof window !== 'undefined') {
// 		return '';
// 	}

// 	// Use the NEXT_PUBLIC_SITE_URL if it's defined in the environment, otherwise default to localhost
// 	return process.env.NEXT_PUBLIC_SITE_URL
// 		? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
// 		: `http://localhost:3000`;
// }

export function getBaseUrl() {
	if (typeof window !== 'undefined') {
		// In the browser, use the location object
		return window.location.origin;
	}

	// On the server, use environment variables or a default value
	const protocol = process.env.VERCEL_URL ? 'https' : 'http';
	const host = process.env.VERCEL_URL
		? process.env.VERCEL_URL // Automatically set by Vercel during deployment
		: (process.env.NEXT_PUBLIC_BASE_URL ?? 'localhost:3000'); // Default to localhost for dev

	return `${protocol}://${host}`;
}
