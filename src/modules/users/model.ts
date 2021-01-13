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
};
enum premission{
    CREATE = 0,
    VIEW,
    UPDATE,
    DELETE
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
    premission: any[premission];
    deletedAt?: Date;
    modificationNotes: ModificationNote[]
}