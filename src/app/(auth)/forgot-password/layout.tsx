import type { Metadata } from 'next';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

export const metadata: Metadata = {
	title: 'Forgot Password',
};

const layout = ({ children }: Props) => {
	return <>{children}</>;
};

export default layout;
