import { type NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
	try {
		const { email }: { email: string } = (await await request.json()) as {
			email: string;
		};
		console.log('Email:', email);

		// Assuming you are creating a subscription for the user
		const customer = await stripe.customers.create({
			email: email,
			// other customer details
		});

		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: [
				{ price: 'price_1Ph7yTDYbV1AFKOvI0vkDMJy' }, // replace with actual price ID
			],
			payment_behavior: 'default_incomplete',
			expand: ['latest_invoice.payment_intent'],
		});

		if (
			subscription.latest_invoice &&
			typeof subscription.latest_invoice !== 'string'
		) {
			const paymentIntent = subscription.latest_invoice
				.payment_intent as Stripe.PaymentIntent;
			if (paymentIntent) {
				return NextResponse.json({
					clientSecret: paymentIntent.client_secret,
				});
			}
		}

		throw new Error('Unable to retrieve client secret.');
	} catch (error) {
		console.error('Internal Error:', error);
		return NextResponse.json(
			{ error: `Internal Server Error: ${(error as Error).toString()}` },
			{ status: 500 }
		);
	}
}
