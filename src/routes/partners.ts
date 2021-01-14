
import { Application, Request, Response } from 'express';
import { PartnerController } from '../controllers/partnerController';
import { AuthController } from '../controllers/authController';
<<<<<<< HEAD
=======

>>>>>>> develop

export class PartnersRoutes {

    private partnerController: PartnerController = new PartnerController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {
        
        app.post('/partner', (req: Request, res: Response) => {
            this.authController.isSignIn,
            this.partnerController.createPartner(req, res);
        });

        app.get('/partner/list', (req: Request, res: Response) => {
            this.authController.isSignIn,
            this.partnerController.listPartner(req, res);
        });
    }
}