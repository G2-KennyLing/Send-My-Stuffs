import { ICountry } from './model';
import country  from './schema';

export default class CountryService {

	public createNewCountry(countryParams: ICountry, callback:any) {
		const _session = new country(countryParams);
		_session.save(callback);
	}

}