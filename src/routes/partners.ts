
import { Application, Request, Response } from 'express';
import { PartnerController } from '../controllers/partnerController';
import { AuthController } from '../controllers/authController';

export class PartnersRoutes {

    private partnerController: PartnerController = new PartnerController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {
        
        app.post('/partner', (req: Request, res: Response) => {
            this.authController.isSignIn,
            this.partnerController.createPartner(req, res);
        });

        app.get('/partners', (req: Request, res: Response) => {
            this.authController.isSignIn,
            this.partnerController.getPartners(req, res);
        });
    }
}