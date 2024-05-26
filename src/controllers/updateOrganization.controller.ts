import { Request, Response } from 'express';
import { Organization } from '../models/organization.model';

const UpdateOrganization = async (req: Request, res: Response) => {
    try {
        const { _id, orgName, max_wfh}: { _id:string, orgName: string, max_wfh: number} = req.body;

        //console.log("Body from application: ",JSON.stringify(req.body));
    
        if (!_id || !orgName || !max_wfh) {
            return res.status(400).json({ status: false, msg: "Id or orgName or Max_WFH is missing" });
        }

        const response = await Organization.updateOne(
            { _id},
            {
                $set: {
                    name: orgName,
                    max_wfh
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