import { Request, Response } from "express";

const logout = (_req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
        message: "Logged out successfully",
    });
}

export default logout;