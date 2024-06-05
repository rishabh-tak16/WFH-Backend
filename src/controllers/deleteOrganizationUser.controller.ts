import { Request, Response } from 'express';
import { OrganizationUser, IOrganizationUser } from '../models/organizationUser.model';
import { Organization } from "../models/organization.model";

const DeleteOrganizationUser = async (req: Request, res: Response) => {
    try {
        const { email, organizationValue }: { email: string, organizationValue: string } = req.body;
        if (!(email && organizationValue)) {
            return res.status(400).json({ status: false, msg: "Email and organization are required" });
        }
        
        const getUser: IOrganizationUser | null = await OrganizationUser.findOne({ email });

        if (!getUser) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }

        let updateUser: any;

        if (getUser.organization_list && getUser.organization_list.length <= 1) {
            updateUser = await OrganizationUser.deleteOne({ email });
        } else {
            updateUser = await OrganizationUser.updateOne(
                { email },
                {
                    $pull: {
                        organization_list: organizationValue,
                    }
                }
            );  
        }

        const updateOrg = await Organization.updateOne(
            { name: organizationValue },
            {
                $pull: {
                    userEmail: email,
                }
            }
        );

        return res.status(200).json({
            user: updateUser,
            org: updateOrg
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

export default DeleteOrganizationUser;
