import { Request, Response } from "express";
import { Organization } from "../models/organization.model";

const GetAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json({ organizations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default GetAllOrganizations;
