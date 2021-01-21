import { IPartner } from './model';
import Partner from './schema';

export default class PartnerService {
    
    public createPartner(partnerParams: IPartner, callback: any) {
        const _session = new Partner(partnerParams);
        _session.save(callback);
    }

    public filterPartners(query: any, callback: any) {
        return Partner.find(query, callback).populate('country').populate('city').populate('salesID');
    }

    public filterPartner(query: any, callback: any) {
        Partner.findOne(query, callback).populate('country', 'countryName').populate('city').populate('salesID');
    }

    public updatePartner(partnerParams: IPartner, callback: any) {
        const query = { _id: partnerParams._id };
        Partner.findOneAndUpdate(query, partnerParams, callback);
    }

}