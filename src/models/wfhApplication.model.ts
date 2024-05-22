import mongoose, { Document, Model } from "mongoose";

interface IWFHApplication extends Document {
    email: string;
    createdDate: Date;
    orgName: string;
    status: number; // 1 for approved, 2 for pending, 3 for rejected
    reason: string;
    rejectedReason: string;
    approvedDate: Date;
    approvedBy: String;
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
    rejectedReason: {
        type: String, 
        require: true
    },
    approvedDate: {
        type: Date,
        required: true,
    },
    approvedBy: {
        type: String,
        require: true
    }

});

const WFHApplicationModel: Model<IWFHApplication> = mongoose.model<IWFHApplication>("WFHApplication", WFHApplicationSchema);

export {WFHApplicationModel,IWFHApplication};

