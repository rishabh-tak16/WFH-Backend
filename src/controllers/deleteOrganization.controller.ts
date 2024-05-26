import { Request, Response } from 'express';
import { Organization } from '../models/organization.model';

const DeleteOrganization = async (req: Request, res: Response) => {
    try {
        const { _id}: { _id: string } = req.body;

        if (!_id ) {
            return res.status(400).json({ status: false, msg: "Id is missing" });
        }

        const response = await Organization.updateOne(
            { _id },
            {
                $set: {
                    delive: true
                }
            }
        );
        return res.status(200).json({ status: true, response });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

export default DeleteOrganization;

