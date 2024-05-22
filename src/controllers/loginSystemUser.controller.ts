import { Request, Response } from "express";
import {SystemUser} from "../models/systemUser.model";
import OtpModel from "../models/otp.model";
import jwt from "jsonwebtoken";
import TimeDifference from "../util/timeDifference.util";
import { SECRET_KEY } from "../constants/common";

const LoginSystemUser = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    
    if ([email, otp].some(el => !el || el === "")) {
        return res.status(400).json({ status: false, msg: "Fill the details" });
    }

    try {
        const user = await SystemUser.find({ email });
        if (user.length !== 1) {
            return res.status(400).json({ status: false, msg: "Invalid Credentials" });
        }
        
        // // OTP verification
        // const validOtp = await OtpModel.find({ email }).sort({ _id: -1 });

        // if ([validOtp[0]["email"], validOtp[0]["otp"], validOtp[0]["time"]].some(el => !el || el === "")) {
        //     return res.status(400).json({ status: false, msg: "Can't find Otp" });
        // }
        
        // const diff = TimeDifference(new Date(Date.now()), new Date(validOtp[0]["time"]));
        // console.log("Time Difference is: ", diff);

        // console.log("valid otp", validOtp[0]['otp']);
        
        
        // if (diff > 15 || validOtp[0]["otp"] != otp) {
        //     return res.status(400).json({ status: false, msg: "Invalid Otp" });
        // }

        const accessToken = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1d' });
        

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

export default LoginSystemUser;
