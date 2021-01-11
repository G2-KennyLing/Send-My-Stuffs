import { ModificationNote } from "../common/model";

enum role {
    USER = 0,
    SALES,
    CUSTOMER_SERVICE,
    PANTNER,
    ADMIN,
    SUPERADMIN,
}
export interface IUser {
    _id?: String;
    name: {
        firstName: String;
        lastName: String;
    };
    telephone: String;
    mobile: String;
    email: String;
    password: String;
    dateOfBirth: Date;
    companyName: String;
    companyRole: role;
    lastActivity?: Date;
    daysSinceLogin?: Number;
    deletedAt?: Date;
    modificationNotes: ModificationNote[]
}