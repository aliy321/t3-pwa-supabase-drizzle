'use client';

import SignIn from '@/components/auth/signin';
import useIsTabActive from '~/hook/isActive';

export default function Page() {
	const isTabActive = useIsTabActive();
	console.log(isTabActive);

	return (
		<div className="flex h-screen items-center justify-center">
			{/* {isTabActive ? <h1>Active</h1> : <h1>Away</h1>} */}
			<SignIn />
		</div>
	);
}
