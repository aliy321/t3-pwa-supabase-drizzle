import React from 'react';
import { Header } from '~/components/app/Header';
import { Footer } from '~/components/app/Footer';

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		<div className="space-y-4">
			<Header />
			<main className="min-h-svh">{children}</main>
			<Footer />
		</div>
	);
};

export default layout;
