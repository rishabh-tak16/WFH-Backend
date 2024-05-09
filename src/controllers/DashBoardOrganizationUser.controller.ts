import { Request, Response } from 'express';
import { WFHApplicationModel, IWFHApplication } from '../models/WFHApplication.model';

const DashBoardOrganizationUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.user;

        const allApplications: IWFHApplication[] = await WFHApplicationModel.find({ email });

        return res.status(200).json({
            user: req.user,
            allApplications
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "false", msg: "Internal Server Error" });
    }
};

export default DashBoardOrganizationUser;
