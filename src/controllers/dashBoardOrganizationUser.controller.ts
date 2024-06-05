import { Request, Response } from 'express';
import { WFHApplicationModel, IWFHApplication } from '../models/wfhApplication.model';

const DashBoardOrganizationUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.user;

        if (!email) {
            return res.status(400).json({ status: "false", msg: "Bad Request: Email is required" });
        }

        const allApplications: IWFHApplication[] = await WFHApplicationModel.find({ email });

        return res.status(200).json({
            status: "true",
            user: req.user,
            allApplications
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "false", msg: "Internal Server Error" });
    }
};

export default DashBoardOrganizationUser;
