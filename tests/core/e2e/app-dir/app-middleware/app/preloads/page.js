import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
	return (
		<>
			<Image alt="favicon" height={16} priority src="/favicon.ico" width={16} />
			<h1 className={inter.className}>Hello World</h1>
		</>
	);
}
