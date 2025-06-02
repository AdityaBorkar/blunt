import { A } from './a';
import { P } from './p';

export const FootNotes = ({ children }) => (
	<div className="before:content[''] text-base before:m-auto before:my-10 before:block before:w-[200px] before:border-gray-300 before:border-t dark:before:border-[#444]">
		{children}
	</div>
);

export const Ref = ({ id }) => (
	<a
		className="relative top-[-5px] text-xs no-underline"
		href={`#f${id}`}
		id={`s${id}`}
	>
		[{id}]
	</a>
);

export const FootNote = ({ id, children }) => (
	<P>
		{id}.{' '}
		<A className="no-underline" href={`#s${id}`} id={`f${id}`}>
			^
		</A>{' '}
		{children}
	</P>
);
