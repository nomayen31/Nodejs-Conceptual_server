import { pool } from "../../Database/DB";
import bcrypt from 'bcryptjs';

const CreateUserIntoDB = async (payload: Record<string, unknown>) =>{
    const {name, email, password, age} = payload;
    const hashedPassword = await bcrypt.hash(password as string, 10);
    const result = await pool.query(
        `
        insert into users (name, email, password, age, role, created_at, updated_at)
        values ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `,
        [name, email, hashedPassword, age, 'user', new Date(), new Date()]
    )
    delete result.rows[0].password;
    return result.rows[0];
}

const getAllUserFromDB = async () => {
    const result = await pool.query(
        `
        SELECT id, name, email, age, role, created_at, updated_at FROM users
        `
    )
    return result.rows;
}

const getSingleUserIntoDB = async (email: string) => {
    const result = await pool.query(
        'SELECT id, name, email, age, role, created_at, updated_at FROM users WHERE email = $1',
        [email]
    )
    return result.rows[0]
}


export const UserService = {
    CreateUserIntoDB,
    getAllUserFromDB,
    getSingleUserIntoDB,
}
