import React from 'react';
import LandingProviders from '~/components/Providers/LandingProviders';

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return <LandingProviders>{children}</LandingProviders>;
};

export default layout;
