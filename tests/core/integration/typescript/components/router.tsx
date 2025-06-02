/* eslint-disable no-unused-expressions, @typescript-eslint/no-unused-expressions */

import Router, { withRouter } from 'next/router';
import React from 'react';

export default withRouter(({ router }) => {
	React.useEffect(() => {
		Router.events.on('routeChangeComplete', () => {});
		//@ts-expect-error
		Router.events.on('event', () => {});
		Router.prefetch('/page');
		Router.push;
		Router.back;
		Router.reload;

		router.events.on('routeChangeComplete', () => {});
		//@ts-expect-error
		router.events.on('event', () => {});
		router.prefetch('/page');
		router.push;
		router.back;
		router.reload;
	});
	return <>{router.pathname}</>;
});
