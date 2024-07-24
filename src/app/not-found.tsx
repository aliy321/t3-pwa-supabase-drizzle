'use client';

import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function NotFound() {
	return (
		<main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-lg/tight font-semibold text-primary">404</p>
				<h1 className="text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Button
						size="lg"
						className="rounded-full px-16 py-9 text-lg"
					>
						<Link href="/">Back to Home</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
