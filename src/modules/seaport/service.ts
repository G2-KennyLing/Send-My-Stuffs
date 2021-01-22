import { ISeaport } from './model';
import Seaports from './schema';

export default class SeaportService {
    
    public createSeaport(seaportParams: ISeaport, callback: any) {
        const _session = new Seaports(seaportParams);
        _session.save(callback);
    }

    public filterSeaports(query: any, callback: any) {
		Seaports.find(query, callback);
    }
    public filterSeaport(query: any, callback: any) {
        Seaports.findOne(query, callback);
    }
    public updateSeaport(seaportParams: ISeaport, callback: any) {
        const query = { _id: seaportParams._id };
        Seaports.findOneAndUpdate(query, seaportParams,{new: true}, callback);
    }
    public deleteSeoport(_id: String ,query: any, callback: any){
        Seaports.findByIdAndUpdate(_id, query,{new: true}, callback);
    }

    public isDelete(_id: String, callback: any) {
        const query = { _id: _id };
        Seaports.deleteOne(query, callback);
    }

}