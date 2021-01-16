import { ISeaport } from './model';
import Seaports from './schema';

export default class SeaportService {
    
    public createSeaport(seaportParams: ISeaport, callback: any) {
        const _session = new Seaports(seaportParams);
        _session.save(callback);
    }

    public filterSeaport(query: any, callback: any) {
		seaports.find(query, callback);
    }
    
    public filterDetailSeaport(query: any, callback: any) {
		Seaports.findOne(query, callback);
	}
}