import { Application, Request, Response } from 'express';
import { AuthController } from '../controllers/authController';
import { AriportController } from '../controllers/ariportController';

export class AriportRoutes {

    private ariportController: AriportController = new AriportController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {

        const isSignIn = this.authController.isSignIn;

        app.post('/ariport', isSignIn, (req: Request, res: Response) => {
            this.ariportController.createAriport(req, res);
        });      
    }
}