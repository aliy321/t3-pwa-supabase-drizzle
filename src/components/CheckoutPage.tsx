'use client';

import React, { useEffect, useState } from 'react';
import {
	useStripe,
	useElements,
	PaymentElement,
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '~/lib/convertToSubcurrency';
import { getBaseUrl } from '~/lib/utils';

const CheckoutPage = ({
	amount,
	email,
	isSubscription,
	priceId,
}: {
	amount?: number;
	email?: string;
	isSubscription?: boolean;
	priceId?: string;
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState<string>();
	const [clientSecret, setClientSecret] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (amount && !isSubscription) {
			// Payment intent for one-time payment
			void fetch('/api/create-payment-intent', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
			})
				.then(res => res.json())
				.then((data: { clientSecret: string }) =>
					setClientSecret(data.clientSecret)
				);
		}
	}, [amount, isSubscription]);

	useEffect(() => {
		if (email && isSubscription && priceId) {
			// Subscription intent
			void fetch('/api/create-subscription-intent', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, priceId }),
			})
				.then(res => res.json())
				.then((data: { clientSecret: string }) =>
					setClientSecret(data.clientSecret)
				);
		}
	}, [email, isSubscription, priceId]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${getBaseUrl()}/payment-success?amount=${amount}&type=${isSubscription ? 'subscription' : 'payment'}&priceId=${priceId}`,
			},
		});

		if (error) {
			setErrorMessage(error.message);
		} else {
			// Success handling
		}

		setLoading(false);
	};

	if (!clientSecret || !stripe || !elements) {
		return (
			<div className="flex items-center justify-center">
				<div
					className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
					role="status"
				>
					<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
						Loading...
					</span>
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="rounded-md bg-white p-2">
			{clientSecret && (
				<PaymentElement
					options={{
						layout: 'accordion',
					}}
				/>
			)}

			{errorMessage && <div>{errorMessage}</div>}

			<button
				disabled={!stripe || loading}
				className="mt-2 w-full rounded-md bg-black p-5 font-bold text-white disabled:animate-pulse disabled:opacity-50"
			>
				{!loading
					? isSubscription
						? 'Subscribe Now'
						: `Pay $${amount}`
					: 'Processing...'}
			</button>
		</form>
	);
};

export default CheckoutPage;
