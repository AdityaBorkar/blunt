import { StreamingText } from '../../streaming-text';

export default function Page() {
	return (
		<div id="nav">
			<StreamingText dynamic="Dynamic in nav" static="Static in nav" />
		</div>
	);
}
