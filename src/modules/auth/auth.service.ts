import { pool } from "../../Database/DB"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("SECRET_KEY is not set in environment");
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      role: user.role,
    },
    secret, 
    { expiresIn: "7d" }
  );

  delete (user as any).password;
  delete (user as any).password;

  return { user, token };
};

export const authService = {
  loginUser
};
