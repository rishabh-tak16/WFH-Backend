import { Request, Response } from "express";
import { WFHApplicationModel } from "../models/wfhApplication.model";

const getUserAllApplication = async (req: Request, res: Response) => {
  try {
    const { email, orgName } = req.query;

    if (!email || !orgName) {
      return res.status(400).json({ message: "User email and organization name are required" });
    }

    const applications = await WFHApplicationModel.find({ email, orgName });

    return res.status(200).json({ applications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getUserAllApplication;
