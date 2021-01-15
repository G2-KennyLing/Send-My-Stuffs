import { IPartner } from './model';
import Partner from './schema';

export default class PartnerService {
    
    public createPartner(partnerParams: IPartner, callback: any) {
        const _session = new Partner(partnerParams);
        _session.save(callback);
    }

    public filterAllPartners(query: any, callback: any) {
        return Partner.find(query, callback);
    }

    public filterPartner(query: any, callback: any) {
        Partner.findOne(query, callback);
    }
    
}