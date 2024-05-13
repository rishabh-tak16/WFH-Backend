import  { SystemUser,ISystemUser } from '../models/systemUser.model';

export const createUser = async (userData: ISystemUser) => {
    return await SystemUser.create(userData);
};

export const getUserByEmail = async (email: string) => {
    return await SystemUser.findOne({ email });
};
