import { ICountry } from './model';
import Country  from './schema';

export default class CountryService {

	public createCountry(countryParams: ICountry, callback:any) {
		const _session = new Country(countryParams);
		_session.save(callback);
	}

	public filterCountries(query: any, callback: any) {
		Country.find(query, callback);
	}

	public filterCountry(query: any, callback: any) {
		Country.findOne(query, callback)
	}

}