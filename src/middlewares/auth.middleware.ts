import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../constants/common";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload['user'][0]; 
        }
    }
}

const Auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(400).json({ status: false, msg: "Token is missing" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({ status: false, msg: `Invalid token: ${err.message}` });
        }

        const decodedPayload = decoded as JwtPayload;

        if (!decodedPayload.user || !Array.isArray(decodedPayload.user)) {
            return res.status(400).json({ status: false, msg: "Invalid user data in token" });
        }

        req.user = decodedPayload.user[0];
        next();
    });
};

export default Auth;
