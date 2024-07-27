import { type NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		// Extract priceId from the query parameters
		const { searchParams } = new URL(request.url);
		const priceId = searchParams.get('priceId');

		if (!priceId) {
			return NextResponse.json(
				{ error: 'priceId is required' },
				{ status: 400 }
			);
		}

		const price = await stripe.prices.retrieve(priceId);
		const amount = price.unit_amount
			? (price.unit_amount / 100).toFixed(2)
			: '0.00'; // Format amount
		console.log('Price:', price);

		return NextResponse.json({ amount });
	} catch (error) {
		console.error('Internal Error:', error);
		return NextResponse.json(
			{ error: `Internal Server Error: ${(error as Error).toString()}` },
			{ status: 500 }
		);
	}
}
