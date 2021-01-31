import { ISeaport } from './model';
import Seaports from './schema';

export default class SeaportService {
    
    public createSeaport(seaportParams: ISeaport, callback: any) {
        const _session = new Seaports(seaportParams);
        _session.save(callback);
    }

    public filterSeaports(query: any, callback: any) {
		Seaports.find(query, callback).populate('country', 'countryName');
    }
    public filterSeaport(query: any, callback: any) {
        Seaports.findOne(query, callback).populate('country', 'countryName');
    }
    public updateSeaport(seaportParams: ISeaport, callback: any) {
        const query = { _id: seaportParams._id };
        Seaports.findOneAndUpdate(query, seaportParams,{new: true}, callback);
    }
   
}