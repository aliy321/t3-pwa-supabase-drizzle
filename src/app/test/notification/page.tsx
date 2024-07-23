import React from 'react';
import SendNotification from '~/components/SendNotification';

const page = () => {
	return (
		<div className="grid min-h-svh place-items-center">
			<div className="space-y-6 text-center">
				<h2>Notification Page</h2>

				<div>
					<SendNotification />
				</div>
			</div>
		</div>
	);
};

export default page;
