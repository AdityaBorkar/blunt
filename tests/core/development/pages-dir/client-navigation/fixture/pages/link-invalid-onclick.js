import Link from 'next/link';
import { useState } from 'react';

export default function Page(_props) {
	const [errorCount, setErrorCount] = useState(0);

	function Button(props) {
		return (
			<a
				href={props.href}
				id="custom-button"
				onClick={(e) => {
					e.preventDefault();
					try {
						props.onClick();
					} catch (err) {
						setErrorCount(errorCount + 1);
						console.error(err);
					}
				}}
			>
				{props.href}
			</a>
		);
	}

	return (
		<>
			<p id="errors">{errorCount}</p>
			<Link href="/nav" legacyBehavior passHref>
				<Button />
			</Link>
		</>
	);
}
