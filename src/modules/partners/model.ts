import { ModificationNote } from "../common/model";
enum status {
    ACTIVE = 0,
    UNACTIVE
  }
export interface IPartner {
    _id?: String;
    companyName: String,
    companyType: String,
    country: String,
    city: String,
    region: String,
    addressLineFirst: String,
    addressLineSecond: String,
    telephone: String,
    facismile: String,
    domainName: String,
    industry: String,
    taxID: String,
    partnerGroup: String,
    name: {
            firstName: String,
            lastName: String,
    },
    dateOfBirth: Date,
    handphone: String,
    email: String,
    alternateEmail: String,
    directLine: String,
    status: status,
    icon: String,
    modification_notes: ModificationNote[]
}