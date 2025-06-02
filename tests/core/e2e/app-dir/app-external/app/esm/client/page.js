'use client';

import { packageEntry as compatPackageEntry } from 'cjs-esm-compat';
import { packageName } from 'cjs-lib';
import { useValue, version } from 'esm-with-react';
import nestedImportExportDefaultValue from 'nested-import-export-default';
import React from 'react';

export default function Index() {
	const value = useValue();
	return (
		<div>
			<h2>{`App React Version: ${React.version}`}</h2>
			<h2>{`External React Version: ${version}`}</h2>
			<h2>{`Test: ${value}`}</h2>
			<h2>{`CJS-ESM Compat package: ${compatPackageEntry}`}</h2>
			<h2>{`CJS package: ${packageName}`}</h2>
			<h2>{`Nested imports: ${nestedImportExportDefaultValue}`}</h2>
		</div>
	);
}
