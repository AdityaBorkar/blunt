import Router from 'next/router';
import React from 'react';

export default class extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {};
	}

	componentDidMount() {
		const asPath = Router.asPath;
		this.setState({ asPath });
	}

	render() {
		return <div className="as-path-content">{this.state.asPath}</div>;
	}
}
