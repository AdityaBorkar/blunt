import React from 'react';

export default class ErrorBoundary extends React.Component<
	{ children: React.ReactNode; fallback: React.ReactNode },
	{ hasError: boolean; error?: Error }
> {
	constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { error, hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error boundary caught an error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}
