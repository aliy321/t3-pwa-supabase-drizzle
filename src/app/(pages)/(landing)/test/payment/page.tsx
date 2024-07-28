'use client';

import React from 'react';
import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '~/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { type Appearance, loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const page = () => {
	const amount = 49.99;

	const appearance: Appearance = {
		theme: 'stripe',
		variables: {
			// colorPrimary: '#7abdff',
			// colorBackground: '#bd5656',
			// colorText: '#3a46cf',
		},
	} as const;

	return (
		<main className="m-10 mx-auto max-w-6xl rounded-md border bg-gradient-to-tr from-blue-500 to-purple-500 p-10 text-center text-white">
			<div className="mb-10">
				<h1 className="mb-2 text-4xl font-extrabold">Payment</h1>
				<h2 className="text-2xl">
					has requested
					<span className="font-bold"> ${amount}</span>
				</h2>
			</div>

			<h2>one time payment</h2>
			<Elements
				stripe={stripePromise}
				options={{
					mode: 'payment',
					amount: convertToSubcurrency(amount),
					currency: 'sgd',
					appearance: appearance,
				}}
			>
				<CheckoutPage amount={amount} />
			</Elements>

			<h2>subscription</h2>
			<Elements
				stripe={stripePromise}
				options={{
					mode: 'subscription',
					amount: convertToSubcurrency(amount),
					currency: 'sgd',
					appearance: appearance,
				}}
			>
				<CheckoutPage
					email="aliyakhbar@gmail.com"
					isSubscription={true}
					priceId="price_1Ph7yTDYbV1AFKOvI0vkDMJy"
				/>
			</Elements>
		</main>
	);
};

export default page;
