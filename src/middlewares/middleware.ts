import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/common";

const organizationUserLoginAuthencation = async (req: Request, res: Response, next: NextFunction) => {
    const userToken = req.cookies?.uID;

    if (!userToken || userToken === "") {
        return res.status(200).json({ success: false });
    }
    const user = validateUserToken(userToken);

    if (!user) {
        return res.status(200).json({ success: false });
    }
    console.log("user>>>>>>>>>>>>>>>>>>>",user);
    req.user = user;
    next();
};

const validateUserToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};

export default organizationUserLoginAuthencation;
