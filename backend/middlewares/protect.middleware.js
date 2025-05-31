import jwt from 'jsonwebtoken';
import { apiError } from '../utils/apiError.js';

export const protectedRoute = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.jwt;
    console.log('Token received:', token);

    if (!token) {
        return next(new apiError(401, 'Unauthorized access'));
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        console.log('Token verified successfully:', decoded);
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return next(new apiError(403, 'Invalid token'));
    }
}