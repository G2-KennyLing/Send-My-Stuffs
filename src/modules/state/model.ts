import { ModificationNote } from '../common/model';

enum Status {
	"ACTIVE" = 0,
	"INACTIVE" = 1
}
export interface IState {
	_id?: String;
	stateName: String;
	countryName: String;
	countryCode: String;
	fipsCode: Number;
	ISO2: String;
	Status?: Status;
	modificationNotes?: ModificationNote[];
}

