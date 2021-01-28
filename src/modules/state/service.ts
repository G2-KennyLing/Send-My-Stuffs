import { IState } from "./model";
import State from "./schema";

export default class StateService {

	public createStates(stateParams: IState, callback: any) {
		const _session = new State(stateParams);
		_session.save(callback);
	}

	public filterStates(query: any, callback: any) {
		State.find(query, callback).populate('country')
	}

	public filterState(query: any, callback: any) {
		State.findOne(query, callback).populate('country')
	}

	public updateState(stateParams: IState, callback: any) {
		const query = { _id: stateParams._id }
		State.findOneAndUpdate(query, stateParams, callback)
	}

	public deleteState( _id: String, query: any, callback: any ) {
		State.findByIdAndUpdate(_id, query,{new: true}, callback);
	}

	public isDelete(_id: String, callback: any) {
        const query = { _id: _id };
        State.deleteOne(query, callback);
    }

}