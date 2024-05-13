import otpGenerator from "otp-generator";

const generateOTP = (): string => {
    return otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });
};

export default generateOTP;
