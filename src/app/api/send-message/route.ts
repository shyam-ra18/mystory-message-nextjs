import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import DbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";
import { Message } from "@/model/User.model";

export async function POST(request: Request) {
    await DbConnect()

    const { username, content } = await request.json()

    try {

        const user = await UserModel.findOne({ username })

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        //is user accepting the messages
        if (!user.isAcceptinGMessage) {
            return Response.json({
                success: false,
                message: "User is not accepting the messages"
            }, { status: 403 })
        }

        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json({
            success: true,
            message: "Message sent successfully"
        }, { status: 200 })

    } catch (error) {
        console.log("failed to send messages", error)
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}