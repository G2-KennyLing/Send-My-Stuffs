import { IPartner } from './model';
import Partner from './schema';

export default class PartnerService {
    
    public createPartner(partnerParams: IPartner, callback: any) {
        const _session = new Partner(partnerParams);
        _session.save(callback);
    }

    public filterPartners(param: any,query: any, callback: any) {
        const limit =  param.limit;
        const page = param.page;
        return Partner.find(query, callback).limit(limit * 1 ).skip((page - 1) * limit);
    }

    public filterPartner(query: any, callback: any) {
        Partner.findOne(query, callback);
    }

    public updatePartner(partnerParams: IPartner, callback: any) {
        const query = { _id: partnerParams._id };
        Partner.findOneAndUpdate(query, partnerParams, callback);
    }

}