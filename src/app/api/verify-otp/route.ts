import DbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { verifyschemaValidation } from "@/schemas/verifySchema";
import { z } from "zod";


const VerifyOtpQuerySchema = z.object({
    code: verifyschemaValidation
})

export async function POST(request: Request) {
    await DbConnect()
    try {

        const { username, code } = await request.json();

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json({
                success: false,
                message: 'User not found'
            }, { status: 400 })
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save()
            return Response.json({
                success: true,
                message: 'Account verified successfully'
            }, { status: 200 })
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: 'Verification code has expired, please signup again to get new code'
            }, { status: 400 })
        } else {
            return Response.json({
                success: false,
                message: 'Incorrect verification code'
            }, { status: 400 })
        }

    } catch (error) {
        console.error("Error while verifying otp", error);
        return Response.json({
            success: false,
            message: 'Error while verifying otp'
        }, { status: 500 })
    }
}