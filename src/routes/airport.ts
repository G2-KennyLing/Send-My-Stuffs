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
        
        app.get('/airports', isSignIn,(req: Request, res: Response) => {
            this.airportController.getListAirports(req, res);
        }); 

        app.get('/airport/:id', isSignIn,(req: Request, res: Response) => {
            this.airportController.getAirport(req, res);
        }); 

        app.put('/airport/:id', isSignIn,(req: Request, res: Response) => {
            this.airportController.updateAirport(req, res);
        });

        app.delete('/airport/:id',isSignIn, (req: Request, res: Response) => {
            this.airportController.isDelete(req, res);
        }); 

    }
}