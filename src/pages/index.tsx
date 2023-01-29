import Layout from '@/layouts/Layout';

export default function Home() {
	return (
		<Layout title='Homepage'>
			<h1 className='display-1'>Home</h1>
			<p className='lead'>
				This page does not require authentication, so it won&apos;t redirect to the
				login page if you are not signed in.
			</p>
		</Layout>
	);
}
