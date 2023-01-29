import { getApps, getApp, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
	/\\n/g,
	'\n'
);

if (!projectId || !clientEmail || !privateKey) {
	throw new Error('Missing Firebase Admin credentials');
}

const adminConfig = {
	credential: cert({
		projectId,
		clientEmail,
		privateKey
	})
};

export const getAdminApp = () =>
	getApps().length ? getApp() : initializeApp(adminConfig);

export const verifyIdToken = (token: string) => {
	const auth = getAuth(getAdminApp());
	return auth.verifyIdToken(token);
};

const maxAge = 60 * 60 * 24 * 5;
export const createSessionCookie = async (token: string) => {
	const auth = getAuth(getAdminApp());
	const session = await auth.createSessionCookie(token, {
		expiresIn: maxAge * 1000
	});
	return `session=${session}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Strict; Secure`;
};

export const getIdFromSessionCookie = async (cookie: string | null) => {
	if (!cookie) return null;

	const auth = getAuth(getAdminApp());
	return auth.verifySessionCookie(cookie, true).catch(() => null);
};
