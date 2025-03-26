import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	meals: z.object({
		breakfast: z.string().min(1),
		lunch: z.string().min(1),
		dinner: z.string().min(1),
	}),
	lunch: z.object({
		database: z.string().min(1),
		version: z.string().min(1),
	}),
});
