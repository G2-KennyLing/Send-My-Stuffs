import { Application, Request, Response } from "express";
import { CountryController } from '../controllers/countryController';

export class CountryRoutes {
	private countryController: CountryController = new CountryController();
	public route(app: Application) {

		app.post('/api/country', (req: Request, res: Response) => {
			this.countryController.createCountry(req, res);
		});

		app.get('/api/list-country', (req: Request, res: Response) => {
			this.countryController.getListCountry(req, res);
		})

		app.get('/api/detail-country/:id', (req: Request, res: Response) => {
			this.countryController.getDetailCountry(req, res);
		})

		app.put('/update-country/:id', (req: Request, res: Response) => {
			this.countryController.updateCountry(req, res);
		})
	}
}