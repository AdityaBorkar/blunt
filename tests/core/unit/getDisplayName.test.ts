/* eslint-env jest */

import { getDisplayName } from 'next/dist/shared/lib/utils';
import { Component } from 'react';

describe('getDisplayName', () => {
	it('gets the proper display name of a component', () => {
		class ComponentOne extends Component {
			render() {
				return null;
			}
		}

		class ComponentTwo extends Component {
			static displayName = 'CustomDisplayName';
			render() {
				return null;
			}
		}

		function FunctionalComponent() {
			return null;
		}

		expect(getDisplayName(ComponentOne)).toBe('ComponentOne');
		expect(getDisplayName(ComponentTwo)).toBe('CustomDisplayName');
		expect(getDisplayName(FunctionalComponent)).toBe('FunctionalComponent');
		expect(getDisplayName(() => null)).toBe('Unknown');
		expect(getDisplayName('div' as any)).toBe('div');
	});
});
