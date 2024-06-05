import  { OrganizationUser,IOrganizationUser } from '../models/organizationUser.model';

export const createUser = async (userData: IOrganizationUser): Promise<IOrganizationUser> => {
    return await OrganizationUser.create(userData);
};

export const getUserByEmail = async (email: string): Promise<IOrganizationUser | null> => {
    return await OrganizationUser.findOne({ email });
};


