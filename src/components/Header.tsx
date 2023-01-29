import Link from 'next/link';

export default function Header() {
	const email = '';
	const signOut = () => {};

	return (
		<header>
			<nav className='navbar navbar-expand navbar-dark bg-dark container-xxl'>
				<div className='container-fluid'>
					<a className='navbar-brand' href='#'>
						Website
					</a>

					<div className='collapse navbar-collapse'>
						<ul className='navbar-nav me-auto'>
							<li className='nav-item'>
								<Link className='nav-link active' aria-current='page' href='/'>
									Home
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' href='/'>
									Link
								</Link>
							</li>
						</ul>
						<div className='d-flex align-items-center'>
							{email ? (
								<>
									<p>Signed in as {email}</p>
									<div>
										<button
											type='button'
											className='btn btn-light'
											onClick={() => {
												signOut();
											}}
										>
											Sign in
										</button>
									</div>
								</>
							) : (
								<>
									<p className='text-light mb-0 me-3'>You are not signed in</p>
									<div>
										<Link href='/auth/login'>
											<button type='button' className='btn btn-light'>
												Sign in
											</button>
										</Link>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
