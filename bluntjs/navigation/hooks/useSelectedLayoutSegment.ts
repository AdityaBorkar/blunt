import { createContext, use } from 'react';

type NavigationContextType = {};

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useSelectedLayoutSegment() {
	const context = use(NavigationContext);
	// TODO: GET URL REGEX
	// TODO: Process REGEX
	return null;
}
