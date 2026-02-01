import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload} from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
}

interface TokenPayload extends JwtPayload {
    userId: string
}

const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as TokenPayload;

        req.userId = decoded.userId

        next()
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;