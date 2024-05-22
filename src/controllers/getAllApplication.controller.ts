import { Request, Response } from "express";
import { WFHApplicationModel } from "../models/wfhApplication.model";

const getAllApplication = async (req: Request, res: Response) => {
  try {
    const {orgName } = req.body;
    if (!orgName) {
      return res
        .status(400)
        .json({ message: "Orgnaization name is required" });
    }
    const applications = await WFHApplicationModel.find({ orgName });
    res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getAllApplication;
