import { Request, Response } from 'express';
import { WFHApplicationModel } from '../models/wfhApplication.model';

const UpdateWFH_Application = async (req: Request, res: Response) => {
    try {
        const { _id, statusValue, userEmail, rejectedReason }: { _id: string, statusValue: number, userEmail: string, rejectedReason: string } = req.body;

        if (!_id || !userEmail) {
            return res.status(400).json({ status: false, msg: "Fill the detail" });
        }

        const response = await WFHApplicationModel.updateOne(
            { _id },
            {
                $set: {
                    status: statusValue,
                    approvedDate: Date.now(),
                    approvedBy: userEmail,
                    rejectedReason
                }
            }
        );
        return res.status(200).json({ status: true, response });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

export default UpdateWFH_Application;
