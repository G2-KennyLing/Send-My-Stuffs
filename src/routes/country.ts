import { Application, Request, Response } from "express";
import { CountryController } from '../controllers/countryController';

export class CountryRoutes {
	private countryController: CountryController = new CountryController();
	public route(app: Application) {

		app.post('/api/country', (req: Request, res: Response) => {
			this.countryController.createCountry(req, res);
		});

	}
}