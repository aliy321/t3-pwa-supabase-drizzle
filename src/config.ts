import { getBaseUrl } from './lib/utils';

const APP_NAME = 'One Tap Tutor';

export const app_config = {
	name: APP_NAME,
	site: {
		title: 'Fulfilment is only one tap away.',
		description:
			'Every lesson you deliver is an opportunity to change lives. With One Tap Tutor, make meaningful impacts, one student at a time.',
		title_template: `%s | ${APP_NAME}`,
		url: getBaseUrl(),
	},
} as const;

export type AppConfig = typeof app_config;
