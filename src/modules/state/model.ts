import { ModificationNote } from '../common/model';

enum stateStatus {
	'ACTIVE' = 0,
	'INACTIVE'
}
export interface IState {
	_id?: String;
	stateName: String;
	action?: String;
	country: String;
	fipsCode: Number;
	iso2: String;
	status?: stateStatus;
	deletedAt?:Date;
    isDeleted?: Boolean;
	modificationNotes?: ModificationNote[];
}

