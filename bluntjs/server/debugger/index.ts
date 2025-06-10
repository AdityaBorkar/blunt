import React from 'react';
import { renderToString } from 'react-dom/server';

import { DebuggerApp } from './components/DebuggerApp';

export function handleBluntDebugger(pathname: string) {
	const path = pathname.replace('/blunt', '') || '/';
	const html = renderToString(
		React.createElement(DebuggerApp, { currentPath: path }),
	);

	return new Response(
		`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Blunt.js Debugger</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<script>
		tailwind.config = {
			darkMode: 'class',
			theme: {
				extend: {
					colors: {
						dark: {
							50: '#f9fafb',
							100: '#f3f4f6',
							200: '#e5e7eb',
							300: '#d1d5db',
							400: '#9ca3af',
							500: '#6b7280',
							600: '#4b5563',
							700: '#374151',
							800: '#1f2937',
							900: '#111827',
							950: '#0a0a0a'
						}
					}
				}
			}
		}
	</script>
	<style>
		body { margin: 0; padding: 0; }
		* { box-sizing: border-box; }
	</style>
</head>
<body class="bg-dark-950 text-white min-h-screen">
	<div id="root">${html}</div>
</body>
</html>`,
		{
			headers: {
				'Content-Type': 'text/html',
			},
		},
	);
}
