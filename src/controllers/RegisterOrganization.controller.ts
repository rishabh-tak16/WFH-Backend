import { Request, Response } from 'express';
import {  Organization,IOrganization } from '../models/Organization.model';

const RegisterOrganization = async (req: Request, res: Response) => {
    try {
        const { name, max_wfh }: { name: string, max_wfh: number } = req.body;

        if (!name.trim() || !max_wfh) {
            return res.status(400).json({ status: "false", msg: "Organization name or max_wfh cannot be empty" });
        }

        const existingOrg: IOrganization | null = await Organization.findOne({ name });

        if (existingOrg) {
            return res.status(400).json({ status: "false", msg: "Organization already exists" });
        }

        const newOrg: IOrganization = new Organization({
            name,
            max_wfh,
            userEmail: [],
            admin: "none"
        });

        await newOrg.save();

        res.status(201).json({ status: "true", msg: "Organization created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "false", msg: "Failed to create organization" });
    }
};

export default RegisterOrganization;
