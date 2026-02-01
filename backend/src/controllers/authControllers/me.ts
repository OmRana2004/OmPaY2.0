import { Response } from "express";
import { prismaClient } from "../../db";
import { AuthRequest } from "../../middlewares/authMiddleware";

const me = async (req: AuthRequest, res:Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Me error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default me;