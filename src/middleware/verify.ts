import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided",
            });
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "") as {
            id: string;
            name: string;
            email: string;
            age: number;
        };
        
        (req as any).user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token",
        });
    }
}