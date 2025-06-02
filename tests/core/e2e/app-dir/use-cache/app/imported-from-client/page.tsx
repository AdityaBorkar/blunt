'use client';

import { Form } from '../form';
import { bar, baz, foo } from './cached';

export default function Page() {
	return <Form bar={bar} baz={baz} foo={foo} />;
}
