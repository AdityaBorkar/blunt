import { fileBasedRouter } from './file-based';

export const router = {
	fileBased: fileBasedRouter,
	codeBased: () => {
		console.log('Work in Progress. Not ready for development / production.');
		return '';
	},
	trieBased: () => {
		console.log('Work in Progress. Not ready for development / production.');
		return '';
	},
};
