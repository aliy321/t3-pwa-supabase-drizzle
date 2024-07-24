import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getBaseUrl() {
	// If it's client-side, return an empty string for relative URLs
	if (typeof window !== 'undefined') {
		return '';
	}

	// Use the NEXT_PUBLIC_SITE_URL if it's defined in the environment, otherwise default to localhost
	return process.env.NEXT_PUBLIC_SITE_URL
		? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
		: `http://localhost:3000`;
}
