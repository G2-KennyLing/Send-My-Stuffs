import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

export class UsersRoutes {

    private userController: UserController = new UserController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            this.userController.createUser(req, res);
        });
    }
}