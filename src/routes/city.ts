import { Application, Request, Response } from 'express';
import { AuthController } from '../controllers/authController';
import { CityController } from '../controllers/cityController';

export class CityRoutes {

    private cityController: CityController = new CityController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {
        
        const isSignIn = this.authController.isSignIn;
        
        app.post('/city', isSignIn, (req: Request, res: Response) => {
            this.cityController.createCity(req, res);
        }); 

        app.get('/cities', isSignIn, (req: Request, res: Response) => {
            this.cityController.getlistCity(req, res);
        }); 
        

    }
}