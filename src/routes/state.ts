import { Application, Request, Response } from "express";
import { StateController } from '../controllers/statesController';
import { AuthController } from '../controllers/authController';

export class StateRoutes {
	private statesController: StateController = new StateController();
	private authController: AuthController = new AuthController();

	public route(app: Application) {
		const isSignIn = this.authController.isSignIn;

		app.post('/state', isSignIn, (req: Request, res: Response) => {
			this.statesController.createStates(req, res);
		})

		app.get('/states', isSignIn, (req: Request, res: Response) => {
			this.statesController.getListStates(req, res)
		})

		app.get('/state/:id', isSignIn, (req: Request, res: Response) => {
			this.statesController.getState(req, res)
		})

		app.put('/state/:id', isSignIn, (req: Request, res: Response) => {
			this.statesController.updateState(req, res)
		})

		app.delete('/state/:id', isSignIn, (req: Request, res: Response) => {
			this.statesController.isDelete(req, res)
		})
	}
}