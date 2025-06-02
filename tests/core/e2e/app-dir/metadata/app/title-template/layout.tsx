export default function Layout(props) {
	return props.children;
}

export const metadata = {
	title: {
		default: 'title template layout default',
		template: '%s | Layout',
	},
};
