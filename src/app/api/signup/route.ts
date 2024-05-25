import DbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request, response: Response) {
    await DbConnect();

    try {
        const {username, email, password } = await request.json();
        
    } catch (error) {
        console.log("Error registering user", error);
        return Response.json({
            success: false,
            message: "Error registering use"
        },
        {
            status:500
        }
        
        )
    }
}
