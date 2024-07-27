import { type NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
	try {
		const { amount }: { amount: number } = (await await request.json()) as {
			amount: number;
		};
		console.log('Amount:', amount);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: 'sgd',
			automatic_payment_methods: { enabled: true },
		});

		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error('Internal Error:', error);
		// Handle other errors (e.g., network issues, parsing errors)
		return NextResponse.json(
			{ error: `Internal Server Error: ${(error as Error).toString()}` },
			{ status: 500 }
		);
	}
}
