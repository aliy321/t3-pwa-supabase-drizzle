import React from 'react';
import { ImageResponse } from 'next/og';
import { app_config } from '../config';

export const runtime = 'edge';

// Image metadata
export const alt = app_config.site.title;
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// const getFont = async () => {
// 	const res = await fetch(
// 		new URL('fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf', import.meta.url)
// 	);
// 	return await res.arrayBuffer();
// };

// Image generation
export default async function generateImage() {
	// Font
	// const ibmPlexMono = getFont();

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '8px 48px',
					fontFamily: 'IBM_Plex_Mono',
					textTransform: 'uppercase',
				}}
			>
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						fontSize: 14,
						fontWeight: 400,
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div>OTT</div>
					</div>
					<div
						style={{
							justifySelf: 'center',
							alignSelf: 'center',
							textAlign: 'center',
							fontSize: 32,
							fontWeight: 400,
						}}
					>
						{app_config.name}
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div>where things get developed</div>
						<div>hi@onetaptutor.com</div>
					</div>
				</div>
			</div>
		),
		// ImageResponse options
		{
			...size,
			// fonts: [
			// 	{
			// 		name: 'IBM_Plex_Mono',
			// 		data: await ibmPlexMono,
			// 		style: 'normal',
			// 		weight: 400,
			// 	},
			// ],
		}
	);
}
