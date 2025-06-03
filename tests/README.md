
<Link prefetch="true | false | "smart"" preventScrollReset replace
  to={{
    pathname: "/some/path",
    search: "?query=string",
    hash: "#hash",
  }}
  href=""
/>

| Server Actions | ❌ |
| Draft Mode | ❌ |
| Multi-Zone Deployments | ❌ |
| React Compiler | ❌ |
| Partial Prerendering | ❌ |
| MDX | ❌ |
| useLinkStatus| x |
! Fonts, Images, Cache, cookies, headers
export const config = { prerender: false }
TODO: HTTP Headers, Head Tag Metadata, OpenGraph, Config, redirect: { code: 307,path: "/some/path" }
TODO: Instrumentation Hooks
TODO: Parallel Routes
TODO: 'global-layout' as a file
TODO: 'global-error' as a file
TODO: Support SSG
SSG. dynamicParams (Run code if route is not present or show a 404?)
generatePaths() {}
TODO: regeneratePaths({ path: 'SSG-PATH' })
TODO: return { fallback: "Run this function", paths: [], regenerateInterval: 50  }
TODO: View Transitions & Router
TODO: Figure out something for instrumentation
useLinkStatus


Special Files - forbidden, unauthorized - DO NOT SUPPORT, instead make something common.
Error File exports 2 functions - ClientError ServerError (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors)
---


Switch to test driven development for long-term maintenance.
Complete writing tests first.

* Explore:
TODO: Install biome.json by default
use() hook works OOTB
metadata? sitemaps?
headers, cookies, redirects, middlewares
React Server Components
SSR, SSG, ISR, getStaticProps replaced generateStaticSlugs, getServerSideProps, SPA, MPA
public folder
manifest.json.ts
userAgent, earlyHints
Automatic route prefetching
Typesafe JSON-first Search Params state management APIs
Path and Search Parameter Schema Validation
Search Param Navigation APIs
Custom Search Param parser/serializer support
Search param middleware
Route matching/loading middleware
scrollRestoration (opt-in redirect)
Generate https://nextjs.org/docs/app/api-reference/config/next-config-js/generateEtags
Set custom headers: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers

- 🛠️ Advanced Middleware: More built-in middleware for common use cases:
    - CORS handling
    - Rate limiting
    - Request logging
    - Security headers
- React Server Actions
  - ORPC, TRPC and NextSafeActions alternative with middleware.
  - Server Functions / RPCs
  - Actions can be exported through a single variable.
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

- Next.js does not automatically block cross-origin requests during development, but will block by default in a future major version of Next.js to - prevent unauthorized requesting of internal assets/endpoints that are available in development mode.
- Note - Middleware only apply to ROUTES and PAGES and not server actions. By order, middlewares always run first and then the react tree follows.
- Auto-removal of trailing slashes

---

## Performance

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

---

## Plugins

- Biome
    - Implement ESLINT in Biome = https://nextjs.org/docs/app/api-reference/config/eslint
