import { Request, Response } from 'express';
import { WFHApplicationModel, IWFHApplication } from '../models/wfhApplication.model';

const WFHApplication = async (req: Request, res: Response) => {
    try {
        const { email } = req.user;
        const { createdDate, orgName, reason }: { createdDate: Date, orgName: string, reason: string } = req.body;

        console.log(email, createdDate, orgName, reason);

        if (![email, createdDate, orgName, reason].every(el => el)) {
            return res.status(400).json({ msg: "Data Insufficient" });
        }

        const newApplication: IWFHApplication = await WFHApplicationModel.create({
            email,
            createdDate,
            orgName,
            status: 3,
            reason,
            approvedDate: new Date(0, 0, 0)
        });

        await newApplication.save();

        return res.status(200).json({ msg: "Application Filled" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export default WFHApplication;
