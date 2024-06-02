import DbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {

    await DbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameError?.length > 0 ? usernameError.join(', ') : 'Invalid query parameters'
            }, { status: 400 })
        }

        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })
        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: 'Username is alreay taken'
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: 'Username is available'
        }, { status: 200 })

    } catch (error) {
        console.error("Error while checking username", error);
        return Response.json({
            success: false,
            message: 'Error while checking username'
        }, { status: 500 })
    }
}