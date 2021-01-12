import { Application, Request, Response } from 'express';
import { SeaportController } from '../controllers/seaportController';

export class SeaportRoutes {

    private seaportController: SeaportController = new SeaportController();

    public route(app: Application) {
        app.post('/seaport', (req: Request, res: Response) => {
            this.seaportController.createSeaport(req, res);
        }); 

        
    }
}