import mongoose, { Date, Document, Model } from "mongoose";

interface IOrganizationUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob: Date;
    doj: Date;
    organization_list: string[];
}

const OrganizationUserSchema = new mongoose.Schema<IOrganizationUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    }, 
    doj: {
        type: Date,
        required: true,
    },
    organization_list: {
        type: [String],
        default: [],
        required: true,
    }
});

const OrganizationUser: Model<IOrganizationUser> = mongoose.model<IOrganizationUser>("OrganizationUser", OrganizationUserSchema);
export  {OrganizationUser,IOrganizationUser};
