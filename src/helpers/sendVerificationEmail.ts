import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponses";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {

        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystory Message | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        // Todo from doc.

        // if (error) {
        //     return Response.json({ error }, { status: 500 });
        // }

        return {
            success: true,
            message: "Verification email send successfully"
        }

    } catch (emailError) {
        console.error("Error sending verification email ", emailError);
        return {
            success: false,
            message: "Failed to send verification email"
        }
    }
}