import { ModificationNote } from "../common/model";

export enum statuscity {
	ACTIVE = 0,
	INACTIVE
}

export interface ICity {
	_id?: String;
	cityName: String;
	icons: String;
    country: String;
    status?: statuscity;
    deletedAt?: Date;
    modificationNotes: ModificationNote[]
}
