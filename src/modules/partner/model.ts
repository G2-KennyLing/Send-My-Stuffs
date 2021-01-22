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
    partnerType: String,
    industry: String,
    taxID: Number,
    country: String,
    city: String,
    addressLineFirst: String,
    addressLineSecond: String,
    telephone: String,
    facsimile: Number,
    salesID: String,
    wallet: Number,
    user: Number,
    peer: Number,
    logo: String,
    status: status,
    deletedAt?: Date;
    modificationNotes: ModificationNote[]
}