import { Application, Request, Response } from 'express';
import { PartnerController } from '../controllers/partnerController';

export class PartnersRoutes {

    private partnerController: PartnerController = new PartnerController();

    public route(app: Application) {
        
        app.post('/partner', (req: Request, res: Response) => {
            this.partnerController.createPartner(req, res);
        });
    }
}