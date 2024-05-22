import { Request, Response } from "express";
import { Organization } from "../models/organization.model";

const CheckAdmin = async (req: Request, res: Response) => {
  const { email, orgName } = req.body;

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
      return res.json({ isAdmin: true });
    } else {
      return res.json({ isAdmin: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export default CheckAdmin;
