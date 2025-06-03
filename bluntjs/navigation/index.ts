export { Link as default } from './components/Link';

// export { getPathname } from './functions/getPathname';
// export { notFound } from './hooks/notFound';
// export { redirect } from './hooks/redirect';
// export { throwError } from './hooks/throwError';
// export { useParams } from './hooks/useParams';
// export { useRouter } from './hooks/useRouter';
// export { useSearchParams } from './hooks/useSearchParams';

export { usePathname } from './hooks/usePathname';

// import { useSelectedLayoutSegments } from './hooks/useSelectedLayoutSegments';

// export { useSelectedLayoutSegments };

// TODO: Support for View Transitions API
// TODO: Integrate with Bun's Client Side Router
// router.set() function HARD NAVIGATION
// router.push() function SHALLOW NAVIGATION
// router.redirect() function with various status codes
// router.slugParams, router.searchParams
// router.pathName

// Route parameter types
// type RouteParams = Record<string, string>;
// type RouteWithParams = {
// 	pattern: RegExp;
// 	paramNames: string[];
// 	handler: RouteFiles;
// 	originalPath: string;
// };
