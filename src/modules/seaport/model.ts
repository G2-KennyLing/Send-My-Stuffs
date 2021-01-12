import { ModificationNote } from "../common/model";

export interface ISeaport {
    _id?: String;
    seaportName: String;
    portCode: String;
    countryName: String; 
    countryCode: String; 
    latitude: String;
    longitude: String;
    status?: statusSeaport;
    country: String;
    isDeleted?: Boolean;
    modificationNotes: ModificationNote[]
}

export enum statusSeaport {
    ACTIVE, INACTIVE
}