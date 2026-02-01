import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { prismaClient } from "../../db";
import { signupSchema } from "../validators/zod"

const signup = async (req: Request, res: Response) => {
    try {
        //Validate using ZOD
        const parsed = signupSchema.safeParse(req.body);

        if(!parsed.success) {
            return res.status(400).json({
                message: parsed.error.issues[0].message
            })
        }

        const { firstName, lastName, email, password } = parsed.data;

        //user checking
        const existingUser = await prismaClient.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Hashing a password

        const hashedPassword = await bcrypt.hash(password, 10);

        // creating a user
        const user = await prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
        });

        // sending response
        return res.status(201).json({
            message: "Signup successful",
            user,
        });
    } catch (error) {
        console.error("Signup error", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
export default signup;