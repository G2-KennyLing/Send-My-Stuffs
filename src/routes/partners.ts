
import { Application, Request, Response } from 'express';
import { PartnerController } from '../controllers/partnerController';
import { AuthController } from '../controllers/authController';

export class PartnersRoutes {

    private partnerController: PartnerController = new PartnerController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {

        const isSignIn = this.authController.isSignIn;
        
        app.post('/partner',isSignIn, (req: Request, res: Response) => {
            this.partnerController.createPartner(req, res);
        });

        app.get('/partners',isSignIn, (req: Request, res: Response) => {
            this.partnerController.getPartners(req, res);
        });

        app.get('/partner/:id',isSignIn, (req: Request, res: Response) => {
            this.partnerController.partnerDetail(req, res);
        });

        app.put('/partner/:id',isSignIn, (req: Request, res: Response) => {
            this.partnerController.updatePartner(req, res);
        });
    }
}