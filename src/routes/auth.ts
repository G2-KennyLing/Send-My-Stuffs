import { AuthController } from './../controllers/authController';
import { Application, Request, Response } from 'express';

export class AuthRoutes{
    private authController: AuthController = new AuthController();

    public route(app: Application) {
        app.post("/api/signin", (req: Request, res: Response) =>{
            this.authController.signin(req, res);
        })
    }
}