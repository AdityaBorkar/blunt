export function usePathname() {
	// TODO: RE-RENDER ON PATHNAME CHANGE
	return typeof window !== 'undefined' ? window.location.pathname : null;
}
