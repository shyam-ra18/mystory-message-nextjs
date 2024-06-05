import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import DbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";

export async function POST(request: Request) {
    await DbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    const userId = user._id
    const { acceptMessages } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { isAcceptinGMessage: acceptMessages }, { new: true })

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "failed to update user status to accept messages"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            message: "message acceptance status update successfully",
            updatedUser
        }, { status: 200 })

    } catch (error) {
        console.log("failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: "failed to update user status to accept messages"
        }, { status: 500 })
    }
}

export async function GET(request: Request) {
    await DbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    const userId = user._id

    try {
        const foundUser = await UserModel.findById(userId)

        if (!foundUser) {
            return Response.json({
                success: false,
                message: "failed to found the user"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            isAcceptinGMessage: foundUser.isAcceptinGMessage
        }, { status: 200 })

    } catch (error) {
        console.log("failed to found user status to accept messages", error)
        return Response.json({
            success: false,
            message: "failed to found user status to accept messages"
        }, { status: 500 })
    }
}