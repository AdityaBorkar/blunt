Priority 1:

- Make a list of current feature-set I want.
- Implement them.
- Create a production-ready build.
- Deploy to a server.


Use AI extensively to get things done.
- Establish a Test Bench.
File Handling:
- from Route.ts, export GET(), POST()
- export defaults from route.get.ts / route.post.ts
- Supports both -
hello/world.tsx
hello/world/page.tsx

- Form a CI/CD Pipeline and Publishing Workflow.
- Publish version 0.0.1 for Bluntjs on JSR and NPM.

<Link prefetch="true | false | "smart"" preventScrollReset replace
  to={{
    pathname: "/some/path",
    search: "?query=string",
    hash: "#hash",
  }}
  href=""
/>
Images, Cache, cookies, headers
Parallel Routes
TODO: Support SSG
  SSG.dynamicParams (Run code if route is not present or show a 404?)
  generatePaths() {}
  TODO: regeneratePaths({ path: 'SSG-PATH' })
  TODO: return { fallback: "Run this function", paths: [], regenerateInterval: 50  }
  TODO: View Transitions & Router

- Using JSX for Head, Meta, OpenGraph tags. Config Options to include a pattern. If using config, make sure to use a VS Code Extension to show the "Title" as a comment on the line.

TODO: HTTP Headers, Head Tag Metadata, OpenGraph, Config, redirect: { code: 307,path: "/some/path" }
TODO: Instrumentation Hooks

- 🛠️ Advanced Middleware: More built-in middleware for common use cases:
    - CORS handling
    - Rate limiting
    - Request logging
    - Security headers
- Middleware Hooks:
  - onRequest (default)
  - onBeforeResponse
  - onAfterResponse
- Session Management - Ref: SolidStart, Astro
- Service Workers
- Build Summary
  - Output unused packages in the Build Summary.
  - Also use knip.dev under the hood
- SSE and Web sockets
  - Type Safe Websockets
- Cache Support. Everything is dynamic by default.
  - React Query alternative with an inbuilt cache() feature.
- Metadata Viewer, Astro-Nextjs Toolbar, Unlighthouse
- Automatic API Documentation:
    - Generate API documentation from the routes from the TS.
    - Works with scalar.com OOTB.
    - Plugin to start Swagger UI for API docs.
metadata? sitemaps?
headers, cookies, redirects, middlewares
SSR, SSG, ISR, getStaticProps replaced generateStaticSlugs, getServerSideProps, SPA, MPA
public folder

Server:
- userAgent
- earlyHints
- Generate https://nextjs.org/docs/app/api-reference/config/next-config-js/generateEtags
- Set custom headers: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers

Search Params:
- Typesafe, JSON-first
- Validation using nuqs
- Support in <Link> and "navigation" functions

use() hook works OOTB
React Server Components
Automatic prefetching
scrollRestoration (opt-in redirect)
Auto-removal of trailing slashes

- Next.js does not automatically block cross-origin requests during development, but will block by default in a future major version of Next.js to - prevent unauthorized requesting of internal assets/endpoints that are available in development mode.
- Note - Middleware only apply to ROUTES and PAGES and not server actions. By order, middlewares always run first and then the react tree follows.


## Things that shall not be supported in Version 1

- React Compiler
- React Server Actions
- Partial Pre-rendering
- useLinkStatus
- Fonts
- MDX
- Custom Server
- Draft Mode
- Multi-Zone Deployments
- Internationalization


## Brainstorming Required

- Intercepted Routes. Think about intercepted routes. For modal and instagram image displaying.
- TODO: 'global-layout' as a file
- TODO: 'global-error' as a file
- Special Files - forbidden, unauthorized - DO NOT SUPPORT, instead make something common.
- Error File exports 2 functions - ClientError ServerError (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors)
- Biome
    - Implement ESLINT in Biome = https://nextjs.org/docs/app/api-reference/config/eslint
- Create Blunt App
  - Install biome.json by default
- Shall we implement Deno server?
- Study Convex, Clerk
- How to implement Code-splitting?
- GraphQL: https://docs.solidjs.com/solid-start/building-your-application/api-routes#exposing-a-graphql-api


## Performance

Keep 1000 routes loading time less than 150ms.

Focus to beat @mapl/web
Results:
1000 routes:
+ @mapl/app: 67ms
+ @mapl/web: 39ms
10 routes, 1 middlewares:
+ @mapl/app: 40ms
+ @mapl/web: 2ms

Bundle size:
@mapl/app: 14kB
@mapl/web: 5.8kB
