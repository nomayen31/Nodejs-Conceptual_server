import {Router} from 'express';
import { auth } from '../../middleware/auth';
import { authController } from './auth.controller';

const router = Router();

router.post('/login', authController.loginUser)



export const authRoute = router;