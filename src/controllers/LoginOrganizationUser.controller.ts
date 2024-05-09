import { Request, Response } from "express";
import {OrganizationUser} from "../models/OrganizationUser.model";
import minuteDiff from "../util/TimeDifference.util";
import OtpModel from "../models/Otp.model";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/common";

const LoginOrganizationUser = async (req: Request, res: Response) => {
    const { email, password, otp } = req.body;

    if ([email, password, otp].some(el => !el || el === "")) {
        return res.status(400).json({ status: false, msg: "Fill the details" });
    }

    console.log(email, password, otp);
    try {
        const user = await OrganizationUser.find({ email: email, password: password });
        if (user.length !== 1) {
            return res.status(400).json({ status: false, msg: "Invalid Login Credentials" });
        }

        // const validOtp = await OtpModel.find({ email }).sort({ _id: -1 });

        // if ([validOtp[0]["email"], validOtp[0]["otp"], validOtp[0]["time"]].some(el => !el || el === "")) {
        //     return res.status(400).json({ status: false, msg: "Can't find Otp" });
        // }
        
        // const diff = minuteDiff(new Date(Date.now()), new Date(Date.parse(validOtp[0]["time"])));
        // if (diff > 15 || validOtp[0]["otp"] != otp) {
        //     return res.status(400).json({ status: false, msg: "Invalid Otp" });
        // }

        const accessToken = jwt.sign({ user }, SECRET_KEY, { expiresIn: '3d' });

        return res.status(200).json({
            success: true,
            accessToken,
            user
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

export default LoginOrganizationUser;
