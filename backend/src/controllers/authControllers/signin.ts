import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../../db";
import { signinSchema } from "../validators/zod";

const signin = async (req: Request, res: Response) => {
    try {
        //inputs check
        const parsed = signinSchema.safeParse(req.body);

        if(!parsed.success) {
            return res.status(400).json({
                message: parsed.error.issues[0].message,
            });
        }

        const { email, password } = parsed.data;

        // user check
        const user = await prismaClient.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email"
            });
        }
         // compare password
         const isPasswordValid = await bcrypt.compare(password, user.password);

         if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
         }

         // creating JWT
         const token = jwt.sign(
            { userId: user.id},
            process.env.JWT_SECRET!,
            { expiresIn: "7d"}
         );

         // setting up the HttpOnly cookie
         res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 1000, // 7 days
         });

         return res.status(200).json({
            message: "Signin successful"
         });
    } catch (error) {
        console.error("Signin error", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default signin;