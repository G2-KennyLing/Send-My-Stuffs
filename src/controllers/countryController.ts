import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ICountry } from '../modules/country/model';
import CountryService from '../modules/country/service';

export class CountryController {
	private countryService: CountryService = new CountryService();

	public createCountry(req: Request, res: Response) {
		const { countryCode, countryName, region, timeZone, seaPorts, airPorts, agents, customers } = req.body;
		if (countryCode && countryName && region && timeZone && seaPorts && airPorts && agents && customers) {
			const countryParams: ICountry = {
				countryCode: req.body.countryCode,
				countryName: req.body.countryName,
				region: req.body.region,
				timeZone: req.body.timeZone,
				// seaPorts: req.params.seaPorts,
				airPorts: req.body.airPorts,
				agents: req.body.agents,
				customers: req.body.customers,
			}; 
			this.countryService.createNewCountry(countryParams, (err: any, countryData: ICountry) => {
				if (err) {
					mongoError(err, res)
				} else {
					successResponse('Country created success', countryData, res);
				}
			});
		} else {
			insufficientParameters(res);
		}
	}
}