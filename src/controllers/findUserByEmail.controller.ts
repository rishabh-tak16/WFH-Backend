import { Request, Response } from 'express';
import {OrganizationUser} from '../models/organizationUser.model';

const FindUserByEmail = async (req: Request, res: Response) => {
    try {
      const user = await OrganizationUser.findOne(req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).send({data:user.organization_list});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
};

export default FindUserByEmail;