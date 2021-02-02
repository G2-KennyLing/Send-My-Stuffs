import { ICity } from './model';
import Citys from './schema';

export default class CityService {
    public createCity(cityParams: ICity, callback: any) {
        const _session = new Citys(cityParams);
        _session.save(callback);
    }
    public filterCity(query: any, callback: any) {
        Citys.findOne(query, callback).populate('country', 'countryName');
    }

    public filterCities(query: any, callback: any) {
        Citys.find(query, callback).populate('country', 'countryName');
    }
}