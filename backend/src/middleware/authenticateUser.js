import jwt from 'jsonwebtoken';

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        console.log('req.userId: ', req.userId);
        console.log('token: ', token);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

