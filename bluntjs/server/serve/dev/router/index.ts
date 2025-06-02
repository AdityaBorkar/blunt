import { fileBasedRouter } from './file-based';

export const router = {
	codeBased: () => {
		console.log('Work in Progress. Not ready for development / production.');
		return '';
	},
	fileBased: fileBasedRouter,
};
