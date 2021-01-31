import { ICountry } from './model';
import Country  from './schema';

export default class CountryService {

	public createCountry(countryParams: ICountry, callback:any) {
		const _session = new Country(countryParams);
		_session.save(callback);
	}

	public filterCountries(query: any, callback?: any) {
		return Country.find(query, callback).populate('seaPorts', 'seaportName').populate('airPorts', 'airportName');
	}

	public filterCountry(query: any, callback: any) {
		Country.findOne(query, callback).populate('seaPorts', 'seaportName').populate('airPorts', 'airportName')
	}

	public updateCountry(countryParams: ICountry, callback: any) {
		const query = { _id: countryParams._id };
		Country.findOneAndUpdate(query, countryParams, callback)
	}

}