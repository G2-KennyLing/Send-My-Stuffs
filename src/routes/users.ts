import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { PremissionController } from '../controllers/premissionController';

export class UsersRoutes {

    private userController: UserController = new UserController();
    private authController: AuthController = new AuthController();
    private premissionController: PremissionController = new PremissionController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            this.authController.isSignin,
            this.userController.createUser(req, res);
        });
        app.get("/api/userList", 
        this.authController.isSignin, 
        this.authController.isAdmin,
        (req: Request, res: Response) =>{
            this.userController.getAllUser(req, res);
        });
        app.get("/api/user/:id", (req: Request, res: Response) =>{
            this.authController.isSignin,
            this.userController.getUserDetail(req, res);
        });
        
    }
}