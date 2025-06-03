/** biome-ignore-all lint/complexity/noStaticOnlyClass: FIX THIS LATER */
import { color } from 'bun';

/**
 * Custom logger with colored output for better UX
 */
export class Logger {
	private static prefix = '';

	/**
	 * Log info messages in blue
	 */

	// biome-ignore lint/suspicious/noExplicitAny: Logging
	static info(message: string, ...args: any[]) {
		console.log(
			color('blue', 'ansi'),
			`🔥`,
			// ! BUG - https://github.com/oven-sh/bun/issues/17807 - Cannot reset color
			color('lightgray', 'ansi'),
			message,
			...args,
		);
	}

	/**
	 * Log success messages in green
	 */
	// biome-ignore lint/suspicious/noExplicitAny: Logging
	static success(message: string, ...args: any[]) {
		console.log(
			color('green', 'ansi'),
			`✅`,
			// ! BUG - https://github.com/oven-sh/bun/issues/17807 - Cannot reset color
			color('lightgray', 'ansi'),
			message,
			...args,
		);
	}

	/**
	 * Log error messages in red
	 */
	// biome-ignore lint/suspicious/noExplicitAny: Logging
	static error(message: string, ...args: any[]) {
		console.error(
			color('red', 'ansi'),
			`❌`,
			// ! BUG - https://github.com/oven-sh/bun/issues/17807 - Cannot reset color
			color('lightgray', 'ansi'),
			message,
			...args,
		);
	}

	/**
	 * Log warning messages in yellow
	 */
	// biome-ignore lint/suspicious/noExplicitAny: Logging
	static warn(message: string, ...args: any[]) {
		console.warn(
			color('yellow', 'ansi'),
			`⚠️`,
			// ! BUG - https://github.com/oven-sh/bun/issues/17807 - Cannot reset color
			color('lightgray', 'ansi'),
			message,
			...args,
		);
	}

	/**
	 * Log debug messages in gray
	 */
	// biome-ignore lint/suspicious/noExplicitAny: Logging
	static debug(message: string, ...args: any[]) {
		if (process.env.DEBUG) {
			console.log(
				color('gray', 'ansi'),
				`🐛`,
				// ! BUG - https://github.com/oven-sh/bun/issues/17807 - Cannot reset color
				color('lightgray', 'ansi'),
				message,
				...args,
			);
		}
	}
}
