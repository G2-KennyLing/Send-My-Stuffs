import { ModificationNote } from "../common/model";

export interface ISeaport {
    _id?: String;
    seaportName: String;
    portCode: String;
    latitude: String;
    longitude: String;
    status?: statusSeaport;
    country: String;
    deletedAt?:Date;
    modificationNotes: ModificationNote[]
}

export enum statusSeaport {
    ACTIVE, INACTIVE
}