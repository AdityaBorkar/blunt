export default function Layout(props) {
	return props.children;
}

export const metadata = {
	title: {
		default: 'extra layout default',
		template: '%s | Extra Layout',
	},
};
