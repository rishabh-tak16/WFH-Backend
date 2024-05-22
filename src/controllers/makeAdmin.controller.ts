import { Request, Response } from "express";
import {Organization} from "../models/organization.model";

const MakeAdmin = async (req: Request, res: Response) => {
    const { email, orgName } = req.body;

    console.log(email, orgName);

        try {
        const updatedResult = await Organization.updateOne(
            { name: orgName },
            {
                $set: {
                    admin: email
                }
            }
        );
        console.log(updatedResult);

        return res.status(200).json({ status: true, msg: `${email} is now admin of ${orgName}`, ack: updatedResult });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

export default MakeAdmin;
