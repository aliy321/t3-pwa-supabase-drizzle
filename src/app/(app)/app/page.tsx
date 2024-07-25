import { redirect } from 'next/navigation';
import { CardCarousel } from '~/components/app/CardCarousel';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { Separator } from '~/components/ui/separator';
import { createClient } from '~/lib/supabase/server';

export default async function PrivatePage() {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	console.log('app page:', data, error);

	if (error ?? !data?.user) {
		redirect('/sign-in');
	}

	// return <p>Hello {data?.user?.email}</p>;
	return (
		<div className="mx-8 space-y-6">
			<ScrollArea className="w-full whitespace-nowrap rounded-md">
				<div className="flex w-max space-x-4 pb-4">
					{Array.from({ length: 12 }).map((_, index) => (
						<div
							key={index}
							className="mb-4 max-w-52 space-y-4 lg:max-w-sm"
						>
							<CardCarousel />
							<div>
								<h5 className="text-md font-bold">
									Johor Bahru, Malaysia
								</h5>
								<p className="text-base">24 kilometres away</p>
								<span>4–9 Aug</span>
								<div className="flex space-x-2">
									<p>$65 SGD</p> <span>/ night</span>
								</div>
							</div>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>

			<Separator />

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6">
				{Array.from({ length: 12 }).map((_, index) => (
					<div key={index} className="space-y-4">
						<CardCarousel />
						<div>
							<h5 className="text-md font-bold">
								Johor Bahru, Malaysia
							</h5>
							<p className="text-base">24 kilometres away</p>
							<span>4–9 Aug</span>
							<div className="flex space-x-2">
								<p>$65 SGD</p> <span>/ night</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}