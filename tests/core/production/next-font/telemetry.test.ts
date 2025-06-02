import { join } from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { findAllTelemetryEvents } from 'next-test-utils';

const mockedGoogleFontResponses = require.resolve(
	'./google-font-mocked-responses.js',
);

// Turbopack intentionally does not support these events

(process.env.TURBOPACK ? describe.skip : describe)(
	'next/font used telemetry',
	() => {
		let next: NextInstance;

		beforeAll(async () => {
			next = await createNext({
				env: {
					NEXT_FONT_GOOGLE_MOCKED_RESPONSES: mockedGoogleFontResponses,
					NEXT_TELEMETRY_DEBUG: '1',
				},
				files: {
					pages: new FileRef(join(__dirname, 'telemetry/pages')),
				},
			});
		});
		afterAll(() => next.destroy());

		it('should send next/font/google and next/font/local usage event', async () => {
			const events = findAllTelemetryEvents(
				next.cliOutput,
				'NEXT_BUILD_FEATURE_USAGE',
			);
			expect(events).toContainEqual({
				featureName: 'next/font/google',
				invocationCount: 1,
			});
			expect(events).toContainEqual({
				featureName: 'next/font/local',
				invocationCount: 1,
			});
		});
	},
);

// Turbopack intentionally does not support these events

(process.env.TURBOPACK ? describe.skip : describe)(
	'next/font unused telemetry',
	() => {
		let next: NextInstance;

		beforeAll(async () => {
			next = await createNext({
				env: {
					NEXT_FONT_GOOGLE_MOCKED_RESPONSES: mockedGoogleFontResponses,
					NEXT_TELEMETRY_DEBUG: '1',
				},
				files: {
					pages: new FileRef(join(__dirname, 'telemetry/pages-unused')),
				},
			});
		});
		afterAll(() => next.destroy());

		it('should not send next/font/google and next/font/local usage event', async () => {
			const events = findAllTelemetryEvents(
				next.cliOutput,
				'NEXT_BUILD_FEATURE_USAGE',
			);
			expect(events).toContainEqual({
				featureName: 'next/font/google',
				invocationCount: 0,
			});
			expect(events).toContainEqual({
				featureName: 'next/font/local',
				invocationCount: 0,
			});
		});
	},
);
