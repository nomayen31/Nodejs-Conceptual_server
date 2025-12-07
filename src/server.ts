import 'dotenv/config';
import express, { Request, Response } from 'express';
import { userRoute } from './modules/user/user.route';
import { connentDB } from './Database/DB';
import { authRoute } from './modules/auth/auth.route';

const app = express();
app.use(express.json());

const port = 5000;
connentDB();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "This is Root Route",
        path: req.path,
    })
});
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
