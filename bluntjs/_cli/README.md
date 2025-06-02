Note - This file is AI generated. Manual Review is pending.

# Blunt CLI

Command-line interface for the Blunt.js framework - a performance-first React framework built on Bun.

## Installation

The CLI is included with the Blunt framework. In a Blunt project, you can run:

```bash
bun run blunt [command]
```

## Commands

### `dev` - Development Server

Start the development server with hot reloading:

```bash
bun run blunt dev [options]
```

**Options:**
- `-p, --port <port>` - Port to run the server on (default: 3000)
- `-H, --host <host>` - Hostname to bind the server to (default: localhost)
- `--https` - Enable HTTPS with auto-generated certificates

**Example:**
```bash
bun run blunt dev -p 8080 --host 0.0.0.0 --https
```

### `start` - Production Server

Start the production server from build directory:

```bash
bun run blunt start [options]
```

**Options:**
- `-p, --port <port>` - Port to run the server on (default: 3000)
- `-H, --host <host>` - Hostname to bind the server to (default: localhost)

**Example:**
```bash
bun run blunt start -p 80 --host 0.0.0.0
```

### `build` - Production Build

Generate production build in build directory:

```bash
bun run blunt build [options]
```

**Options:**
- `-o, --out-dir <dir>` - Output directory for the build (default: .build)
- `--analyze` - Analyze the bundle size

**Example:**
```bash
bun run blunt build --out-dir dist --analyze
```

### `eject` - Eject Configuration

Eject the configuration files (irreversible):

```bash
bun run blunt eject [options]
```

**Options:**
- `-f, --force` - Force eject even if config exists

**Example:**
```bash
bun run blunt eject --force
```

## Features

- 🎨 **Colored output** for better user experience
- 🔥 **Custom logger** with emoji indicators
- ⚡ **Performance-first** using Bun runtime
- 🛡️ **Type-safe** with comprehensive TypeScript support
- 🎯 **Zero-config** with sensible defaults
- 🔧 **Configurable** through `blunt.config.ts`

## Logger

The CLI includes a custom logger class that provides colored output:

- 🔵 **Info** messages in blue
- ✅ **Success** messages in green
- ❌ **Error** messages in red
- ⚠️ **Warning** messages in yellow
- 🐛 **Debug** messages in gray (only shown when `DEBUG=true`)

## Project Validation

The CLI automatically validates that you're in a valid Blunt project by checking for:
- `package.json`
- `src/app` directory
- `blunt.config.ts` or `blunt.config.js` (optional)

## Configuration

The CLI supports configuration through `blunt.config.ts` or `blunt.config.js`:

```typescript
import type { BluntConfig } from 'blunt/types';

export default {
  app: {
    dir: 'src/app',
    publicDir: 'public'
  },
  server: {
    port: 3000,
    hostname: 'localhost'
  },
  build: {
    outDir: '.build',
    minify: true,
    sourcemap: true
  }
} satisfies BluntConfig;
```