import { useState } from 'react';

export default function DevAssistToolbar() {
	const position = 'bottom-center';
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	return (
		<details>
			<summary>LOGO</summary>
			<div title="Rendering">
				<div>Framework: REACT / ...</div>
				<div>Render Mode: STATIC / DYNAMIC</div>
				<div>Build-Time Rendering: YES / NO</div>
				<div>Server-Side Rendering: YES / NO</div>
				<div>Streaming: YES / NO</div>
				<div>Client-Side Rendering: YES / NO</div>

				<div>Files Run: [file1, file2, file3]</div>
			</div>
			<div title="accessibility">
				<div>Accessibility Issues</div>
			</div>
			<div title="react-scan">
				<div>React Scan Results</div>
				{/* Interaction Timing */}
				{/* Layout Shift */}
			</div>
			<div title="performance">
				<div>Performance Issues</div>
			</div>
			<div title="seo">
				<div>SEO Issues</div>
			</div>
			{/* Feature Flags */}
			{/* OpenGraph / React Metadata (use a pre-existing package) */}
			{/* TODO: Integrate more with DevTools. Make people use DevTools and Debugging more. */}
		</details>
	);
}
