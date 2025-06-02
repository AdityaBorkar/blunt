export default function Home() {
	return (
		<div
			id="hello"
			sx={{
				color: 'primary',
				fontSize: 4, // picks up value from `theme.fontSizes[4]`
				fontWeight: 'bold', // picks up value from `theme.colors.primary`
			}}
		>
			Hello
		</div>
	);
}
