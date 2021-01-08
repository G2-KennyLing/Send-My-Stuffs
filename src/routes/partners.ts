import { Application, Request, Response } from 'express';
import { PartnerController } from '../controllers/partnerController';

export class PartnersRoutes {

    private partnerController: PartnerController = new PartnerController();

    public route(app: Application) {
        
        app.post('/partner/create', (req: Request, res: Response) => {
            this.partnerController.createPartner(req, res);
        });

        app.get('/partner/list', (req: Request, res: Response) => {
            this.partnerController.listPartner(req, res);
        });
    }
}