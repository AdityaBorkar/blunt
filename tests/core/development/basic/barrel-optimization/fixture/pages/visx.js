import { Gradient } from '@visx/visx';

export default function Page() {
	return (
		<svg height={400} width={400}>
			<Gradient.GradientPinkBlue from="red" id="g" to="blue" />
			<rect fill="url(#g)" height={400} width={400} />
		</svg>
	);
}
