import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../dao/systemUser.dao';

const RegisterSystemUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, dob } = req.body;
        console.log(firstName, lastName, email, password, dob);
        

        const user = await getUserByEmail(email);
        if (user) {
            return res.status(400).json({ flag: false, msg: "System User already exists" });
        }   
        console.log(">>>>>>>>>Request body:",req.body);
        console.log(">>>>>>body:",{
            firstName : firstName,
            lastName : lastName,
            email : email ,
            password : password,
            dob : dob
        })
        const newUser = await createUser({
            firstName,
            lastName,
            email,
            password,
            dob
        });

        return res.status(200).json({ flag: true, msg: "System User Created Successfully", newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ flag: false, msg: "Internal Server Error" });
    }
};

export default RegisterSystemUser;
