import { ICountry } from './model';
import country  from './schema';

export default class CountryService {

	public createNewCountry(countryParams: ICountry, callback:any) {
		const _session = new country(countryParams);
		_session.save(callback);
	}

	public getListCountry(query: any, callback: any) {
		country.find(query, callback);
	}

	public getDetailCountry(query: any, callback: any) {
		country.findById(query, callback)
	}

	public updateCountry(countryParams: ICountry, callback: any) {
		const query = { _id: countryParams._id };
		country.findOneAndUpdate(query, countryParams, callback)
	}

}