import { Application, Request, Response } from 'express';
import { AuthController } from '../controllers/authController';
import { AirportController } from '../controllers/airportController';

export class AirportRoutes {

    private airportController: AirportController = new AirportController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {

        const isSignIn = this.authController.isSignIn;

        app.post('/airport', isSignIn, (req: Request, res: Response) => {
            this.airportController.createAirport(req, res);
        });      
    }
}