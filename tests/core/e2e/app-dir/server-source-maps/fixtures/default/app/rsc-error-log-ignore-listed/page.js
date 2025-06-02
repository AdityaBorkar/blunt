import { runExternal } from 'external-pkg';
import { runExternalSourceMapped } from 'external-pkg/sourcemapped';
import { runInternal } from 'internal-pkg';
import { runInternalIgnored } from 'internal-pkg/ignored';
import { runInternalSourceMapped } from 'internal-pkg/sourcemapped';
import { connection } from 'next/server';

function logError() {
	const error = new Error('Boom');
	console.error(error);
}

export default async function Page() {
	await connection();

	runInternal(function runWithInternal() {
		runInternalSourceMapped(function runWithInternalSourceMapped() {
			runExternal(function runWithExternal() {
				runExternalSourceMapped(function runWithExternalSourceMapped() {
					runInternalIgnored(function runWithInternalIgnored() {
						logError();
					});
				});
			});
		});
	});
	return null;
}
