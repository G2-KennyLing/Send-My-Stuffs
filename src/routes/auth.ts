import { AuthController } from './../controllers/authController';
import { Application, Request, Response } from 'express';
export class AuthRoutes{
    private authController: AuthController = new AuthController();

    public route(app: Application) {
        const isSignIn = this.authController.isSignIn;

        app.post("/auth/login", (req: Request, res: Response) =>{
            this.authController.signIn(req, res);
        })

        app.post("/auth/logout", isSignIn, (req: Request, res: Response) =>{
            this.authController.signOut(req, res);
        })
    }
}