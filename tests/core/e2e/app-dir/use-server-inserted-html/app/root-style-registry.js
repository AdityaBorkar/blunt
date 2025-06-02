'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { createStyleRegistry, StyleRegistry } from 'styled-jsx';

export default function RootStyleRegistry({ children }) {
	const [jsxStyleRegistry] = useState(() => createStyleRegistry());
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
	const styledJsxFlushEffect = () => {
		const styles = jsxStyleRegistry.styles();
		jsxStyleRegistry.flush();
		return <>{styles}</>;
	};
	const styledComponentsFlushEffect = () => {
		const styles = styledComponentsStyleSheet.getStyleElement();
		styledComponentsStyleSheet.instance.clearTag();
		return <>{styles}</>;
	};

	// Allow multiple useServerInsertedHTML
	useServerInsertedHTML(() => {
		return <>{styledJsxFlushEffect()}</>;
	});

	useServerInsertedHTML(() => {
		return <>{styledComponentsFlushEffect()}</>;
	});

	const child = (
		<StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
	);
	if (typeof window === 'undefined') {
		return (
			<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
				{child}
			</StyleSheetManager>
		);
	}
	return child;
}
