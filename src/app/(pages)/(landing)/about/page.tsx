import HeroSection from '~/components/landing/hero-section';
import ClientSection from '~/components/landing/client-section';
import { SphereMask } from '~/components/magicui/sphere-mask';
import PricingSection from '~/components/landing/pricing-section';
import CallToActionSection from '~/components/landing/cta-section';
import Particles from '~/components/magicui/particles';
import { generateDynamicMetadata, type MetadataOptions } from '~/lib/metadata';
import { type Metadata } from 'next';

export async function generateMetadata({}): Promise<Metadata> {
	const metadataOptions: MetadataOptions = {
		title: 'About',
		description: 'This is about page',
		openGraph: {
			title: 'About',
			description: 'This is about page',
		},
		twitter: {
			title: 'About',
			description: 'This is about page',
		},
	};

	return await generateDynamicMetadata(metadataOptions);
}

export default async function Home() {
	// const hello = await api.post.hello({ text: 'from tRPC' });

	// void api.post.getLatest.prefetch();

	return (
		// <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
		// 	<ModeToggle />
		// 	<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
		// 		<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
		// 			Create <span className="text-[hsl(280,100%,70%)]">T3</span>{' '}
		// 			App
		// 		</h1>

		// 		<div className="grid grid-cols-2 space-x-4 sm:grid-cols-3 lg:grid-cols-4">
		// 			<Link href="/test/camera">Camera</Link>
		// 			<Link href="/test/notification">Notification</Link>
		// 		</div>

		// 		<div className="flex flex-col items-center gap-2">
		// 			<p className="text-2xl text-white">
		// 				{hello ? hello.greeting : 'Loading tRPC query...'}
		// 			</p>
		// 		</div>

		// 		<Charts />

		// 		<LatestPost />
		// 	</div>
		// </main>
		<>
			<HeroSection />
			<ClientSection />
			<SphereMask />
			<PricingSection />
			<CallToActionSection />
			<Particles
				className="absolute inset-0 -z-10"
				quantity={50}
				ease={70}
				size={0.05}
				staticity={40}
				color={'#ffffff'}
			/>
		</>
	);
}
