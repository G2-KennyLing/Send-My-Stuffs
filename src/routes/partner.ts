
import { Application, Request, Response } from 'express';
import { PartnerController } from '../controllers/partnerController';
import { AuthController } from '../controllers/authController';

export class PartnerRoutes {

    private partnerController: PartnerController = new PartnerController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {
        const isSignIn = this.authController.isSignIn;

        app.post('/partner',  (req: Request, res: Response) => {
            this.partnerController.createPartner(req, res);
        });

        app.get('/partners', isSignIn, (req: Request, res: Response) => {
            this.partnerController.getListPartners(req, res);
        });

        app.get('/partner/:id', isSignIn, (req: Request, res: Response) => {
            this.partnerController.getPartner(req, res);
        });

        app.put('/partner/:id', isSignIn, (req: Request, res: Response) => {
            this.partnerController.updatePartner(req, res);
        });
    }
}