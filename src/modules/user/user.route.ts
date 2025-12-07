import {Router} from 'express';
import { UserController } from './User.Controller';
import { auth } from '../../middleware/auth';
import { Rolers } from '../auth/auth.constance';

const router = Router();


router.post('/', UserController.createUser)

router.get('/', auth(Rolers.ADMIN), UserController.getAllUser)

router.get('/:email', UserController.getSingleUser)




export const userRoute = router;