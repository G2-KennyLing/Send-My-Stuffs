import { ICity } from './model';
import City from './schema';

export default class CityService {
    public createCity(cityParams: ICity, callback: any) {
        const _session = new City(cityParams);
        _session.save(callback);
    }
    public filterCity(query: any, callback: any) {
        City.findOne(query, callback);
    }
}