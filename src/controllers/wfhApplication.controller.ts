import { Request, Response } from 'express';
import { WFHApplicationModel, IWFHApplication } from '../models/wfhApplication.model';

const WFHApplication = async (req: Request, res: Response) => {
    try {
        const { email, createdDate, orgName, reason }: { email: string, createdDate: Date, orgName: string, reason: string } = req.body;

        if (![email, createdDate, orgName, reason].every(el => el)) {
            return res.status(400).json({ msg: "Data Insufficient" });
        }
        let date = new Date(createdDate);
        date.setHours(0, 0, 0, 0);

        const newApplication: IWFHApplication = await WFHApplicationModel.create({
            email,
            createdDate:date,
            orgName,
            status: 2, //2 means pending    
            reason,
            rejectedReason: "",
            approvedDate: new Date(0, 0, 0),
            approvedBy: ""
        });

        await newApplication.save();

        return res.status(200).json({ msg: "Application Filled" });
    } catch (error) { 
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export default WFHApplication;
