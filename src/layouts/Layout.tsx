import Head from 'next/head';
import Header from '@/components/Header';

export default function Layout({
	children,
	title
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<main className='container-xxl'>{children}</main>
		</>
	);
}
