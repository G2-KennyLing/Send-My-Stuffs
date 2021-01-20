import { Application, Request, Response } from "express";
import { StateController } from '../controllers/statesController';

export class StateRoutes {
	private statesController: StateController = new StateController();

	public route(app: Application) {
		app.post('/state', (req: Request, res: Response) => {
			this.statesController.createStates(req, res);
		})

		app.get('/states', (req: Request, res: Response) => {
			this.statesController.getListStates(req, res)
		})

		app.get('/detail-state/:id', (req: Request, res: Response) => {
			this.statesController.getDetailStates(req, res)
		})

		app.put('/update-state/:id', (req: Request, res: Response) => {
			this.statesController.updateState(req, res)
		})
	}
}