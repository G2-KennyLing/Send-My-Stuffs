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
				seaPorts: req.params.seaPorts,
				airPorts: req.body.airPorts,
				agents: req.body.agents,
				customers: req.body.customers,
			}; 
			this.countryService.createCountry(countryParams, (err: any, countryData: ICountry) => {
				if (err) {
					mongoError(err, res)
				} else {
					successResponse('Country created successfull', countryData, res);
				}
			});
		} else {
			insufficientParameters(res);
		}
	}

	public getListCountries(req: Request, res: Response) {
		this.countryService.filterCountries({}, (err: any, countryData: ICountry) => {
			if (err) {
				return mongoError(err, res);
			}else {
				successResponse("Get list countries successfull", countryData, res)
			}
		})
	}

	public getCountry(req: Request, res: Response) {
		const detailCountryId = { _id: req.params.id };
		this.countryService.filterCountry( detailCountryId, (err: any, countryData: ICountry) => {
			if (!countryData) {
				failureResponse("Detail country not found", countryData, res)
			}else {
				successResponse("Get detail country successfull", countryData, res)
			}
		});
	}

	public updateCountry(req: Request, res: Response) {
		const updateCountryId = { _id: req.params.id };
		const { countryCode, countryName, region, timeZone, seaPorts, airPorts, agents, customers } = req.body;
		if (!(countryCode && countryName && region && timeZone && seaPorts && airPorts && agents && customers)) {
			return insufficientParameters(res)
		} const countryParams: ICountry = {
			_id: req.params.id, 
			countryCode: countryCode,
			countryName: countryName,
			region: region,
			timeZone: timeZone,
			seaPorts: seaPorts,
			airPorts: airPorts,
			agents: agents,
			customers: customers
		}
		this.countryService.updateCountry(countryParams, (err: any, countryData: ICountry) => {
			if (err) {
				return mongoError(err, res)
			} 
			if (!countryData) {
				return failureResponse("Update Country Failed", {}, res)
			} else {
				successResponse("Update Country successful", { countryData }, res)
			}
		})
	}
}