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
Server Functions / RPCs
scrollRestoration (opt-in redirect)
Generate https://nextjs.org/docs/app/api-reference/config/next-config-js/generateEtags
Set custom headers: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
Auto-removal of trailing slashes

trie-based router
Define what server actions must return along with use with middlewares.
export const schema = ... // it will auto-validate the request as per schema.

SSE and Web sockets
Pass schema in Form Component and then use it as TS Reference everywhere
React Query alternative with an inbuilt cache() feature.
TRPC and NextSafeActions alternative with middleware.
Actions can be exported through a single variable.
Note - Middleware only apply to ROUTES and PAGES and not server actions

Output unused packages in the Build Summary.
Also use knip.dev under the hood

- 🛠️ Advanced Middleware: More built-in middleware for common use cases:
    - CORS handling
    - Rate limiting
    - Request logging
    - Security headers
- Image Optimization: https://bun.sh/docs/api/html-rewriter & https://nextjs.org/docs/app/api-reference/config/next-config-js/images
- Font Optimization: https://bun.sh/docs/api/html-rewriter
- Script Optimization: https://bun.sh/docs/api/html-rewriter
- Partial Prerendering
- https://bun.sh/docs/bundler/plugins
- https://bun.sh/docs/api/ffi
- Automatic API Documentation:
    - Generate API documentation from the routes from the TS.
    - Works with scalar.com OOTB.
    - Plugin to start Swagger UI for API docs.
- Cache Support. Everything is dynamic by default.
- React Compiler
- Metadata Viewer, Astro-Nextjs Toolbar, Unlighthouse
- Next.js does not automatically block cross-origin requests during development, but will block by default in a future major version of Next.js to - prevent unauthorized requesting of internal assets/endpoints that are available in development mode.


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
