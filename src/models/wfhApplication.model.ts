import mongoose, { Document, Model } from "mongoose";

interface IWFHApplication extends Document {
    email: string;
    createdDate: Date;
    orgName: string;
    status: number; // 1 for approved, 2 for rejected, 3 for pending
    reason: string;
    approvedDate: Date;
}

const WFHApplicationSchema = new mongoose.Schema<IWFHApplication>({
    email: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true
    },
    orgName: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    approvedDate: {
        type: Date,
        required: true,
    }
});

const WFHApplicationModel: Model<IWFHApplication> = mongoose.model<IWFHApplication>("WFHApplication", WFHApplicationSchema);

export {WFHApplicationModel,IWFHApplication};
