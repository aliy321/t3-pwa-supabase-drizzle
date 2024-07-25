import React from 'react';

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return <main className="min-h-svh">{children}</main>;
};

export default layout;
