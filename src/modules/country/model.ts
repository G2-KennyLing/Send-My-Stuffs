import { ModificationNote } from "../common/model";

export interface ICountry {
	_id?: String;
	countryCode: String;
	countryName: String;
	city: String;
	region: String;
	timeZone: Date;
	seaPorts: String;
	airPorts: String;
	agents: String;
	customers: String;
	modificationNotes: [ModificationNote];
}