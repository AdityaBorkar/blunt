#!/usr/bin/env bun

import { cli } from './bin';

// Auto-run if this file is executed directly
if (import.meta.main) {
	cli();
}
