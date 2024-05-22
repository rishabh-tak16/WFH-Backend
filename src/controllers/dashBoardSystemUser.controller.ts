import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { OrganizationUser, IOrganizationUser } from '../models/organizationUser.model';

const DashBoardSystemUser = async (req: Request, res: Response): Promise<void> => {
    
    try {
        const user_data: IOrganizationUser[] = await OrganizationUser.find({});
        
        res.status(200).json({
            user: req.user,
            user_data
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default DashBoardSystemUser;
