// https://<your-site.com>/api/revalidate?tag=collection&secret=<token>

import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get('secret');
	const tag = request.nextUrl.searchParams.get('tag');

	if (secret !== 'test') {
		return NextResponse.json(
			{ message: 'Invalid secret' },
			{ status: 401 }
		);
	}

	if (!tag) {
		return NextResponse.json(
			{ message: 'Missing tag param' },
			{ status: 400 }
		);
	}

	console.log('revalidate:', tag);
	revalidateTag(tag);
	revalidatePath('/', 'layout');

	return NextResponse.json({ revalidated: true, now: Date.now() });
}
