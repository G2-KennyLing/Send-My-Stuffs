import { IPartner } from './model';
import Partners from './schema';

export default class PartnerService {
    
    public createPartner(partnerParams: IPartner, callback: any) {
        const _session = new Partners(partnerParams);
        _session.save(callback);
    }

    public filterPartners(param: any,query: any, callback: any) {
        const limit =  param.limit;
        const page = param.page;
        Partners.find(query, callback).populate('country', 'countryName').populate('city').populate('salesID').limit(limit * 1 ).skip((page - 1) * limit);;
    }

    public filterPartner(query: any, callback: any) {
        Partners.findOne(query, callback).populate('country', 'countryName').populate('city').populate('salesID');
    }

    public updatePartner(partnerParams: IPartner, callback: any) {
        const query = { _id: partnerParams._id };
        Partners.findOneAndUpdate(query, partnerParams, callback);
    }

    public updatePartnerDelete(_id: String ,query: any, callback: any){
        Partners.findByIdAndUpdate(_id, query,{new: true}, callback);
    }


    public deletePartner(_id: String, callback: any) {
        const query = { _id: _id };
        Partners.deleteOne(query, callback);
    }

}