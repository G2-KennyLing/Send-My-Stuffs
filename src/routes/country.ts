import { Application, Request, Response } from "express";
import { CountryController } from '../controllers/countryController';
import { AuthController } from '../controllers/authController';

export class CountryRoutes {
	private countryController: CountryController = new CountryController();
	private authController: AuthController = new AuthController();
	
	public route(app: Application) {

		const isSignIn = this.authController.isSignIn;

		app.post('/country', isSignIn, (req: Request, res: Response) => {
			this.countryController.createCountry(req, res);
		});

		app.get('/countries', isSignIn, (req: Request, res: Response) => {
			this.countryController.getListCountries(req, res);
		})

		app.get('/detail-country/:id', isSignIn, (req: Request, res: Response) => {
			this.countryController.getCountry(req, res);
		})
	}
}