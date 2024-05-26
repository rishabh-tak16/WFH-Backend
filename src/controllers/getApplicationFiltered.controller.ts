import { Request, Response } from "express";
import { WFHApplicationModel } from "../models/wfhApplication.model";

interface FilterParameters {
  email?: string,
  availedAt?: string,
  reason?: string,
  status?: string,
  approvedBy?: string
}

const getAllApplicationFiltered = async (req: Request, res: Response) => {
  const {orgName } = req.params;
  const { email, availedAt, reason, status, approvedBy} = req.query as Record<string, string | undefined>;

  const filterQuery: FilterParameters = {
    email,
    availedAt,
    reason,
    status,
    approvedBy,
  }


  try {
    if (!orgName) {
      return res
        .status(400)
        .json({ message: "Orgnaization name is required" });
    }

    if(!filterQuery.email || filterQuery.email === '' || filterQuery.email === 'undefined' ){
      delete filterQuery.email;
    }
    if(!filterQuery.reason || filterQuery.reason === '' || filterQuery.reason === 'undefined'){
      delete filterQuery.reason;
    }
    if(!filterQuery.status  || filterQuery.status === '' || filterQuery.status === 'undefined'|| filterQuery.status === 'null'){
      delete filterQuery.status;
    }
    
    if(!filterQuery.approvedBy || filterQuery.approvedBy === '' || filterQuery.approvedBy === 'undefined'){
      delete filterQuery.approvedBy;
    }

    if(!filterQuery.availedAt || filterQuery.availedAt === '' || filterQuery.availedAt === 'undefined'){
      delete filterQuery.availedAt;
    }

    const findObj = {
      ...filterQuery,
      orgName
    }
    //console.log(findObj);
    
    const applications = await WFHApplicationModel.find(findObj);
    res.status(200).json({ applications });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getAllApplicationFiltered;
