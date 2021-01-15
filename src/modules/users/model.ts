import { ModificationNote } from "../common/model";

enum role {
    USER = 0,
    SALES,
    PARTNER,
    CUSTOMER_SERVICE,
    ADMIN,
    SUPERADMIN
};

enum userType {
    USER =0,
    PARTNER
};
enum premission{
    CREATE=0,
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
    deletedAt?: Date;
    modificationNotes: ModificationNote[]
}