import { Request, Response } from 'express';
import { WFHApplicationModel } from '../models/wfhApplication.model';

const UpdateOrganization = async (req: Request, res: Response) => {
    try {
        const { orgName, max_wfh, newAdmin}: { orgName: string, max_wfh: number, newAdmin: string } = req.body;

        //console.log("Body from application: ",JSON.stringify(req.body));
        

        if (!orgName || !max_wfh || !newAdmin) {
            return res.status(400).json({ status: false, msg: "Fill the details" });
        }

        const response = await WFHApplicationModel.updateOne(
            {  },
            {
                $set: {
                    name: orgName,
                    max_wfh,
                    admin: newAdmin
                }
            }
        );
        return res.status(200).json({ status: true, response });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

export default UpdateOrganization;
