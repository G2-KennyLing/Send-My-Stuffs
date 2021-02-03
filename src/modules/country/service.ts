import { ICountry } from './model';
import Countries  from './schema';
import Cities from '../city/schema';

export default class CountryService {

	public createCountry(countryParams: ICountry, callback:any) {
		const _session = new Countries(countryParams);
		_session.save(callback);
	}

	public filterCountries(query: any, callback: any) {
		Countries.find(query, callback).populate('city','cityName').populate('seaPorts', 'seaportName').populate('airPorts', 'airportName');
	}

	public filterCitiesByCountryId(query: any, callback: any){
		Cities.find(query, callback);
	}

	public filterCountry(query: any, callback: any) {
		Countries.findOne(query, callback).populate('city','cityName').populate('seaPorts', 'seaportName').populate('airPorts', 'airportName')
	}

	public updateCountry(countryParams: ICountry, callback: any) {
		const query = { _id: countryParams._id };
		Countries.findOneAndUpdate(query, countryParams, callback)
	}

}