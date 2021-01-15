import { ISeaport } from './model';
import seaports from './schema';

export default class SeaportService {
    
    public createSeaport(seaportParams: ISeaport, callback: any) {
        const _session = new seaports(seaportParams);
        _session.save(callback);
    }

    public filterSeaport(query: any, callback: any) {
		seaports.find(query, callback);
	}
}