import { FormEvent, useEffect, useState } from 'react';
import Layout from '@/layouts/Layout';
import { isEmailLink, signInViaEmailLink } from '@/lib/firebase/client';
import { clearLoginEmail, getLoginEmail } from '@/lib/localStorage/emailLogin';

type FormState = 'idle' | 'submitting' | 'validating' | Error;

export default function Confirm() {
	const [email, setEmail] = useState('');
	const [state, setState] = useState('idle' as FormState);

	const login = async (loginEmail: string) => {
		setEmail(loginEmail);
		setState('submitting');

		try {
			const credential = await signInViaEmailLink(
				loginEmail,
				window.location.href
			);
			const token = await credential.user.getIdToken();
			const user = await fetch('/api/auth/session', {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`
				}
			}).then((res) => res.json());

			console.log(user);

			clearLoginEmail();
		} catch (error) {
			if (error instanceof Error) {
				setState(error);
			} else {
				setState(new Error('something went wrong 😞'));
			}
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		login(form.email.value as string);
	};

	useEffect(() => {
		if (!isEmailLink(window.location.href)) {
			setState(new Error('This page is only for login links!'));
			return;
		}

		const loginEmail = getLoginEmail();
		if (!loginEmail) {
			setState('idle');
			return;
		}

		login(loginEmail);
	}, []);

	return (
		<Layout title='Login'>
			<h1 className='display-1'>Confirm</h1>

			{state instanceof Error ? (
				<p className='lead'>{state.message}</p>
			) : state === 'validating' ? (
				<p className='lead'>Validating email login link</p>
			) : state === 'submitting' ? (
				<p className='lead'>We are signing you in as {email}</p>
			) : (
				<>
					<p className='lead'>
						We know you just clicked a login link, but maybe you’re logging in
						from a different device to where you requested the login?
					</p>
					<p className='lead'>
						In any case, please fill in your email address and submit this form!
					</p>

					<form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
						<div className='row g-3 my-3'>
							<div className='col-auto'>
								<input
									type='email'
									id='email'
									className='form-control'
									placeholder='name@example.com'
								/>
							</div>
							<div className='col-auto'>
								<button className='btn btn-dark'>Finish login</button>
							</div>
						</div>
					</form>
				</>
			)}
		</Layout>
	);
}
