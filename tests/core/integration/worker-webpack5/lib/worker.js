import faker from 'faker';

import { Expensive } from './sharedCode';

// Ensure a large libraries is added so that splitChunks would trigger if enabled.
console.log(faker);

Expensive();
self.postMessage(true);
