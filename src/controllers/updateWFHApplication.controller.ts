import { Request, Response } from 'express';
import { WFHApplicationModel } from '../models/wfhApplication.model';

const UpdateWFH_Application = async (req: Request, res: Response) => {
    try {
        const { _id, statusValue }: { _id: string, statusValue: number } = req.body;

        if (!_id || !_id.trim() || !statusValue || isNaN(statusValue)) {
            return res.status(400).json({ status: false, msg: "Fill the detail" });
        }

        const response = await WFHApplicationModel.updateOne(
            { _id },
            {
                $set: {
                    status: statusValue,
                    approvedDate: Date.now()
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
