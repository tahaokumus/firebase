// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSessionCookie, verifyIdToken } from '@/lib/firebase/admin';

type Data = {
	success: Boolean;
	data?: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const authHeader = req.headers.authorization as string;

	const [scheme, token] = authHeader.split(' ');
	if (scheme !== 'Bearer' || !token) {
		res.status(401).json({ success: false, data: 'Invalid auth header' });
		return;
	}

	try {
		const { sub, email } = await verifyIdToken(token);

		const user = { id: sub, email };

		const sessionCookie = await createSessionCookie(token);

		res.setHeader('Set-Cookie', sessionCookie);
		return res.status(200).json({ success: true, data: user });
	} catch (error) {
		return res.status(401).json({ success: false, data: 'Invalid auth token' });
	}
}
