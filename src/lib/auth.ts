import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

// nodemailer for email verification
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // additional field added within user table
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  // Email verification part by nodemailer
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true, //after sign up automatic sign in app
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verifationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Prisma BlogApp" <prismablogapp@gmail.com>',
          to: user.email,
          subject: "Please Verify Your Email!",
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background-color: #4f46e5; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0;">Prisma BlogApp</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px; color: #333333;">
                <h2 style="margin-top: 0;">Verify your email address</h2>
                <p>
                  Thanks for creating an account! Please confirm your email address by clicking the button below.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a
                    href="${verifationUrl}"
                    style="
                      background-color: #4f46e5;
                      color: #ffffff;
                      padding: 12px 24px;
                      text-decoration: none;
                      border-radius: 6px;
                      display: inline-block;
                      font-weight: bold;
                    "
                  >
                    Verify Email
                  </a>
                </div>

                <p>
                  If you didn’t create this account, you can safely ignore this email.
                </p>

                <p style="font-size: 14px; color: #777777;">
                  This link will expire in a limited time.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777777;">
                © 2026 Prisma BlogApp. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
        });
        console.log("Message sent:", info.messageId);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  // sign up by google
  socialProviders: {
        google: { 
            // prompt: "select_account", // If you want to always ask the user to select an account

            // To always get a refresh token
            accessType: "offline", 
            prompt: "select_account consent",

            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});
