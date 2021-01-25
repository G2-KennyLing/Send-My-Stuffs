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

		app.get('/state/:id', (req: Request, res: Response) => {
			this.statesController.getState(req, res)
		})

		app.put('/state/:id', (req: Request, res: Response) => {
			this.statesController.updateState(req, res)
		})

		app.delete('/state/:id', (req: Request, res: Response) => {
			this.statesController.isDelete(req, res)
		})
	}
}