import mongoose, { Document, Model } from "mongoose";

interface IOtp extends Document{
    email: string;
    otp: string;
    time: Date;
}

const OtpSchema = new mongoose.Schema<IOtp>({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    }
});

const OtpModel: Model<IOtp> = mongoose.model<IOtp>("Otp", OtpSchema);
export default OtpModel;
