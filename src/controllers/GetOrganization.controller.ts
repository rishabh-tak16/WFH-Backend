import { Request, Response } from "express";
import { Organization } from "../models/organization.model";

const GetOrganization = async (req: Request, res: Response) => {
  const {orgName} = req.query;
  try {
    const organization = await Organization.findOne({ name: orgName, delive: false});
    res.status(200).json({ organization });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default GetOrganization;
