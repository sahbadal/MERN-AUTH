import jwt from 'jsonwebtoken';
import { JWT_SECRET} from '../config/envConfig.js';

const userAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied! Login Again' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        if(decodedToken.id){
            req.body.userId = decodedToken.id;
        }else{
            return res.status(401).json({ success: false, message: 'Not Authorized! Login Again' });
        }
        next();


    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

export default userAuth;