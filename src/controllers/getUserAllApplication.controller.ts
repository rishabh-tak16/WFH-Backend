import { Request, Response } from "express";
import { WFHApplicationModel } from "../models/wfhApplication.model";

const getUserAllApplication = async (req: Request, res: Response) => {
  try {
    const {email,orgName } = req.body;
    if (!email||!orgName) {
      return res
        .status(400)
        .json({ message: "UserEmail and Orgnaization name is required" });
    }
    const applications = await WFHApplicationModel.find({ email,orgName });
    res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getUserAllApplication;
