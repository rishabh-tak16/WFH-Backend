import { Request, Response } from "express";
import { Organization } from "../models/organization.model";

const CheckAdmin = async (req: Request, res: Response) => {
  const { email, orgName } = req.query;

  if (!email || !orgName) {
    return res
      .status(400)
      .json({ message: "Email and organization name are required" });
  }

  try {
    const organization = await Organization.findOne({
      admin: email,
      name: orgName,
    });
    if (organization) {
      return res.status(200).json({ isAdmin: true });
    } else {
      return res.status(200).json({ isAdmin: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export default CheckAdmin;
