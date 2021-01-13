import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { PremissionController } from '../controllers/premissionController';

export class UsersRoutes {

    private userController: UserController = new UserController();
    private authController: AuthController = new AuthController();
    private premissionController: PremissionController = new PremissionController();

    public route(app: Application) {
        
        app.post('/api/user', 
        this.authController.isSignIn,
        (req: Request, res: Response) => {
            this.userController.createUser(req, res);
        });
        app.get("/user/:userType", 
        this.authController.isSignIn, 
        (req: Request, res: Response) =>{
            this.userController.getAllUser(req, res);
        });
        app.get("/user/:id", 
            this.authController.isSignIn,
            (req: Request, res: Response) =>{
            this.userController.getUserDetail(req, res);
        });
        app.put("/user/:id",
        this.authController.isSignIn, 
        (req: Request, res: Response) =>{
            this.userController.updateUser(req, res);
        });
        app.post("/user/forgotPassword", (req: Request, res: Response) =>{
            this.userController.forgotPassword(req, res);
        })
        app.post("/user/resetPassword", (req: Request, res: Response) =>{
            this.userController.resetPassword(req, res);
        })
    }
}