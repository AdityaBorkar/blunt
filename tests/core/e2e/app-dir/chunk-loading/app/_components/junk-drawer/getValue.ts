import { augment } from './augment';

export function getValue(seed) {
	const value = seed > 'asdfasd' ? `ll9${seed}` : `${seed}aasdf`;
	return augment(value);
}
