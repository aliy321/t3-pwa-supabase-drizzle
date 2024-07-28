import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { protectedPaths, authPaths } from '~/lib/constants';

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value,
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value,
						...options,
					});
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value: '',
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value: '',
						...options,
					});
				},
			},
		}
	);

	const headers = new Headers(request.headers);
	headers.set('x-current-path', request.nextUrl.pathname);
	headers.set('x-full-url', request.nextUrl.toString());
	response.headers.set('x-current-path', request.nextUrl.pathname);
	response.headers.set('x-full-url', request.nextUrl.toString());

	const user = await supabase.auth.getUser();
	const url = new URL(request.url);
	const next = url.searchParams.get('next');
	if (user.data.user?.id) {
		if (authPaths.includes(url.pathname)) {
			return NextResponse.redirect(new URL('/', request.url));
		}
		return response;
	} else {
		if (protectedPaths.includes(url.pathname)) {
			return NextResponse.redirect(
				new URL('/sign-in?next=' + (next ?? url.pathname), request.url)
			);
		}
		return response;
	}
}
