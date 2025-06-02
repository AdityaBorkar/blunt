import ClientComp from './client-comp-client';

export default function DashboardPage(_props) {
	if (typeof WebSocket === 'undefined') {
		throw new Error('missing WebSocket constructor!!');
	}
	return (
		<>
			<p className="p" id="from-dashboard">
				hello from app/dashboard
			</p>
			<p className="bold">BOLD</p>
			<p className="green">this is green</p>
			<ClientComp />
		</>
	);
}

export const runtime = 'edge';
