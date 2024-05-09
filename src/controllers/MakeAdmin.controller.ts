import { Request, Response } from "express";
import {Organization} from "../models/Organization.model";

const MakeAdmin = async (req: Request, res: Response) => {
    const { email, orgName } = req.body;

    console.log(email, orgName);
    if ([email, orgName].some(el => !el || el === "")) {
        return res.status(400).json({ status: false, msg: "Fill the field" });
    }

    try {
        const result = await Organization.findOne({ name: orgName });
        if (!result) {
            return res.status(400).json({ status: false, msg: "Organization not found" });
        }

        const updatedResult = await Organization.updateOne(
            { name: orgName },
            {
                $set: {
                    admin: email
                }
            }
        );
        console.log(updatedResult);

        return res.status(200).json({ status: true, msg: `${email} now admin of ${orgName}`, ack: updatedResult });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

export default MakeAdmin;
