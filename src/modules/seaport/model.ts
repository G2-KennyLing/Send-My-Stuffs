import { ModificationNote } from "../common/model";

export interface ISeaport {
    _id?: String;
    seaportName: String;
    portCode: String;
    countryName: String; // table country
    countryCode: String; // table country
    latitude: String;
    longitude: String;
    status?: statusSeaport;
    isDeleted?: Boolean;
    modificationNotes: ModificationNote[]
}

export enum statusSeaport {
    ACTIVE, INACTIVE
}