import { A as a } from 'app/(post)/components/a';
import { Blockquote as blockquote } from 'app/(post)/components/blockquote';
import { Callout } from 'app/(post)/components/callout';
import { Caption } from 'app/(post)/components/caption';
import { FootNote, FootNotes, Ref } from 'app/(post)/components/footnotes';
import { H1 as h1 } from 'app/(post)/components/h1';
import { H2 as h2 } from 'app/(post)/components/h2';
import { H3 as h3 } from 'app/(post)/components/h3';
import { HR as hr } from 'app/(post)/components/hr';
import { Image } from 'app/(post)/components/image';
import { LI as li } from 'app/(post)/components/li';
import { OL as ol } from 'app/(post)/components/ol';
import { P as p } from 'app/(post)/components/p';
import { Snippet } from 'app/(post)/components/snippet';
import { Tweet } from 'app/(post)/components/tweet';
import { UL as ul } from 'app/(post)/components/ul';

export function useMDXComponents(components: {
	[component: string]: React.ComponentType;
}) {
	return {
		...components,
		a,
		blockquote,
		Callout,
		Caption,
		FootNote,
		FootNotes,
		h1,
		h2,
		h3,
		hr,
		Image,
		img: Image,
		li,
		ol,
		p,
		pre: Snippet,
		Ref,
		Snippet,
		Tweet,
		ul,
	};
}
