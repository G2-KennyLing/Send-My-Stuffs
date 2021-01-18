import { ModificationNote } from "../common/model";

export enum statusAriport {
	ACTIVE = 0,
	INACTIVE
}

export interface IAriport {
	_id?: String;
	ariportName: String;
	portCode: String;
	latitude: string;
	longitude?: String
	status?: statusAriport;
    country: String;
    isDeleted?: Boolean;
    modificationNotes: ModificationNote[]
}
