import { getSession } from 'next-auth/react';

export default async function auth(req, res, next) {
    const session = await getSession({ req });

    // If the user is not authenticated, redirect to the home page
    if (!session) {
        res.writeHead(302, { Location: '/' });
        res.end();
        return;
    }

    // If the user is authenticated, continue to the next middleware
    return next();
}