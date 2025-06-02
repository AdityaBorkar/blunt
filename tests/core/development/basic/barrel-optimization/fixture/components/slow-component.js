'use client';

import { RadioGroup, Tab, Transition } from '@headlessui/react';
import {
	BackpackIcon,
	CircleSlashed,
	Code,
	CurlyBraces,
	createLucideIcon,
	Edit,
	Edit2,
	IceCream,
	LucideActivity,
	LucideEdit3,
	LucideSortDesc,
	Menu,
	Slash,
	SortAsc,
	SortAscIcon,
	SquareGantt,
	SquareKanban,
	SquareKanbanDashed,
	Stars,
	TextSelection,
	VerifiedIcon,
} from 'lucide-react';

export function Comp() {
	// eslint-disable-next-line no-undef
	globalThis.__noop__ = createLucideIcon;
	return (
		<>
			<IceCream />
			<BackpackIcon />
			<LucideActivity />
			<Code />
			<Menu />
			<SortAsc />
			<SortAscIcon />
			<LucideSortDesc />
			<VerifiedIcon />
			<CurlyBraces />
			<Slash />
			<SquareGantt />
			<CircleSlashed />
			<SquareKanban />
			<SquareKanbanDashed />
			<Stars />
			<Edit />
			<Edit2 />
			<LucideEdit3 />
			<TextSelection />
			<Tab.Group>
				<Tab.List>
					<Tab>Tab 1</Tab>
					<Tab>Tab 2</Tab>
					<Tab>Tab 3</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>Content 1</Tab.Panel>
					<Tab.Panel>Content 2</Tab.Panel>
					<Tab.Panel>Content 3</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
			<RadioGroup>
				<RadioGroup.Label>Plan</RadioGroup.Label>
				<RadioGroup.Option value="startup">
					{({ checked }) => <span>{checked ? 'checked' : ''} Startup</span>}
				</RadioGroup.Option>
				<RadioGroup.Option value="business">
					{({ checked }) => <span>{checked ? 'checked' : ''} Business</span>}
				</RadioGroup.Option>
			</RadioGroup>
			<Transition show>I will fade in and out</Transition>
		</>
	);
}
