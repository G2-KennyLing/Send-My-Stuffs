import { ModificationNote } from "../common/model";
enum status {
    ACTIVE = 0,
    INACTIVE
  }
export interface IPartner {
    _id?: String;
    companyName: String,
    domainName: String,
    workGroup: String,
    companyType: String,
    industry: String,
    taxID: String,
    country: String,
    city: String,
    addressLineFirst: String,
    addressLineSecond: String,
    telephone: String,
    facismile: String,
    salesID: String,
    wallet: String,
    user: Number,
    peer: Number,
    logo: String,
    status: status,
    modification_notes: ModificationNote[]
}