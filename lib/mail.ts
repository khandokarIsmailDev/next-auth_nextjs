import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async(email:string,token:string) =>{
    const confirmLink = `${process.env.HOST_LINK}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to: email,
        subject:"Confirm your email",
        html:`<p>Click <a href="${confirmLink}">here</a> to Confirm Email!</p>`
    })
}

export const sendPasswordResendEmail = async(email:string,token:string) =>{
    const resetLink = `${process.env.HOST_LINK}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html:`<p>Click <a href="${resetLink}">here</a> to Reset password!</p>`
    })
}