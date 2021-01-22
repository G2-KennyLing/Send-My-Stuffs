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

    public updateAirport(airportParams: IAirport, callback: any) {
        const query = { _id: airportParams._id };
        Airports.findOneAndUpdate(query, airportParams,{new: true}, callback);
    }

    public deleteAirport(_id: String ,query: any, callback: any){
        Airports.findByIdAndUpdate(_id, query,{new: true}, callback);
    }

    public isDelete(_id: String, callback: any) {
        const query = { _id: _id };
        Airports.deleteOne(query, callback);
    }
   
}