import { Application, Request, Response } from 'express';
import { PartnerController } from '../controllers/partnerController';

export class PartnerRoutes {

    private partnerController: PartnerController = new PartnerController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            this.partnerController.createPartner(req, res);
        });

        app.get('/api/user/:id', (req: Request, res: Response) => {
            this.partnerController.getPartner(req, res);
        });

        app.put('/api/user/:id', (req: Request, res: Response) => {
            this.partnerController.updatePartner(req, res);
        });

        app.delete('/api/user/:id', (req: Request, res: Response) => {
            this.partnerController.deletePartner(req, res);
        });

    }
}