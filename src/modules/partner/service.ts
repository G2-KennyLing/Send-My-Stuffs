import { IPartner } from './model';
import Partner from './schema';

export default class PartnerService {
    
    public createPartner(partnerParams: IPartner, callback: any) {
        const _session = new Partner(partnerParams);
        _session.save(callback);
    }

    public filterPartners(query: any, callback: any) {
        return Partner.find(query, callback);
    }

    public filterPartner(query: any, callback: any) {
        Partner.findOne(query, callback);
    }

    public updatePartner(partnerParams: IPartner, callback: any) {
        const query = { _id: partnerParams._id };
        Partner.findOneAndUpdate(query, partnerParams, callback);
    }

    public updatePartnerDelete(_id: String ,query: any, callback: any){
        Partner.findByIdAndUpdate(_id, query,{new: true}, callback);
    }


    public deletePartner(_id: String, callback: any) {
        const query = { _id: _id };
        Partner.deleteOne(query, callback);
    }

}