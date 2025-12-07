import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Middleware factory that returns a middleware function for role-based auth
export const auth = (...requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
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
                role?: string;
            };
            
            // Check if user has required role (if roles are specified)
            if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role || '')) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden - Insufficient permissions",
                });
            }
            
            (req as any).user = decoded;
            
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token",
            });
        }
    };
}

