import { IAriport } from './model';
import Ariports from './schema';

export default class AriportService {
    
    public createAriport(ariportParams: IAriport, callback: any) {
        const _session = new Ariports(ariportParams);
        _session.save(callback);
    }

    public filterAriport(query: any, callback: any) {
        Ariports.findOne(query, callback);
    }

   
}