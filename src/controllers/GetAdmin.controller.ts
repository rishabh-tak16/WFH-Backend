import { Request, Response } from "express";
import {Organization} from "../models/Organization.model";
import {WFHApplicationModel} from "../models/WFHApplication.model";

const GetAdmin = async (req: Request, res: Response) => {
    let { orgList, email } = req.body;

    if ([orgList, email].some(el => !el || el === "")) {
        return res.status(400).json({ status: false, msg: "Fill the Details" });
    }

    try {
        let response = await Organization.find({});
        let result: any[] = [];
        let orgResult: string[] = [];

        response.forEach((el: any) => {
            if (el.admin === email && orgList.find((comp: string) => comp === el.name)) {
                result.push(el);
                orgResult.push(el.name);
            }
        });

        let application_res = await WFHApplicationModel.find({
            orgName: {
                $in: orgResult
            }
        });

        return res.status(200).json({
            status: true,
            data: result,
            applications: application_res
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

export default GetAdmin;
