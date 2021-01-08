import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';

export class UsersRoutes {

    private userController: UserController = new UserController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            this.userController.createUser(req, res);
        });
        app.get("/api/userList", 
        this.authController.isSignin, 
        this.authController.isAdmin,
        (req: Request, res: Response) =>{
            this.userController.getAllUser(req, res);
        });
        app.get("/api/user/:id", (req: Request, res: Response) =>{
            this.userController.getUserDetail(req, res);
        });
        app.put("/api/user/:id", 
        this.authController.isSignin,
         (req: Request, res: Response) =>{
            this.userController.updateUser(req, res);
        });
        app.put("/api/user/byAdmin/:id",
        this.authController.isSignin, 
        this.authController.isAdmin, 
        (req: Request, res: Response) =>{
            this.userController.updateUserByAdmin(req, res);
        })
    }
}