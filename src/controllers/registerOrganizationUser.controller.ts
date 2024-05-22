import { Request, Response } from 'express';
import {OrganizationUser, IOrganizationUser}  from '../models/organizationUser.model';
import { Organization, IOrganization } from '../models/organization.model';

const RegisterOrganizationUser = async (req: Request, res: Response) => {
    try {
        const { organizationName, firstName, lastName, email, dob, doj }: 
        { organizationName: string, firstName: string, lastName: string, email: string, dob: Date, doj: Date } = req.body;


        if (![organizationName, firstName, email, dob, doj].every(Boolean)) {
            return res.status(400).json({ status: "false", msg: "Please fill all required fields" });
        }

        const orgData: IOrganization | null = await Organization.findOne({ name: organizationName });

        if (!orgData) {
            return res.status(404).json({ status: "false", msg: "Organization does not exist" });
        }

        if (orgData.userEmail.includes(email)) {
            return res.status(400).json({ status: "false", msg: "Email ID already exists in the organization" });
        }

        await Organization.updateOne(
            { name: organizationName },
            {
                $push: {
                    userEmail: email,
                }
            }
        );

        console.log("User: ", organizationName, firstName, lastName, email, dob, doj);

        const userData: IOrganizationUser | null = await OrganizationUser.findOne({ email: email });

        if (!userData) {
            const new_user: IOrganizationUser = await OrganizationUser.create({
                isAdmin: false,
                firstName: firstName,
                lastName: lastName,
                email: email,
                dob: dob,
                doj: doj,
                organization_list: [organizationName] 
            });

            await new_user.save();

            return res.status(201).json({ status: "true", msg: "Organization User created successfully" });
        } else {
            await OrganizationUser.updateOne(
                { email: email },
                {
                    $addToSet: { organization_list: organizationName }
                }
            );

            return res.status(200).json({ status: "true", msg: "Organization User added successfully" });
        }
    } catch (error) {
        console.error(error);
      
      
        return res.status(500).json({ status: "false", msg: "Internal Server Error" });
    }
};

export default RegisterOrganizationUser;
