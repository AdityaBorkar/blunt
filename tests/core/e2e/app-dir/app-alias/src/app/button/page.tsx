import React from 'react';

import Button from '@/ui/button';

export default function page() {
	if ('useState' in React) {
		throw new Error('React is not resolved correctly.');
	}

	return <Button>click</Button>;
}
