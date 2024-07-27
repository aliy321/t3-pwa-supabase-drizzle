'use client';

import { useEffect, useState } from 'react';
import { Link } from 'next-view-transitions';
import { Skeleton } from '~/components/ui/skeleton';

export default function PaymentSuccess({
	searchParams: { amount, type, priceId },
}: {
	searchParams: { amount: string; type: string; priceId: string };
}) {
	const [displayAmount, setDisplayAmount] = useState(amount);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (type === 'subscription' && priceId) {
			setLoading(true);

			// Fetch the amount associated with the priceId from your backend or Stripe API
			fetch(`/api/get-price-amount?priceId=${priceId}`)
				.then(res => res.json())
				.then((data: { amount: string }) => {
					setDisplayAmount(data.amount);
					setLoading(false);
				})
				.catch(error => {
					console.error('Error fetching price amount:', error);
				});

			return () => {
				setLoading(false);
			};
		}
	}, [type, priceId]);

	return (
		<main className="m-10 mx-auto max-w-6xl rounded-md border bg-gradient-to-tr from-blue-500 to-purple-500 p-10 text-center text-white">
			<div className="mb-10">
				<h1 className="mb-2 text-4xl font-extrabold">Thank you!</h1>
				{type === 'subscription' ? (
					<>
						<h2 className="text-2xl">
							Your subscription was successful
						</h2>
						<div className="mx-auto mt-2 flex max-w-md flex-col items-center whitespace-normal text-balance text-lg">
							<span>
								You have successfully subscribed to our service.
								The amount charged will be
							</span>
							<span className="font-bold">
								{loading ? (
									<Skeleton className="h-6 w-20" />
								) : (
									<>${displayAmount}</>
								)}
							</span>
							<span>per billing period.</span>
						</div>
					</>
				) : (
					<>
						<h2 className="text-2xl">You successfully sent</h2>
						<div className="mt-5 rounded-md bg-white p-2 text-4xl font-bold text-purple-500">
							${displayAmount}
						</div>
					</>
				)}
			</div>

			<Link href="/test/payment">Back to payment screen</Link>
		</main>
	);
}
