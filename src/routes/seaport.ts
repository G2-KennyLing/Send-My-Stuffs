import { Application, Request, Response } from 'express';
import { SeaportController } from '../controllers/seaportController';
import { AuthController } from '../controllers/authController';

export class SeaportRoutes {

    private seaportController: SeaportController = new SeaportController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {
        const isSignIn = this.authController.isSignIn;
        app.post('/seaport', isSignIn,(req: Request, res: Response) => {
            this.seaportController.createSeaport(req, res);
        }); 

        
    }
}