export default function DeploymentsInfoPage(_props) {
	if (typeof WebSocket === 'undefined') {
		throw new Error('missing WebSocket constructor!!');
	}

	return (
		<>
			<p>hello from app/dashboard/deployments/info</p>
		</>
	);
}
