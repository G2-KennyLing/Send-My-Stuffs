import { Application, Request, Response } from "express";
import { StateController } from '../controllers/statesController';

export class StateRoutes {
	private statesController: StateController = new StateController();

	public route(app: Application) {
		app.post('/state', (req: Request, res: Response) => {
			this.statesController.createStates(req, res);
		})
	}
}