import mongoose, { Model } from "mongoose";

interface ISystemUser {
    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
}

const SystemUserSchema = new mongoose.Schema<ISystemUser>({
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
    dob: {
        type: Date,
        required: true,
    }
});

const SystemUser: Model<ISystemUser> = mongoose.model<ISystemUser>("SystemUser", SystemUserSchema);
export {SystemUser,ISystemUser};
