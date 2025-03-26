export * from './core/dev';

// * Register CLI commands
// dev
// start
// build

// Blunt.js is a feature-limited version of Next.js that runs on Bun and Biome.
// It is a work in progress and is not production ready.
// Next.js is bringing some edge and new features to both - React and the Web Platform. We shall not be incorporating these features in Blunt.js until we find them stable. You can still test them as "experimental" tags.

// * Explore:
// TODO: Install biome.json by default
// use() hook works OOTB
// metadata? sitemaps?
// headers, cookies, redirects, middlewares
// React Server Components
// SSR, SSG, ISR, getStaticProps replaced generateStaticSlugs, getServerSideProps, SPA, MPA
// public folder
// manifest.json.ts
// userAgent, earlyHints
// Production Builds - serverless + server
// websockets?
// Automatic route prefetching
// Typesafe JSON-first Search Params state management APIs
// Path and Search Parameter Schema Validation
// Search Param Navigation APIs
// Custom Search Param parser/serializer support
// Search param middleware
// Route matching/loading middleware
// Server Functions / RPCs
// scrollRestoration (opt-in redirect)
// Generate https://nextjs.org/docs/app/api-reference/config/next-config-js/generateEtags
// Set custom headers: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
// Auto-removal of trailing slashes
// Implement ESLINT in Biome = https://nextjs.org/docs/app/api-reference/config/eslint

// trie-based router
// Define what server actions must return along with use with middlewares.
// Generate API documentation from the routes from the TS.
// export const schema = ... // it will auto-validate the request as per schema.
// Works with scalar.com OOTB.
// Plugin to start Swagger UI for API docs.
// 🛠️ Advanced Middleware: More built-in middleware for common use cases:
// CORS handling
// Rate limiting
// Request logging
// Security headers

// Following things are not yet supported, but PLANNED:
// Image Optimization: https://bun.sh/docs/api/html-rewriter
// https://nextjs.org/docs/app/api-reference/config/next-config-js/images
// Font Optimization: https://bun.sh/docs/api/html-rewriter
// Script Optimization: https://bun.sh/docs/api/html-rewriter
// Partial Prerendering
// https://bun.sh/docs/bundler/plugins
// https://bun.sh/docs/api/ffi
// Cache Support. Everything is dynamic by default.
// React Compiler
// Metadata Viewer, Astro-Nextjs Toolbar, Unlighthouse
// Eject functionality
// Next.js does not automatically block cross-origin requests during development, but will block by default in a future major version of Next.js to prevent unauthorized requesting of internal assets/endpoints that are available in development mode.

// Following features are NOT PLANNED:
// Parallel and Intercepted Routes
// Draft Mode, Multi-Zone Deployments

// Focus to beat @mapl/web
// Results:
// 1000 routes:
// + @mapl/app: 67ms
// + @mapl/web: 39ms
// 10 routes, 1 middlewares:
// + @mapl/app: 40ms
// + @mapl/web: 2ms

// Bundle size:
// @mapl/app: 14kB
// @mapl/web: 5.8kB

// SSE and Web sockets
// Pass schema in Form Component and then use it as TS Reference everywhere
// React Query alternative with an inbuilt cache() feature.
// TRPC and NextSafeActions alternative with middleware.
// Actions can be exported through a single variable.
// Note - Middleware only apply to ROUTES and PAGES and not server actions

// packageHints flag
// Run depcheck to show unused packages.
// Use taze to update the packages or show available updates.
// Also use knip.dev under the hood
