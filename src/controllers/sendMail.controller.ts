import { Request, Response } from "express";
import nodemailer from "nodemailer";
import OtpModel from "../models/otp.model";

const generateOtp = (): string => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};

const SendMail = async (req: Request, res: Response) => {
    let { email } = req.params;
    let otp = generateOtp();
    console.log("this is my otp>>>>>>",otp);
    

    if ([email, otp].some(el => !el || el === "")) {
        return res.status(200).json({
            status: false,
            msg: "Fill the Details"
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'rishabhtak16@gmail.com',
                pass: 'bgjb jvnh afqs rfja'
            }
        });

        const ack = await transporter.sendMail({
            from: 'Mail send by <rishabhtak16@gmail.com>',
            to: email,
            subject: `Hello Mr.${email}`,
            html: `Your OTP is <b>${otp}</b> this is valid for only 15 min`,
        });

        if (ack) {
            const otp_data = await OtpModel.create({
                email: email,
                otp: otp,
                time: new Date(Date.now())
            });
            otp_data.save();
        }

        return res.status(200).json(ack);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

export default SendMail;
