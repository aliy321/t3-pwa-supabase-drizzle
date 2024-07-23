import Link from 'next/link';

import { LatestPost } from '~/components/post';
import { Charts } from '~/components/Chars';
import { api, HydrateClient } from '~/trpc/server';
import { ModeToggle } from '~/components/theme-switcher';

export default async function Home() {
	const hello = await api.post.hello({ text: 'from tRPC' });

	void api.post.getLatest.prefetch();

	return (
		<HydrateClient>
			<ModeToggle />

			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
						Create{' '}
						<span className="text-[hsl(280,100%,70%)]">T3</span> App
					</h1>

					<div className="grid grid-cols-2 space-x-4 sm:grid-cols-3 lg:grid-cols-4">
						<Link href="/test/camera">Camera</Link>
						<Link href="/test/notification">Notification</Link>
					</div>

					<div className="flex flex-col items-center gap-2">
						<p className="text-2xl text-white">
							{hello ? hello.greeting : 'Loading tRPC query...'}
						</p>
					</div>

					<Charts />

					<LatestPost />
				</div>
			</main>
		</HydrateClient>
	);
}
