import { IAirport } from './model';
import Airports from './schema';

export default class AirportService {
    
    public createAirport(airportParams: IAirport, callback: any) {
        const _session = new Airports(airportParams);
        _session.save(callback);
    }

    public filterAirport(query: any, callback: any) {
        Airports.findOne(query, callback);
    }

    public filterAriports(query: any, callback: any) {
		Airports.find(query, callback);
    }

   
}