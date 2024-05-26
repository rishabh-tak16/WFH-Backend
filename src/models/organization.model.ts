import mongoose, {  Document, Model } from "mongoose";

interface IOrganization extends Document{
    name: string;
    max_wfh: number;
    userEmail: string[];
    admin: string;
    delive: boolean
}

const OrganizationSchema = new mongoose.Schema<IOrganization>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    max_wfh: {
        type: Number,
        required: true,
    },
    userEmail: {
        type: [String],
        required: true,
    },
    admin: {
        type: String,
        required: true,
    },
    delive:{
        type:Boolean,
        default : false
    }
});

const Organization: Model<IOrganization> = mongoose.model<IOrganization>("Organization", OrganizationSchema);
export {IOrganization,Organization};
