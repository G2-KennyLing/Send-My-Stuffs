import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';

export class UserRoutes {

    private userController: UserController = new UserController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {

        const isSignIn = this.authController.isSignIn;
        const isAdmin = this.authController.isAdmin;
        const isSuperAdmin = this.authController.isSuperAdmin;

        app.post('/user', isSignIn, (req: Request, res: Response) => {
            this.userController.createUser(req, res);
        });

        app.get('/users', isSignIn, (req: Request, res: Response) =>{
            this.userController.getListUsers(req, res);
        });

        app.get('/user/:id', isSignIn, (req: Request, res: Response) =>{
            this.userController.getUser(req, res);
        });

        app.post('/forgot-password', isSignIn, (req: Request, res: Response) =>{
            this.userController.forgotPassword(req, res);
        })

        app.post("/user/reset-password", isSignIn, (req: Request, res: Response) =>{
            this.userController.resetPassword(req, res);
        })
    }
}