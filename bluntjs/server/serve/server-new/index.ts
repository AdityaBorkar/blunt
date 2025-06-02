export { FrameworkConfig } from './config';
export { enableHTTPS } from './https';
export { FileBasedRouter } from './server';

// <Link prefetch="true | false | "smart"" preventScrollReset replace
//   to={{
//     pathname: "/some/path",
//     search: "?query=string",
//     hash: "#hash",
//   }}
//   href=""
// />

// ! Fonts, Images, Cache, cookies, headers
// export const config = { prerender: false }
// TODO: HTTP Headers, Head Tag Metadata, OpenGraph, Config, redirect: { code: 307,path: "/some/path" }
// TODO: Instrumentation Hooks
// TODO: MDX Support
// TODO: Parallel Routes
// TODO: 'global-layout' as a file
// TODO: 'global-error' as a file
// TODO: Support SSG
// SSG. dynamicParams (Run code if route is not present or show a 404?)
// generatePaths() {}
// TODO: regeneratePaths({ path: 'SSG-PATH' })
// TODO: return { fallback: "Run this function", paths: [], regenerateInterval: 50  }
// TODO: Multiple Zones
// ANALYZE=true to export Bundle Analysis & Page Performance Analysis
// CLI Installation
// TODO: Type Safe Websockets
// TODO: View Transitions & Router
