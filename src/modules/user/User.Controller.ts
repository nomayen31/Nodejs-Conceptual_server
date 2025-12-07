import {Request, Response} from 'express';
import { UserService } from './User.Service';
import { pool } from '../../Database/DB';
const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.CreateUserIntoDB(req.body)
    return res.status(201).json({
        success: true,
        message: "User Created",
        user,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Not Created",
            error: error
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUserFromDB()
    return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
    })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const {email} = req.params;
        const user = await UserService.getSingleUserIntoDB(email)
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with email '${email}' not found`,
            })
        }
        
    return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
    })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
}