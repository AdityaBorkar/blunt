import ClientDetector from './client-detector';
import Detector from './detector';

export default function Page() {
	return (
		<div>
			Server: <Detector />
			<br />
			Client: <ClientDetector />
			<br />
		</div>
	);
}
