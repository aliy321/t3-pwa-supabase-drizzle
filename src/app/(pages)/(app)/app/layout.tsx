import React from 'react';
import { Header } from '~/components/app/Header';
import { Footer } from '~/components/app/Footer';

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		// [view-transition-name:toggle]
		<div className="space-y-4">
			<Header />
			<main className="m-8 min-h-svh">{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

export default layout;
