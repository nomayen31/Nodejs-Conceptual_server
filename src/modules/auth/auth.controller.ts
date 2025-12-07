import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Controller for authentication routes
export const authController = {
  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // TODO: Implement actual user authentication logic
      // This is a placeholder - you should verify credentials against your database
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const secret = process.env.SECRET_KEY;
      if (!secret) {
        throw new Error("SECRET_KEY is not set");
      }

      // TODO: Replace with actual user data from database after verification
      const user = {
        id: 1,
        name: "Example User",
        email: email,
        age: 25,
      };

      // Generate JWT token
      const token = jwt.sign(user, secret, { expiresIn: "24h" });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Login failed",
        error: error.message,
      });
    }
  },
};

// Middleware for protecting routes
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error("SECRET_KEY is not set");
    }
    

    const decoded = jwt.verify(token, secret) as DecodedUser;

    // attach user to request (simple way)
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
