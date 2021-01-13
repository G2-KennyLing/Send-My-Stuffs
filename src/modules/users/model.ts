import { ModificationNote } from "../common/model";

enum role {
    USER = 0,
    SALES,
    PANTNER,
    CUSTOMERSERVICE,
    ADMIN,
    SUPERADMIN
};
enum userType {
    USER =0,
    PANTNER
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
    userType: userType;
    deletedAt?: Date;
    modificationNotes: ModificationNote[]
}