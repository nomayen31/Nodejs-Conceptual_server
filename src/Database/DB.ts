import { Pool } from "pg";

export const pool = new Pool ({
    connectionString: 'postgresql://neondb_owner:npg_WZ9YoMuIH0Da@ep-green-butterfly-a1u0k56a-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})
export const connentDB = async() =>{
    // Create table if not exists
    await pool.query(
        `
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password TEXT NOT NULL,
            age INT NOT NULL,
            role VARCHAR(50) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `
    )
    
    // Add role column if it doesn't exist (for existing tables)
    try {
        await pool.query(
            `
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'
            `
        )
    } catch (error) {
        console.log("Role column already exists or error adding it");
    }
    
    console.log("Database Connected");
    
}