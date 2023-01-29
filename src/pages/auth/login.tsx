import { FormEvent, useState } from 'react';
import Layout from '@/layouts/Layout';
import { sendEmailLink } from '@/lib/firebase/client';
import { sendLoginEmail } from '@/lib/localStorage/emailLogin';

type FormState = 'idle' | 'submitting' | 'success' | Error;

export default function Login() {
	const [email, setEmail] = useState('');
	const [state, setState] = useState('idle' as FormState);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		setEmail(form.email.value as string);
		const redirectUrl = `${window.location.origin}/auth/confirm`;

		setState('submitting');

		try {
			// await sendEmailLink(form.email.value, redirectUrl);
			sendLoginEmail(form.email.value);
			setState('success');
		} catch (error) {
			if (error instanceof Error) {
				setState(error);
			} else {
				console.log(error);
				setState(new Error('something went wrong sending the login link 😞'));
			}
		}
	};

	return (
		<Layout title='Login'>
			<h1 className='display-1'>Login</h1>

			{state !== 'success' && (
				<>
					<p className='lead'>You are not logged in!</p>
					<p className='lead'>
						Please enter your email to login, using the latest in{' '}
						<strong>Passwordless Authentication</strong>
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
								<button className='btn btn-dark'>
									{state === 'submitting'
										? 'Sending...'
										: state instanceof Error
										? 'Please try again'
										: 'Send login link'}
								</button>
							</div>
						</div>
					</form>
				</>
			)}
			{state === 'success' && (
				<>
					<p className='lead'>Great, we&apos;ve sent you an email!</p>
					<p className='lead'>
						Please find it in your <strong>{email}</strong> inbox and follow the
						link there to login.
					</p>
				</>
			)}
		</Layout>
	);
}
