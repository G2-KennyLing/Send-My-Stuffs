import { ModificationNote } from './../modules/common/model';
import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ICountry } from '../modules/country/model';
import CountryService from '../modules/country/service';

export class CountryController {
	private countryService: CountryService = new CountryService();

	public createCountry(req: Request, res: Response) {
		const { countryCode, countryName, region, timeZone, seaPorts, agents, customers } = req.body;
		if (countryCode && countryName && region && timeZone && seaPorts && agents && customers) {
			const countryParams: ICountry = {
				countryCode: countryCode,
				countryName: countryName,
				region: region,
				timeZone: timeZone,
				seaPorts: seaPorts,
				// airPorts: airPorts,
				agents: agents,
				customers: customers,
				modificationNotes: [{
					modifiedOn: new Date(Date.now()),
					modifiedBy: null,
					modificationNote: "Create country successful",
				}]
			}; 
			this.countryService.createCountry(countryParams, (err: any, countryData: ICountry) => {
				if (err) {
					mongoError(err, res)
				} else {
					successResponse('Country created successful', countryData, res);
				}
			});
		} else {
			insufficientParameters(res);
		}
	}

	public getListCountries(req: Request, res: Response) {
		this.countryService.filterCountries( (err: any, countryData: ICountry) => {
			if (err) {
				mongoError(err, res);
			}else {
				successResponse("Get list countries successful", countryData, res)
			}
		})
	}

	public getCountry(req: Request, res: Response) {
		const detailCountryId = { _id: req.params.id };
		this.countryService.filterCountry( detailCountryId, (err: any, countryData: ICountry) => {
			if (!countryData) {
				failureResponse("Detail country not found", countryData, res)
			}else {
				successResponse("Get detail country successful", countryData, res)
			}
		});
	}

	public updateCountry(req: Request, res: Response) {
		const { countryCode, countryName, region, timeZone, seaPorts, airPorts, agents, customers } = req.body;
		if (countryCode && countryName && region && timeZone && seaPorts && airPorts && agents && customers) {
			const updateCountryId = { _id: req.params.id };
			this.countryService.filterCountry(updateCountryId, (err: any, countryData: ICountry) => {
				 if(err) {
					return mongoError(err, res)
				 }
				 if(countryData) {
					const countryParams: ICountry = {
						_id: req.params.id, 
						countryCode: countryCode ? countryCode : countryData.countryCode,
						countryName: countryName ? countryName : countryData.countryName,
						region: region ? region : countryData.region,
						timeZone: timeZone ? timeZone : countryData.timeZone,
						seaPorts: seaPorts ? seaPorts : countryData.seaPorts,
						airPorts: airPorts,
						agents: agents ? agents : countryData.agents,
						customers: customers ? customers : countryData.customers,
						modificationNotes: [{
							modifiedOn: new Date(Date.now()),
    						modifiedBy: null,
    						modificationNote: "Country data updated",
						}]
					};
					this.countryService.updateCountry(countryParams, (err: any) => {
						if(err){
							mongoError(err, res)
						} else {
							successResponse("Update country successful", countryParams, res)
						}
					});
				}else {
					failureResponse("invalid country", null, res)
				}
			})	
		} 
		
	}
}