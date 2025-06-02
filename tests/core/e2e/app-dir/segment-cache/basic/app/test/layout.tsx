import { StreamingText } from '../streaming-text';

export default function Layout({
	nav,
	children,
}: {
	nav: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<>
			<StreamingText dynamic="Dynamic in layout" static="Static in layout" />
			<div>{nav}</div>
			<div>{children}</div>
		</>
	);
}
