import { fileBasedRouter } from './file-based';
import { trieBasedRouter } from './trie-based';

export const router = {
	fileBased: fileBasedRouter,
	codeBased: () => {
		console.log('Work in Progress. Not ready for development / production.');
		return '';
	},
};
