import type { FirebaseApp } from 'firebase/app';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
	getAuth,
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	setPersistence,
	signInWithEmailLink,
	inMemoryPersistence
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

export const getClientApp: () => FirebaseApp = () => {
	if (getApps().length) return getApp();

	const clientApp = initializeApp(firebaseConfig);
	const auth = getAuth(clientApp);
	setPersistence(auth, inMemoryPersistence);

	return clientApp;
};

export const isEmailLink = (link: string) => {
	const auth = getAuth(getClientApp());

	return isSignInWithEmailLink(auth, link);
};

export const signInViaEmailLink = (email: string, link: string) => {
	const auth = getAuth(getClientApp());

	return signInWithEmailLink(auth, email, link);
};

export const sendEmailLink = (email: string, redirectUrl: string) => {
	const auth = getAuth(getClientApp());
	const actionCodeSettings = {
		url: redirectUrl,
		handleCodeInApp: true
	};

	return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};
